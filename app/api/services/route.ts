import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Service } from '@/lib/models/Service';
import { getAuthAdmin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { saveImageLocally } from '@/lib/uploads';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const services = await Service.find().sort({ order: 1 }).lean();
    const result = services.map((s: any) => ({ ...s, id: s._id.toString() }));
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const formData = await req.formData();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;

    if (!title || !slug || !description) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const serviceData: any = {
      title,
      slug,
      description,
      shortDesc: (formData.get('shortDesc') as string) || '',
      icon: (formData.get('icon') as string) || 'HardHat',
      order: formData.has('order') ? parseInt(formData.get('order') as string) || 0 : 0,
    };

    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        serviceData.image = await uploadToCloudinary(imageFile, 'construction-services');
      } else {
        serviceData.image = await saveImageLocally(imageFile);
      }
    }

    const newService = await Service.create(serviceData);

    return NextResponse.json({ success: true, data: { ...newService.toObject(), id: newService._id.toString() } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
