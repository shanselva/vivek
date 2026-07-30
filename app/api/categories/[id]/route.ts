import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Category } from '@/lib/models/Category';
import { getAuthAdmin } from '@/lib/auth';
import { invalidIdResponse, isValidMongoId } from '@/lib/api-security';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const user = getAuthAdmin(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!isValidMongoId(id)) return invalidIdResponse();
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const type = formData.get('type') as string;

    if (!name || !slug) {
      return NextResponse.json({ success: false, error: 'Name and slug are required' }, { status: 400 });
    }
    const existing = await Category.findOne({ slug }).lean() as any;
    if (existing && existing._id.toString() !== id) {
      return NextResponse.json({ success: false, error: 'Slug already exists' }, { status: 400 });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, { name, slug, type }, { new: true }).lean() as any;

    return NextResponse.json({ success: true, data: { ...updatedCategory, id: updatedCategory._id.toString() } });
  } catch (error) {
    console.error('Failed to update category:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const user = getAuthAdmin(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!isValidMongoId(id)) return invalidIdResponse();
    await Category.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete category:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
