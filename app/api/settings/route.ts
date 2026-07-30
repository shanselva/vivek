import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Settings } from '@/lib/models/Settings';
import { getAuthAdmin } from '@/lib/auth';
import { apiErrorResponse, invalidIdResponse, isValidMongoId } from '@/lib/api-security';
import { settingsSchema } from '@/lib/validation';

export async function GET(req: Request) {
  try {
    await connectDB();
    const settings = await Settings.findOne().lean() as any;
    if (settings) {
      settings.id = settings._id.toString();
    }
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!getAuthAdmin(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = settingsSchema.parse(await req.json());
    const { id, ...updateData } = data;

    if (id && !isValidMongoId(id)) return invalidIdResponse();

    let item: any;
    if (id) {
      item = await Settings.findByIdAndUpdate(id, updateData, { new: true }).lean();
    } else {
      
      item = await Settings.create(updateData);
      item = item.toObject();
    }

    return NextResponse.json({ success: true, data: { ...item, id: item._id.toString() } });
  } catch (error: unknown) {
    return apiErrorResponse(error, 'Failed to update settings.');
  }
}
