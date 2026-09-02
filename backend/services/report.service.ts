import {
  Prisma,
  ReportStatus,
  ReviewAction,
  type Report,
} from '@prisma/client'
import { prisma } from '../lib/prisma'
import type { UserRole } from '../types/auth'
import { AppError } from '../utils/AppError'
import type {
  CreateReportInput,
  ReviewReportInput,
  TeamReportsQuery,
  UpdateReportInput,
} from '../validators/report.validator'

const EDITABLE_STATUSES: ReportStatus[] = [
  ReportStatus.DRAFT,
  ReportStatus.NEEDS_CORRECTION,
]

const REPORT_DETAIL_INCLUDE = {
  tasks: true,
  project: true,
  reviewHistory: {
    orderBy: { createdAt: 'desc' as const },
  },
} satisfies Prisma.ReportInclude

export class ReportService {
  async createReport(userId: string, input: CreateReportInput): Promise<Report> {
    const project = await prisma.project.findUnique({
      where: { id: input.projectId },
    })

    if (!project) {
      throw new AppError('Project not found', 404)
    }

    return prisma.$transaction(async (tx) => {
      const report = await tx.report.create({
        data: {
          userId,
          projectId: input.projectId,
          weekStartDate: input.weekStartDate,
          weekEndDate: input.weekEndDate,
          status: ReportStatus.DRAFT,
          blockers: input.blockers,
          achievements: input.achievements,
          nextWeekPlans: input.nextWeekPlans,
          isKeyIssue: input.isKeyIssue ?? false,
          isKeyAchievement: input.isKeyAchievement ?? false,
          tasks: {
            create: input.tasks.map((task) => ({
              name: task.name,
              priority: task.priority,
              plannedPct: task.plannedPct,
              actualPct: task.actualPct,
              status: task.status,
              timeSpent: task.timeSpent,
              output: task.output,
            })),
          },
        },
        include: REPORT_DETAIL_INCLUDE,
      })

      return report
    })
  }

  async updateReport(
    reportId: string,
    userId: string,
    input: UpdateReportInput
  ): Promise<Report> {
    const report = await this.getOwnedEditableReport(reportId, userId)

    if (input.projectId) {
      const project = await prisma.project.findUnique({
        where: { id: input.projectId },
      })

      if (!project) {
        throw new AppError('Project not found', 404)
      }
    }

    return prisma.$transaction(async (tx) => {
      if (input.tasks) {
        await tx.reportTask.deleteMany({ where: { reportId: report.id } })
      }

      return tx.report.update({
        where: { id: report.id },
        data: {
          weekStartDate: input.weekStartDate,
          weekEndDate: input.weekEndDate,
          projectId: input.projectId,
          blockers: input.blockers,
          achievements: input.achievements,
          nextWeekPlans: input.nextWeekPlans,
          isKeyIssue: input.isKeyIssue,
          isKeyAchievement: input.isKeyAchievement,
          ...(input.tasks
            ? {
                tasks: {
                  create: input.tasks.map((task) => ({
                    name: task.name,
                    priority: task.priority,
                    plannedPct: task.plannedPct,
                    actualPct: task.actualPct,
                    status: task.status,
                    timeSpent: task.timeSpent,
                    output: task.output,
                  })),
                },
              }
            : {}),
        },
        include: REPORT_DETAIL_INCLUDE,
      })
    })
  }

  async submitReport(reportId: string, userId: string): Promise<Report> {
    await this.getOwnedEditableReport(reportId, userId)

    return prisma.report.update({
      where: { id: reportId },
      data: { status: ReportStatus.SUBMITTED },
      include: REPORT_DETAIL_INCLUDE,
    })
  }

  async getMyReports(userId: string) {
    return prisma.report.findMany({
      where: { userId },
      include: {
        project: true,
        tasks: true,
      },
      orderBy: { weekStartDate: 'desc' },
    })
  }

  async getTeamReports(query: TeamReportsQuery) {
    const { userId, projectId, status, startDate, endDate, page, limit } = query

    const where: Prisma.ReportWhereInput = {
      ...(userId ? { userId } : {}),
      ...(projectId ? { projectId } : {}),
      ...(status ? { status } : {}),
      ...((startDate || endDate) && {
        weekStartDate: {
          ...(startDate ? { gte: startDate } : {}),
          ...(endDate ? { lte: endDate } : {}),
        },
      }),
    }

    const skip = (page - 1) * limit

    const [items, total] = await prisma.$transaction([
      prisma.report.findMany({
        where,
        include: {
          project: true,
          tasks: true,
        },
        orderBy: { weekStartDate: 'desc' },
        skip,
        take: limit,
      }),
      prisma.report.count({ where }),
    ])

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    }
  }

  async getReportById(
    reportId: string,
    userId: string,
    role: UserRole
  ) {
    const report = await prisma.report.findUnique({
      where: { id: reportId },
      include: REPORT_DETAIL_INCLUDE,
    })

    if (!report) {
      throw new AppError('Report not found', 404)
    }

    const isManager = role === 'manager' || role === 'admin'
    const isOwner = report.userId === userId

    if (!isManager && !isOwner) {
      throw new AppError('Forbidden', 403)
    }

    return report
  }

  async reviewReport(
    reportId: string,
    managerId: string,
    input: ReviewReportInput
  ): Promise<Report> {
    const report = await prisma.report.findUnique({
      where: { id: reportId },
    })

    if (!report) {
      throw new AppError('Report not found', 404)
    }

    if (report.status !== ReportStatus.SUBMITTED) {
      throw new AppError(
        'Only submitted reports can be reviewed',
        400
      )
    }

    const nextStatus =
      input.action === 'APPROVE'
        ? ReportStatus.APPROVED
        : ReportStatus.NEEDS_CORRECTION

    const reviewAction =
      input.action === 'APPROVE'
        ? ReviewAction.APPROVE
        : ReviewAction.REQUEST_CHANGES

    return prisma.$transaction(async (tx) => {
      await tx.reviewHistory.create({
        data: {
          reportId,
          managerId,
          action: reviewAction,
          comment: input.comment,
        },
      })

      return tx.report.update({
        where: { id: reportId },
        data: { status: nextStatus },
        include: REPORT_DETAIL_INCLUDE,
      })
    })
  }

  private async getOwnedEditableReport(reportId: string, userId: string) {
    const report = await prisma.report.findUnique({
      where: { id: reportId },
    })

    if (!report) {
      throw new AppError('Report not found', 404)
    }

    if (report.userId !== userId) {
      throw new AppError('Forbidden', 403)
    }

    if (!EDITABLE_STATUSES.includes(report.status)) {
      throw new AppError(
        'Report can only be updated when status is DRAFT or NEEDS_CORRECTION',
        400
      )
    }

    return report
  }
}

export const reportService = new ReportService()
