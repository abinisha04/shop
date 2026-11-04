import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find(
      {},
      {
        _id: 0,
        email: 1,
        name: 1,
      }
    ).lean();

    return NextResponse.json(users);

  } catch (error) {
    console.error("Fetch Users Error:", error);

    return NextResponse.json(
      { message: "Unable to fetch users" },
      { status: 500 }
    );
  }
}