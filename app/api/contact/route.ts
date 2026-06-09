// api/contact/route.ts  (public/user/frontend api)

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ContactInfo from "@/models/ContactInfo";
import Message from "@/models/Message";

export async function GET() {
  try {
    await connectDB();
    const contacts = await ContactInfo.find().sort({ createdAt: 1 });
    return NextResponse.json(contacts);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message)
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });

    const saved = await Message.create({ name, email, subject, message });
    return NextResponse.json(saved, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

