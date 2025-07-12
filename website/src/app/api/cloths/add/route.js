import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import Cloth from '@/model/cloth';
import mongoose from 'mongoose';
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import User from '@/model/user';


export async function POST(request) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return new Response(JSON.stringify({ success: false, error: "Not authenticated" }), { status: 401 });
    }

    const decoded = verifyToken(token.value);

    // If the token is invalid or expired, decoded will be null
    if (!decoded) {
      return new Response(JSON.stringify({ success: false, error: "Invalid token" }), { status: 401 });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: "User not found" }), { status: 404 });
    }

    const formData = await request.formData();

    console.log("Received form data:", formData);

    // Extract all fields from FormData
    const title = formData.get('title');
    const descriptions = formData.get('descriptions');
    const size = formData.get('size');
    const condition = formData.get('condition');
    const type = formData.get('type');
    const description = formData.get('description');
    const uploaderId = user._id;
    const points = formData.get('points');
    const tags = formData.get('tags');
    const images = formData.get('images');

    // Validate required fields
    if (!title || !uploaderId || !points) {
      return NextResponse.json(
        { error: "Missing required fields (title, uploaderId, points)" },
        { status: 400 }
      );
    }

    // Validate uploaderId format
    if (!mongoose.Types.ObjectId.isValid(uploaderId)) {
      return NextResponse.json(
        { error: "Invalid uploaderId format" },
        { status: 400 }
      );
    }

    // Create new cloth item
    const newCloth = await Cloth.create({
      Uploader: new mongoose.Types.ObjectId(uploaderId),
      status: 'Available',
      points: Number(points),
      title,
      descriptions: descriptions || '',
      images: images || [],
      size: size || '',
      condition: condition || '',
      type: type || '',
      description: description || '',
      tags: Array.isArray(tags) ? tags : [tags], // Ensure tags is an array
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
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}