// app/api/admin/messages/[id]/route.ts
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

// Mark as read
export async function PATCH(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await guardAdmin();
    await connectDB();
    const { id } = await params;
    const updated = await Message.findByIdAndUpdate(id, { read: true }, { new: true });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await guardAdmin();
    await connectDB();
    const { id } = await params;
    await Message.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

