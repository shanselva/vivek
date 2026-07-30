import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Category } from '@/lib/models/Category';
import { getAuthAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const filter: any = {};
    if (type) filter.type = type;
    
    const categories = await Category.find(filter).sort({ name: 1 }).lean();
    const result = categories.map((c: any) => ({ ...c, id: c._id.toString() }));

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const user = getAuthAdmin(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const type = formData.get('type') as string || 'general';

    if (!name || !slug) {
      return NextResponse.json({ success: false, error: 'Name and slug are required' }, { status: 400 });
    }

    
    const existing = await Category.findOne({ slug });
    if (existing) {
      return NextResponse.json({ success: false, error: 'Slug already exists' }, { status: 400 });
    }

    const newCategory = await Category.create({
      name,
      slug,
      type,
    });

    return NextResponse.json({ success: true, data: { ...newCategory.toObject(), id: newCategory._id.toString() } });
  } catch (error: any) {
    console.error('Failed to create category:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}
