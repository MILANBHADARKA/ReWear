import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import Cloth from '@/model/cloth';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid item ID' }, { status: 400 });
  }

  try {
    await connectDB();

    const item = await Cloth.findById(id)
      .populate("Uploader", "username")
      .lean();

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: item._id.toString(),
      name: item.name,
      description: item.description,
      images: item.images,
      uploader: item.Uploader?.name || "Unknown",
      status: item.status,
      points: item.points,
      size: item.size,
      condition: item.condition,
      type: item.type,
      tags: item.tags,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    });
  } catch (err) {
    console.error("Error fetching item:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
