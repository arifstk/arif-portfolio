// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
