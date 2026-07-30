import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Client } from '@/lib/models/Client';
import { getAuthAdmin } from '@/lib/auth';
import { invalidIdResponse, isValidMongoId } from '@/lib/api-security';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const authData = getAuthAdmin(req);
    if (!authData) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    if (!isValidMongoId(id)) return invalidIdResponse();
    await Client.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Client deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to delete client' }, { status: 500 });
  }
}
