import { NextResponse } from "next/server";
import Subscriber from "@/models/Subscriber";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
    return NextResponse.json(subscribers, { status: 200 });
  } catch (error) {
    console.error("GET /api/newsletter error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required." },
        { status: 400 },
      );
    }

    await connectDB();

    // Check if email already exists
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "You are already subscribed!" },
        { status: 400 },
      );
    }

    const subscriber = await Subscriber.create({ name, email });

    return NextResponse.json(
      { message: "Subscribed successfully!", subscriber },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("POST /api/newsletter error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 },
    );
  }
}
