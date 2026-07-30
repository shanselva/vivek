import 'server-only';

import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { InvalidUploadError } from '@/lib/uploads';

export function isValidMongoId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export function invalidIdResponse() {
  return NextResponse.json({ success: false, error: 'Invalid resource identifier.' }, { status: 400 });
}

export function apiErrorResponse(error: unknown, fallbackMessage: string) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { success: false, error: 'Invalid request data.', details: error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (error instanceof InvalidUploadError) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }

  if (error instanceof SyntaxError) {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
    return NextResponse.json({ success: false, error: 'Invalid request data.' }, { status: 400 });
  }

  if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
    return NextResponse.json({ success: false, error: 'A record with that value already exists.' }, { status: 409 });
  }

  console.error(fallbackMessage, error);
  return NextResponse.json({ success: false, error: fallbackMessage }, { status: 500 });
}

type RateLimitEntry = { count: number; resetAt: number };

const rateLimitStore = new Map<string, RateLimitEntry>();

export function rateLimit(
  request: Request,
  namespace: string,
  limit: number,
  windowMs: number,
): NextResponse | null {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const clientKey = forwardedFor || request.headers.get('x-real-ip') || 'local';
  const key = `${namespace}:${clientKey}`;
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (current.count >= limit) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((current.resetAt - now) / 1000)) },
      },
    );
  }

  current.count += 1;
  return null;
}
