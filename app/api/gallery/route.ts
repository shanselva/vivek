import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { GalleryItem } from '@/lib/models/GalleryItem';
import { getAuthAdmin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 0, 1), 100) : undefined;

    const filter: any = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    let query = GalleryItem.find(filter).sort({ order: 1 });
    if (limit) query = query.limit(limit);

    const items = await query.lean();
    const result = items.map((i: any) => ({ ...i, id: i._id.toString() }));
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery items' }, { status: 500 });
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
      const caption = formData.get('caption') as string || '';
      const category = formData.get('category') as string || 'General';
      const featured = formData.get('featured') === 'true';
      const order = parseInt(formData.get('order') as string || '0') || 0;
      const youtubeUrl = formData.get('youtubeUrl') as string || '';

      const imageFiles = formData.getAll('images') as File[];
      const created = [];

      for (const imageFile of imageFiles) {
        if (imageFile && imageFile.size > 0) {
          const url = await uploadToCloudinary(imageFile, 'construction-gallery');
          const item = await GalleryItem.create({ url, caption, category, featured, order });
          created.push({ ...item.toObject(), id: item._id.toString() });
        }
      }

      if (created.length === 0) {
        const singleImage = formData.get('image') as File;
        if (singleImage && singleImage.size > 0) {
          const url = await uploadToCloudinary(singleImage, 'construction-gallery');
          const item = await GalleryItem.create({ url, caption, category, featured, order, youtubeUrl });
          created.push({ ...item.toObject(), id: item._id.toString() });
        } else if (youtubeUrl) {
          const item = await GalleryItem.create({ caption, category, featured, order, youtubeUrl });
          created.push({ ...item.toObject(), id: item._id.toString() });
        }
      }

      if (created.length === 0) {
        return NextResponse.json({ success: false, error: 'No valid images or YouTube link provided' }, { status: 400 });
      }

      return NextResponse.json({ success: true, data: created }, { status: 201 });
    }

    const data = await req.json();
    const item = await GalleryItem.create(data);
    return NextResponse.json({ success: true, data: { ...item.toObject(), id: item._id.toString() } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to create gallery item' }, { status: 500 });
  }
}
