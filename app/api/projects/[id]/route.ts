// app/api/projects/[id]/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function GET(
  _: Request,
  { params }: { params: Promise< { id: string }> }
) {
  try {
    await connectDB();
    const {id} = await params;
    const project = await Project.findById(id);
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

