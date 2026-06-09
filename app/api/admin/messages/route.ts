// app/api/admin/messages/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

async function guardAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin")
    throw new Error("Unauthorized");
}

export async function GET() {
  try {
    await guardAdmin();
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}

