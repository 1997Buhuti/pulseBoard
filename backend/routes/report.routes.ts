import { Router, type NextFunction, type Request, type Response } from 'express'
import { reportController } from '../controllers/report.controller'
import { requireAuth, requireManager } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validate.middleware'
import type { IAuthenticatedRequest } from '../types/auth'
import {
  CreateReportSchema,
  ReviewReportSchema,
  TeamReportsQuerySchema,
  UpdateReportSchema,
} from '../validators/report.validator'

const reportRouter = Router()

function asAuth(
  handler: (
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => Promise<void> | void
) {
  return (req: Request, res: Response, next: NextFunction) =>
    handler(req as IAuthenticatedRequest, res, next)
}

reportRouter.use(requireAuth)

reportRouter.post(
  '/',
  validate(CreateReportSchema),
  asAuth((req, res, next) => reportController.create(req, res, next))
)

reportRouter.get(
  '/me',
  asAuth((req, res, next) => reportController.getMine(req, res, next))
)

reportRouter.get(
  '/',
  requireManager,
  validate(TeamReportsQuerySchema, 'query'),
  asAuth((req, res, next) => reportController.getTeam(req, res, next))
)

reportRouter.get(
  '/:id',
  asAuth((req, res, next) => reportController.getById(req, res, next))
)

reportRouter.put(
  '/:id',
  validate(UpdateReportSchema),
  asAuth((req, res, next) => reportController.update(req, res, next))
)

reportRouter.post(
  '/:id/submit',
  asAuth((req, res, next) => reportController.submit(req, res, next))
)

reportRouter.post(
  '/:id/review',
  requireManager,
  validate(ReviewReportSchema),
  asAuth((req, res, next) => reportController.review(req, res, next))
)

export default reportRouter
