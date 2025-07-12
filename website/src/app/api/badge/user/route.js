import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getAllBadgesForUser } from "../badgeservice";
import axios from "axios";

export async function GET(request) {
  try {
    await dbConnect();

    const url = new URL(request.url);
    const urluserId = url.searchParams.get("id");

    let user = await User.findById(urluserId);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    let userId = user._id;

    if (urluserId) {
      userId = urluserId;
      user = await User.findById(userId)
        .select("username email metamaskAddress")
        .lean();
    }
    console.log("matamask User ID:", userId);


    if (!user.MetaMaskAddress) {
      return Response.json({ error: "metamaskAddress not found" }, { status: 404 });
    }
    const badges = await getAllBadgesForUser(user.MetaMaskAddress);
    console.log(badges)

    


    return Response.json({ success: true, user, badges });
  } catch (error) {
    console.error("Error fetching badges:", error);
    return Response.json({ error: "Failed to fetch badges" }, { status: 500 });
  }
}
