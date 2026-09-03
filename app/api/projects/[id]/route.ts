// app/api/projects/[id]/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { cacheLife, cacheTag } from "next/cache";

async function fetchProjectById(id: string) {
  "use cache";
  cacheTag(`project-${id}`);
  cacheLife({ stale: 3600 });

  await connectDB();
  return await Project.findById(id).lean();
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // 24 character Mongo ObjectId
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const project = await fetchProjectById(id);

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(JSON.stringify(project)));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
