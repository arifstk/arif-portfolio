// app/api/projects/[id]/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export const revalidate = 3600;

async function fetchProjectById(id: string) {
  await connectDB();
  return await Project.findById(id).lean();
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // ✅ ২৪ ক্যারেক্টারের সঠিক Mongo ObjectId না হলে দ্রুত 400 এরর হ্যান্ডলিং
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    await connectDB();
    const project = await Project.findById(id).lean();

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(JSON.stringify(project)));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
