// api/contact/route.ts  (public/user/frontend api)

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ContactInfo from "@/models/ContactInfo";

export async function GET() {
  try {
    await connectDB();
    const contacts = await ContactInfo.find().sort({ createdAt: 1 });
    return NextResponse.json(contacts);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
