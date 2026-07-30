import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Career } from '@/lib/models/Career';
import { getAuthAdmin } from '@/lib/auth';
import { apiErrorResponse } from '@/lib/api-security';
import { careerSchema } from '@/lib/validation';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const active = searchParams.get('active');
    const department = searchParams.get('department');

    const filter: any = {};
    if (active === 'true') filter.isActive = true;
    if (department && department !== 'all') filter.department = department;

    const items = await Career.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    const result = items.map((i: any) => ({ ...i, id: i._id.toString() }));
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to fetch careers' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!getAuthAdmin(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = careerSchema.parse(await req.json());
    const item = await Career.create(data);
    return NextResponse.json({ success: true, data: { ...item.toObject(), id: item._id.toString() } }, { status: 201 });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to create career posting.');
  }
}
