import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { GalleryItem } from '@/lib/models/GalleryItem';
import { getAuthAdmin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { apiErrorResponse, invalidIdResponse, isValidMongoId } from '@/lib/api-security';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    if (!isValidMongoId(id)) return invalidIdResponse();
    const item = await GalleryItem.findById(id).lean() as any;
    if (!item) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: { ...item, id: item._id.toString() } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery item' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    if (!isValidMongoId(id)) return invalidIdResponse();
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const caption = formData.get('caption') as string || '';
      const category = formData.get('category') as string || 'General';
      const featured = formData.get('featured') === 'true';
      const order = parseInt(formData.get('order') as string || '0') || 0;
      const youtubeUrl = formData.get('youtubeUrl') as string || '';

      let url: string | undefined;
      const imageFile = formData.get('image') as File;

      if (imageFile && imageFile.size > 0) {
        url = await uploadToCloudinary(imageFile, 'construction-gallery');
      }

      const updateData: any = { caption, category, featured, order };
      if (url) updateData.url = url;
      if (youtubeUrl !== undefined) updateData.youtubeUrl = youtubeUrl;

      const item = await GalleryItem.findByIdAndUpdate(id, updateData, { new: true }).lean() as any;
      return NextResponse.json({ success: true, data: { ...item, id: item._id.toString() } });
    }

    const data = await req.json();
    const item = await GalleryItem.findByIdAndUpdate(id, data, { new: true }).lean() as any;
    return NextResponse.json({ success: true, data: { ...item, id: item._id.toString() } });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to update gallery item.');
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
    await GalleryItem.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to delete gallery item.');
  }
}
