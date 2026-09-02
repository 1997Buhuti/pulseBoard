import { z } from 'zod'

const ReportTaskSchema = z.object({
  name: z.string().trim().min(1, 'Task name is required'),
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  plannedPct: z.number().int().min(0).max(100),
  actualPct: z.number().int().min(0).max(100),
  status: z.enum(['COMPLETED', 'IN_PROGRESS', 'BLOCKED']),
  timeSpent: z.string().trim().optional(),
  output: z.string().trim().optional(),
})

export const CreateReportSchema = z
  .object({
    weekStartDate: z.coerce.date({
      required_error: 'weekStartDate is required',
      invalid_type_error: 'weekStartDate must be a valid date',
    }),
    weekEndDate: z.coerce.date({
      required_error: 'weekEndDate is required',
      invalid_type_error: 'weekEndDate must be a valid date',
    }),
    projectId: z.string().trim().min(1, 'projectId is required'),
    tasks: z.array(ReportTaskSchema).min(1, 'At least one task is required'),
    blockers: z.string().optional(),
    achievements: z.string().optional(),
    nextWeekPlans: z.string().optional(),
    isKeyIssue: z.boolean().optional(),
    isKeyAchievement: z.boolean().optional(),
  })
  .refine((data) => data.weekEndDate >= data.weekStartDate, {
    message: 'weekEndDate must be on or after weekStartDate',
    path: ['weekEndDate'],
  })

export const UpdateReportSchema = z
  .object({
    weekStartDate: z.coerce.date().optional(),
    weekEndDate: z.coerce.date().optional(),
    projectId: z.string().trim().min(1).optional(),
    tasks: z.array(ReportTaskSchema).min(1).optional(),
    blockers: z.string().optional(),
    achievements: z.string().optional(),
    nextWeekPlans: z.string().optional(),
    isKeyIssue: z.boolean().optional(),
    isKeyAchievement: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.weekStartDate && data.weekEndDate) {
        return data.weekEndDate >= data.weekStartDate
      }
      return true
    },
    {
      message: 'weekEndDate must be on or after weekStartDate',
      path: ['weekEndDate'],
    }
  )

export const ReviewReportSchema = z
  .object({
    action: z.enum(['APPROVE', 'REQUEST_CHANGES']),
    comment: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.action === 'REQUEST_CHANGES' &&
      (!data.comment || data.comment.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'comment is required when requesting changes',
        path: ['comment'],
      })
    }
  })

export const TeamReportsQuerySchema = z.object({
  userId: z.string().trim().optional(),
  projectId: z.string().trim().optional(),
  status: z
    .enum(['DRAFT', 'SUBMITTED', 'NEEDS_CORRECTION', 'APPROVED'])
    .optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

export type CreateReportInput = z.infer<typeof CreateReportSchema>
export type UpdateReportInput = z.infer<typeof UpdateReportSchema>
export type ReviewReportInput = z.infer<typeof ReviewReportSchema>
export type TeamReportsQuery = z.infer<typeof TeamReportsQuerySchema>
