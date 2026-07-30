import 'server-only';

import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';
import type { NextRequest } from 'next/server';

export const ADMIN_SESSION_COOKIE = 'vvc_admin_session';

export interface AdminSessionPayload extends JwtPayload {
  id: string;
  role: 'admin';
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be configured with at least 32 characters.');
  }

  return secret;
}

export function signToken(
  payload: Pick<AdminSessionPayload, 'id' | 'role'>,
  expiresIn: SignOptions['expiresIn'] = '1d',
): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn });
}

export function verifyToken(token: string): AdminSessionPayload | null {
  try {
    const payload = jwt.verify(token, getJwtSecret());

    if (
      typeof payload === 'string' ||
      typeof payload.id !== 'string' ||
      payload.role !== 'admin'
    ) {
      return null;
    }

    return payload as AdminSessionPayload;
  } catch {
    return null;
  }
}

function getCookieToken(req: NextRequest): string | undefined {
  return req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
}

export function getAuthAdmin(req: NextRequest): AdminSessionPayload | null {
  const authHeader = req.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length).trim()
    : undefined;

  if (bearerToken && bearerToken !== 'null' && bearerToken !== 'undefined') {
    const bearerSession = verifyToken(bearerToken);
    if (bearerSession) return bearerSession;
  }

  const cookieToken = getCookieToken(req);
  return cookieToken ? verifyToken(cookieToken) : null;
}
