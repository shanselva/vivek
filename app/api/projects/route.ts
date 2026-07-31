import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Project } from '@/lib/models/Project';
import { getAuthAdmin } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 0, 1), 100) : undefined;

    const filter: any = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (featured === 'true') filter.featured = true;

    let query = Project.find(filter).sort({ createdAt: -1 });
    if (limit) query = query.limit(limit);

    const projects = await query.lean();

    const result = projects.map((p: any) => ({
      ...p,
      id: p._id.toString(),
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

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;

    if (!title || !slug || !description || !category) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const existing = await Project.findOne({ slug });
    if (existing) {
      return NextResponse.json({ success: false, error: 'Slug already exists' }, { status: 400 });
    }

    let coverImageUrl: string | null = null;
    const coverImage = formData.get('coverImage') as File;
    if (coverImage && coverImage.size > 0) {
      coverImageUrl = await uploadToCloudinary(coverImage, 'construction-projects');
    }

    
    const imageFiles = formData.getAll('images') as File[];
    const imageUrls: string[] = [];
    for (const imgFile of imageFiles) {
      if (imgFile && imgFile.size > 0) {
        const url = await uploadToCloudinary(imgFile, 'construction-projects');
        imageUrls.push(url);
      }
    }

    const newProject = await Project.create({
      title,
      slug,
      description,
      category,
      status: (formData.get('status') as string) || 'ongoing',
      client: formData.get('client') as string || undefined,
      location: formData.get('location') as string || undefined,
      year: formData.get('year') ? parseInt(formData.get('year') as string) : undefined,
      featured: formData.get('featured') === 'true',
      images: imageUrls,
      coverImage: coverImageUrl || undefined,
      seoTitle: formData.get('seoTitle') as string || undefined,
      seoDesc: formData.get('seoDesc') as string || undefined,
    });

    const result = { ...newProject.toObject(), id: newProject._id.toString() };
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
