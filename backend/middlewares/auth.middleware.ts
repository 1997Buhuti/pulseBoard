import { getAuth } from '@clerk/express'
import type { NextFunction, Request, Response } from 'express'
import { asAuthenticatedRequest, type UserRole } from '../types/auth'
import { AppError } from '../utils/AppError'

function resolveRole(claims: Record<string, unknown> | null | undefined): UserRole {
  const metadata =
    (claims?.metadata as Record<string, unknown> | undefined) ??
    (claims?.publicMetadata as Record<string, unknown> | undefined) ??
    {}

  const role = String(metadata.role ?? 'member').toLowerCase()

  if (role === 'manager' || role === 'admin') {
    return role
  }

  return 'member'
}

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  try {
    const auth = getAuth(req)

    if (!auth.userId) {
      throw new AppError('Unauthorized', 401)
    }

    asAuthenticatedRequest(req).auth = {
      userId: auth.userId,
      role: resolveRole(auth.sessionClaims as Record<string, unknown> | null | undefined),
    }

    next()
  } catch (error) {
    next(error instanceof AppError ? error : new AppError('Unauthorized', 401))
  }
}

export function requireManager(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  try {
    const { auth } = asAuthenticatedRequest(req)

    if (!auth?.userId) {
      throw new AppError('Unauthorized', 401)
    }

    if (auth.role !== 'manager' && auth.role !== 'admin') {
      throw new AppError('Forbidden: manager access required', 403)
    }

    next()
  } catch (error) {
    next(error instanceof AppError ? error : new AppError('Forbidden', 403))
  }
}
