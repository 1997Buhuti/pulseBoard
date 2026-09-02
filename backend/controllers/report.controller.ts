import type { NextFunction, Response } from 'express'
import { reportService } from '../services/report.service'
import type { IAuthenticatedRequest } from '../types/auth'
import type {
  CreateReportInput,
  ReviewReportInput,
  TeamReportsQuery,
  UpdateReportInput,
} from '../validators/report.validator'

export class ReportController {
  async create(req: IAuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const report = await reportService.createReport(
        req.auth.userId,
        req.body as CreateReportInput
      )
      res.status(201).json(report)
    } catch (error) {
      next(error)
    }
  }

  async update(req: IAuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const report = await reportService.updateReport(
        req.params.id,
        req.auth.userId,
        req.body as UpdateReportInput
      )
      res.status(200).json(report)
    } catch (error) {
      next(error)
    }
  }

  async submit(req: IAuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const report = await reportService.submitReport(
        req.params.id,
        req.auth.userId
      )
      res.status(200).json(report)
    } catch (error) {
      next(error)
    }
  }

  async getMine(req: IAuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const reports = await reportService.getMyReports(req.auth.userId)
      res.status(200).json(reports)
    } catch (error) {
      next(error)
    }
  }

  async getTeam(req: IAuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const result = await reportService.getTeamReports(
        req.query as unknown as TeamReportsQuery
      )
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async getById(req: IAuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const report = await reportService.getReportById(
        req.params.id,
        req.auth.userId,
        req.auth.role
      )
      res.status(200).json(report)
    } catch (error) {
      next(error)
    }
  }

  async review(req: IAuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const report = await reportService.reviewReport(
        req.params.id,
        req.auth.userId,
        req.body as ReviewReportInput
      )
      res.status(200).json(report)
    } catch (error) {
      next(error)
    }
  }
}

export const reportController = new ReportController()
