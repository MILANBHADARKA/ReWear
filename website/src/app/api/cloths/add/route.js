import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import Cloth from '@/model/cloth';
import mongoose from 'mongoose';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const {
      name,
      description,
      images,      
      uploaderId,   
      status = 'Available',
      points
    } = body;

    if (!name || !images || images.length === 0 || !uploaderId || points == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newCloth = await Cloth.create({
      itemName: name,
      itemDescription: description,
      itemImageUrls: images,
      Uploader: new mongoose.Types.ObjectId(uploaderId),
      status,
      points
    });

    return NextResponse.json(
      {
        message: "Item added successfully",
        itemId: newCloth._id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}