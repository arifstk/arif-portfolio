// app/api/projects/[id]/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { unstable_cache } from "next/cache";

async function fetchProjectById(id: string) {
  await connectDB();
  return await Project.findById(id).lean();
}

const getCachedProjectById = (id: string) =>
  unstable_cache(async () => fetchProjectById(id), [`project-single-${id}`], {
    revalidate: 3600,
    tags: ["projects", `project-${id}`],
  })();

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // get specific project from cash
    const project = await getCachedProjectById(id);

    if (!project)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
