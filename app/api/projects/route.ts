// app/api/projects/route.ts (public/user/frontend api)

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { unstable_cache } from "next/cache";

async function fetchAllProjects() {
  await connectDB();
  return await Project.find().sort({ order: 1, createdAt: -1 }).lean();
}

const getCachedProjects = unstable_cache(
  async () => fetchAllProjects(),
  ["projects-public-list"],
  {
    revalidate: 3600,
    tags: ["projects"],
  },
);

export async function GET() {
  try {
    // get project from cash
    const projects = await getCachedProjects();
    return NextResponse.json(projects);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
