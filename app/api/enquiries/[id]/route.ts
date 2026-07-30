import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Enquiry } from '@/lib/models/Enquiry';
import { getAuthAdmin } from '@/lib/auth';
import { apiErrorResponse, invalidIdResponse, isValidMongoId } from '@/lib/api-security';
import { enquiryStatusSchema } from '@/lib/validation';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    if (!isValidMongoId(id)) return invalidIdResponse();
    const enquiry = await Enquiry.findById(id).lean() as any;

    if (!enquiry) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { ...enquiry, id: enquiry._id.toString() } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    if (!isValidMongoId(id)) return invalidIdResponse();
    const body = enquiryStatusSchema.parse(await req.json());

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, { status: body.status }, { new: true }).lean() as any;

    return NextResponse.json({ success: true, data: { ...updatedEnquiry, id: updatedEnquiry._id.toString() } });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to update enquiry.');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    if (!isValidMongoId(id)) return invalidIdResponse();
    await Enquiry.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to delete enquiry.');
  }
}
