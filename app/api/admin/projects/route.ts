// app/api/admin/projects/route.ts (for admin only api)

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

import { revalidateTag } from "next/cache";

async function guardAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin")
    throw new Error("Unauthorized");
}

export async function GET() {
  try {
    await guardAdmin();
    await connectDB();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(projects);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: e.message === "Unauthorized" ? 401 : 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await guardAdmin();
    await connectDB();
    const body = await req.json();
    const project = await Project.create(body);
    revalidateTag("projects", "max");
    return NextResponse.json(project, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: e.message === "Unauthorized" ? 401 : 500 },
    );
  }
}
