// api/admin/contact/route.ts (for admin only api)

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import ContactInfo from "@/models/ContactInfo";

async function guardAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin")
    throw new Error("Unauthorized");
}

export async function GET() {
  try {
    await guardAdmin();
    await connectDB();
    const socials = await ContactInfo.find().sort({ order: 1 });
    return NextResponse.json(socials);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    await guardAdmin();
    await connectDB();
    const body = await req.json();
    const social = await ContactInfo.create(body);
    return NextResponse.json(social, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
