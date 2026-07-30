import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Banner } from '@/lib/models/Banner';
import { getAuthAdmin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get('active') === 'true';

    const filter: any = {};
    if (activeOnly) filter.isActive = true;

    const banners = await Banner.find(filter).sort({ order: 1, createdAt: -1 }).lean();

    const result = banners.map((b: any) => ({
      ...b,
      id: b._id.toString(),
    }));

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

    const heading1 = formData.get('heading1') as string;
    if (!heading1) {
      return NextResponse.json({ success: false, error: 'Heading 1 is required' }, { status: 400 });
    }

    let srcUrl = formData.get('srcUrl') as string; 
    const mediaFile = formData.get('media') as File;
    
    if (mediaFile && mediaFile.size > 0) {
      srcUrl = await uploadToCloudinary(mediaFile, 'construction-banners');
    }

    if (!srcUrl) {
      return NextResponse.json({ success: false, error: 'Media file or source URL is required' }, { status: 400 });
    }

    const newBanner = await Banner.create({
      type: formData.get('type') || 'image',
      src: srcUrl,
      eyebrow: formData.get('eyebrow') as string || undefined,
      heading1,
      heading2: formData.get('heading2') as string || undefined,
      location: formData.get('location') as string || undefined,
      subtitle: formData.get('subtitle') as string || undefined,
      order: formData.get('order') ? parseInt(formData.get('order') as string) : 0,
      isActive: formData.get('isActive') !== 'false',
    });

    const result = { ...newBanner.toObject(), id: newBanner._id.toString() };
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
