// api/socials/route.ts  (public/user/frontend api)

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SocialLink from "@/models/SocialLink";

export async function GET() {
  try {
    await connectDB();
    const socials = await SocialLink.find().sort({ order: 1 });
    return NextResponse.json(socials);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

