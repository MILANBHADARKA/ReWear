import User from "@/model/user";
import { getAllBadgesForUser } from "../badgeservice";
import axios from "axios";
import dbConnect from "@/lib/dbConnect";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET(request) {
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
    console.log(user)
    if (!user.MetaMaskAddress) {
      return Response.json(
        { error: "MetaMaskAddress not found" },
        { status: 404 }
      );
    }
    const badges = await getAllBadgesForUser(user.MetaMaskAddress);
    console.log(badges);

    return Response.json({ success: true, user, badges });
  } catch (error) {
    console.error("Error fetching badges:", error);
    return Response.json({ error: "Failed to fetch badges" }, { status: 500 });
  }
}
