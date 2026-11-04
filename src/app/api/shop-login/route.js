import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Shop from "@/models/Shop";

export async function POST(request) {
  try {
    const { email, token } = await request.json();

    const shopEmail = process.env.SHOP_EMAIL.toLowerCase();

    if (
      !email ||
      email.trim().toLowerCase() !== shopEmail ||
      !token
    ) {
      return NextResponse.json(
        { message: "Invalid login details" },
        { status: 400 }
      );
    }

    await connectDB();

    await Shop.findOneAndUpdate(
      { email: shopEmail },
      {
        $set: {
          email: shopEmail,
          fcmToken: token,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    return NextResponse.json({
      message: "Shop login successful",
    });

  } catch (error) {
    console.error("Shop Login Error:", error);

    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}