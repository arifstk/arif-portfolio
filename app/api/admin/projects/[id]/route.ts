// app/api/admin/projects/[id]/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { deleteImage } from "@/lib/cloudinary";

async function guardAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin")
    throw new Error("Unauthorized");
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await guardAdmin();
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const updated = await Project.findByIdAndUpdate(id, body, { new: true });
    if (!updated)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await guardAdmin();
    await connectDB();
    const { id } = await params; // ← await here
    const project = await Project.findById(id);
    if (project?.imagePublicId) {
      await deleteImage(project.imagePublicId).catch(() => {});
    }
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
