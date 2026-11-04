import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { messaging } from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user?.fcmToken) {
      return NextResponse.json(
        { message: "User FCM token not found" },
        { status: 404 }
      );
    }

    await messaging.send({
      token: user.fcmToken,
      notification: {
        title: "Shop Notification",
        body: "Your shop has sent you a notification.",
      },
    });

    return NextResponse.json({
      message: "Notification sent successfully",
    });

  } catch (error) {
    console.error("Notification Error:", error);

    return NextResponse.json(
      { message: "Notification sending failed" },
      { status: 500 }
    );
  }
}