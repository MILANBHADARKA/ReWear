import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";
import { setTokenCookie } from "@/lib/cookies";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ success: false, error: "All fields are required" }), { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new Response(JSON.stringify({ success: false, error: "Invalid credentials" }), { status: 401 });
    }

    const token = generateToken({ id: user._id, email: user.email, username: user.username });

    const cookie = setTokenCookie(token);

    return new Response(JSON.stringify({
      success: true,
      message: "Login successful"
    }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie
      }
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: "Internal Server Error" }), { status: 500 });
  }
}
