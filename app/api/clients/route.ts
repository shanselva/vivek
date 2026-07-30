import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Client } from '@/lib/models/Client';
import { getAuthAdmin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    await connectDB();
    const items = await Client.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
    const result = items.map((i: any) => ({ ...i, id: i._id.toString() }));
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const name = formData.get('name') as string || 'Trusted Client';
      const order = parseInt(formData.get('order') as string || '0') || 0;
      const isActive = formData.get('isActive') !== 'false';

      const singleImage = formData.get('logo') as File;
      if (!singleImage || singleImage.size === 0) {
        return NextResponse.json({ success: false, error: 'No logo image provided' }, { status: 400 });
      }

      const logo = await uploadToCloudinary(singleImage, 'construction-clients');
      const item = await Client.create({ name, logo, order, isActive });
      return NextResponse.json({ success: true, data: { ...item.toObject(), id: item._id.toString() } }, { status: 201 });
    }

    const data = await req.json();
    const item = await Client.create(data);
    return NextResponse.json({ success: true, data: { ...item.toObject(), id: item._id.toString() } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to create client' }, { status: 500 });
  }
}
