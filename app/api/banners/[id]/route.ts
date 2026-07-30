import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Banner } from '@/lib/models/Banner';
import { getAuthAdmin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const banner = await Banner.findById(id);
    if (!banner) return NextResponse.json({ success: false, error: 'Banner not found' }, { status: 404 });

    const formData = await req.formData();
    
    let srcUrl = formData.get('srcUrl') as string;
    const mediaFile = formData.get('media') as File;
    
    if (mediaFile && mediaFile.size > 0) {
      srcUrl = await uploadToCloudinary(mediaFile, 'construction-banners');
    }

    const updates: any = {};
    if (srcUrl) updates.src = srcUrl;
    
    const type = formData.get('type');
    if (type) updates.type = type;
    
    const heading1 = formData.get('heading1');
    if (heading1) updates.heading1 = heading1;
    
    const heading2 = formData.get('heading2');
    if (heading2 !== null) updates.heading2 = heading2;
    
    const eyebrow = formData.get('eyebrow');
    if (eyebrow !== null) updates.eyebrow = eyebrow;
    
    const location = formData.get('location');
    if (location !== null) updates.location = location;
    
    const subtitle = formData.get('subtitle');
    if (subtitle !== null) updates.subtitle = subtitle;
    
    const order = formData.get('order');
    if (order !== null) updates.order = parseInt(order as string);
    
    const isActive = formData.get('isActive');
    if (isActive !== null) updates.isActive = isActive === 'true';

    const updatedBanner = await Banner.findByIdAndUpdate(id, { $set: updates }, { new: true });
    
    const result = { ...updatedBanner.toObject(), id: updatedBanner._id.toString() };
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (!deletedBanner) {
      return NextResponse.json({ success: false, error: 'Banner not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
