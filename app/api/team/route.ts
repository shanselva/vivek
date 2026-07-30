import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { TeamMember } from '@/lib/models/TeamMember';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { saveImageLocally } from '@/lib/uploads';
import { getAuthAdmin } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    await connectDB();
    const items = await TeamMember.find().sort({ order: 1 }).lean();
    const result = items.map((i: any) => ({ ...i, id: i._id.toString() }));
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!getAuthAdmin(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const memberData: any = {};
      ['name', 'designation', 'bio', 'email'].forEach(field => {
        const val = formData.get(field);
        if (val !== null && val !== 'undefined') memberData[field] = val as string;
      });
      if (formData.has('order')) {
        memberData.order = parseInt(formData.get('order') as string) || 0;
      }
      const imageFile = formData.get('image') as File;
      if (imageFile && imageFile.size > 0) {
        if (process.env.CLOUDINARY_CLOUD_NAME) {
          memberData.image = await uploadToCloudinary(imageFile, 'construction-team');
        } else {
          memberData.image = await saveImageLocally(imageFile);
        }
      }
      const item = await TeamMember.create(memberData);
      return NextResponse.json({ success: true, data: { ...item.toObject(), id: item._id.toString() } });
    }

    const data = await req.json();
    const item = await TeamMember.create(data);
    return NextResponse.json({ success: true, data: { ...item.toObject(), id: item._id.toString() } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to create team member' }, { status: 500 });
  }
}

