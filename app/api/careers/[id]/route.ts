import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Career } from '@/lib/models/Career';
import { getAuthAdmin } from '@/lib/auth';
import { apiErrorResponse, invalidIdResponse, isValidMongoId } from '@/lib/api-security';
import { careerSchema } from '@/lib/validation';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const item = await Career.findById(id).lean() as any;
    if (!item) return NextResponse.json({ success: false, error: 'Career posting not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: { ...item, id: item._id.toString() } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to fetch career posting' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!getAuthAdmin(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    if (!isValidMongoId(id)) return invalidIdResponse();
    const data = careerSchema.partial().parse(await req.json());
    const item = await Career.findByIdAndUpdate(id, data, { new: true }).lean() as any;
    if (!item) return NextResponse.json({ success: false, error: 'Career posting not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: { ...item, id: item._id.toString() } });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to update career posting.');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!getAuthAdmin(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    if (!isValidMongoId(id)) return invalidIdResponse();
    const deleted = await Career.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ success: false, error: 'Career posting not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to delete career posting.');
  }
}
