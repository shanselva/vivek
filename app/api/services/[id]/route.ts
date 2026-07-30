import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Service } from '@/lib/models/Service';
import { getAuthAdmin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { saveImageLocally } from '@/lib/uploads';
import { apiErrorResponse, invalidIdResponse, isValidMongoId } from '@/lib/api-security';


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    if (!isValidMongoId(id)) return invalidIdResponse();
    const service = await Service.findById(id).lean() as any;

    if (!service) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { ...service, id: service._id.toString() } });
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
    const formData = await req.formData();

    const updateData: any = {};
    const stringFields = ['title', 'slug', 'description', 'shortDesc', 'icon'];

    stringFields.forEach(field => {
      const val = formData.get(field);
      if (val !== null) updateData[field] = val as string;
    });

    if (formData.has('order')) {
      updateData.order = parseInt(formData.get('order') as string) || 0;
    }

    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        updateData.image = await uploadToCloudinary(imageFile, 'construction-services');
      } else {
        updateData.image = await saveImageLocally(imageFile);
      }
    } else if (formData.get('removeImage') === 'true') {
      updateData.image = null;
    }

    const updatedService = await Service.findByIdAndUpdate(id, updateData, { new: true }).lean() as any;

    return NextResponse.json({ success: true, data: { ...updatedService, id: updatedService._id.toString() } });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to update service.');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    if (!isValidMongoId(id)) return invalidIdResponse();
    await Service.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to delete service.');
  }
}
