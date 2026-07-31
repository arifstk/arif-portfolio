import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Subscriber from "@/models/Subscriber";

// GET: Fetch subscribers list and total activity count
export async function GET() {
  try {
    await connectDB();
    const subscribers = await Subscriber.find({}).sort({ subscribedAt: -1 });

    return NextResponse.json({
      totalSubscribers: subscribers.length,
      subscribers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch subscriber activity." },
      { status: 500 },
    );
  }
}

// DELETE: Remove a subscriber
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Subscriber ID is required." },
        { status: 400 },
      );
    }

    await connectDB();
    await Subscriber.findByIdAndDelete(id);

    return NextResponse.json({ message: "Subscriber deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete subscriber." },
      { status: 500 },
    );
  }
}
