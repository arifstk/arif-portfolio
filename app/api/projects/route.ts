// app/api/projects/route.ts (public/user/frontend api)

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export const revalidate = 3600;

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json(JSON.parse(JSON.stringify(projects)));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
