// app/api/projects/route.ts (public/user/frontend api)

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { cacheLife, cacheTag } from "next/cache";

async function fetchProjectsFromDB() {
  "use cache";
  cacheTag("projects");
  cacheLife({ stale: 3600 });

  await connectDB();
  return await Project.find().sort({ order: 1, createdAt: -1 }).lean();
}

export async function GET() {
  try {
    const projects = await fetchProjectsFromDB();
    return NextResponse.json(JSON.parse(JSON.stringify(projects)));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
