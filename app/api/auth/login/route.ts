import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { AdminUser } from '@/lib/models/AdminUser';
import bcrypt from 'bcryptjs';
import { ADMIN_SESSION_COOKIE, signToken } from '@/lib/auth';
import { z } from 'zod';
import { apiErrorResponse, rateLimit } from '@/lib/api-security';

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(256),
});

export async function POST(req: NextRequest) {
  try {
    const limited = rateLimit(req, 'admin-login', 5, 15 * 60 * 1000);
    if (limited) return limited;

    await connectDB();
    const parsed = loginSchema.safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'A valid email and password are required.' },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const adminUser = await AdminUser.findOne({ email: email.toLowerCase() }).lean() as any;

    if (!adminUser) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, adminUser.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (adminUser.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = signToken({ id: adminUser._id.toString(), role: 'admin' });

    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: adminUser._id.toString(),
          name: adminUser.name,
          email: adminUser.email,
          role: adminUser.role,
        },
      },
    });

    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Unable to sign in right now.');
  }
}
