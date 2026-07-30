import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { TeamMember } from '@/lib/models/TeamMember';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { saveImageLocally } from '@/lib/uploads';
import { getAuthAdmin } from '@/lib/auth';
import { apiErrorResponse, invalidIdResponse, isValidMongoId } from '@/lib/api-security';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!getAuthAdmin(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    if (!isValidMongoId(id)) return invalidIdResponse();
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const updateData: any = {};
      ['name', 'designation', 'bio', 'email'].forEach(field => {
        const val = formData.get(field);
        if (val !== null && val !== 'undefined') updateData[field] = val as string;
      });
      if (formData.has('order')) {
        updateData.order = parseInt(formData.get('order') as string) || 0;
      }
      const imageFile = formData.get('image') as File;
      if (imageFile && imageFile.size > 0) {
        if (process.env.CLOUDINARY_CLOUD_NAME) {
          updateData.image = await uploadToCloudinary(imageFile, 'construction-team');
        } else {
          updateData.image = await saveImageLocally(imageFile);
        }
      } else if (formData.get('removeImage') === 'true') {
        updateData.image = null;
      }
      const item = await TeamMember.findByIdAndUpdate(id, updateData, { new: true }).lean() as any;
      return NextResponse.json({ success: true, data: { ...item, id: item._id?.toString() } });
    }

    const data = await req.json();
    const item = await TeamMember.findByIdAndUpdate(id, data, { new: true }).lean() as any;
    return NextResponse.json({ success: true, data: { ...item, id: item._id?.toString() } });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to update team member.');
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
    await TeamMember.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to delete team member.');
  }
}
