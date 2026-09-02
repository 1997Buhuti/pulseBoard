import type { Request } from 'express'

export type UserRole = 'member' | 'manager' | 'admin'

export interface IAuthContext {
  userId: string
  role: UserRole
}

export interface IAuthenticatedRequest extends Request {
  auth: IAuthContext
}
