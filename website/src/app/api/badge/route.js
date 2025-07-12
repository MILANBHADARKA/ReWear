import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import {
  mintBadgeToUser,
  getAllBadgesForUser,
  checkUserHasBadge,
} from "./badgeservice";
import User from "@/models/User";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get("wallet");

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ metamaskAddress: wallet.toLowerCase() });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const badges = await getAllBadgesForUser(wallet.toLowerCase());
    return NextResponse.json({ success: true, badges });
  } catch (err) {
    console.error("Error fetching badges:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
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

    // Ensure user has a wallet address
    const walletAddress = user.metamaskAddress?.toLowerCase();
    if (!walletAddress) {
      return NextResponse.json(
        { error: "No wallet address linked to user" },
        { status: 400 }
      );
    }

    // Fetch all badges using the wallet address
    const badges = await getAllBadgesForUser(walletAddress);
    return NextResponse.json({ success: true, badges });
  } catch (err) {
    console.error("Error fetching badges:", err);
    return NextResponse.json(
      { error: "Failed to fetch badges" },
      { status: 500 }
    );
  }
}
