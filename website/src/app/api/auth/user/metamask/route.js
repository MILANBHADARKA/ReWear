import { dbConnect } from "@/lib/dbConnect";
import User from "@/model/user";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: "Not authenticated" }),
        { status: 401 }
      );
    }

    const decoded = verifyToken(token.value);

    // If the token is invalid or expired, decoded will be null
    if (!decoded) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid token" }),
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ metamaskAddress: user.metamaskAddress });
  } catch (error) {
    console.error("Failed to fetch metamaskAddress:", error);
    return NextResponse.json(
      { error: "Failed to fetch metamaskAddress" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { metamaskAddress } = body;

    if (!metamaskAddress) {
      return NextResponse.json(
        { error: "MetaMask address is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: "Not authenticated" }),
        { status: 401 }
      );
    }

    const decoded = verifyToken(token.value);

    // If the token is invalid or expired, decoded will be null
    if (!decoded) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid token" }),
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.id).select("-password");

    user.metamaskAddress = metamaskAddress;
    await user.save();
    console.log("Address saved!!" + user.metamaskAddress);
    return NextResponse.json({
      success: true,
      message: "MetaMask address saved successfully",
    });
  } catch (error) {
    console.error("Failed to save MetaMask address:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
