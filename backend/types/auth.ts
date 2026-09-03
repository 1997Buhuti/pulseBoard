import type { Request } from 'express'

export type UserRole = 'member' | 'manager' | 'admin'

export interface IAuthContext {
  userId: string
  role: UserRole
}

/**
 * App auth context after `requireAuth`.
 * Omits Clerk's `Request['auth']` so our shaped `auth` does not conflict.
 */
export type IAuthenticatedRequest = Omit<Request, 'auth'> & {
  auth: IAuthContext
}

export function asAuthenticatedRequest(req: Request): IAuthenticatedRequest {
  return req as unknown as IAuthenticatedRequest
}
