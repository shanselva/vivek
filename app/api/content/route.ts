import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { SiteContent } from '@/lib/models/SiteContent';
import { getAuthAdmin } from '@/lib/auth';
import { apiErrorResponse, invalidIdResponse, isValidMongoId } from '@/lib/api-security';
import { contentSchema } from '@/lib/validation';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const section = searchParams.get('section');

    const filter: any = {};
    if (page) filter.page = page;
    if (section) filter.section = section;

    const items = await SiteContent.find(filter).sort({ page: 1, section: 1 }).lean();
    const result = items.map((i: any) => ({ ...i, id: i._id.toString() }));
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!getAuthAdmin(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = contentSchema.parse(await req.json());
    const { id, page, section, key, value } = data;
    if (!isValidMongoId(id)) return invalidIdResponse();

    const item = await SiteContent.findByIdAndUpdate(id, { page, section, key, value }, { new: true }).lean() as any;
    return NextResponse.json({ success: true, data: { ...item, id: item._id.toString() } });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to update content block.');
  }
}
