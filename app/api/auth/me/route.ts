import { NextRequest, NextResponse } from 'next/server';
import { getAuthAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { AdminUser } from '@/lib/models/AdminUser';

export async function GET(req: NextRequest) {
  try {
    const authData: any = getAuthAdmin(req);
    
    if (!authData || !authData.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const adminUser = await AdminUser.findById(authData.id).select('name email role').lean() as any;
    if (adminUser) {
      adminUser.id = adminUser._id.toString();
    }

    if (!adminUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: adminUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
