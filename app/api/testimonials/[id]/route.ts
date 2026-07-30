import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Testimonial } from '@/lib/models/Testimonial';
import { getAuthAdmin } from '@/lib/auth';
import { apiErrorResponse, invalidIdResponse, isValidMongoId } from '@/lib/api-security';
import { testimonialSchema } from '@/lib/validation';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!getAuthAdmin(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    if (!isValidMongoId(id)) return invalidIdResponse();
    const data = testimonialSchema.partial().parse(await req.json());
    const item = await Testimonial.findByIdAndUpdate(id, data, { new: true }).lean() as any;
    return NextResponse.json({ success: true, data: { ...item, id: item._id.toString() } });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to update testimonial.');
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
    await Testimonial.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to delete testimonial.');
  }
}
