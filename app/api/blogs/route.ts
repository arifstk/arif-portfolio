// app/api/blogs/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { cacheLife, cacheTag } from "next/cache";

async function fetchBlogsFromDB(skip?: number, limit?: number) {
  "use cache";
  cacheTag("blogs");
  cacheLife({ stale: 3600 });

  await connectDB();

  if (skip !== undefined && limit !== undefined) {
    const [blogs, totalBlogs] = await Promise.all([
      Blog.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Blog.countDocuments({}),
    ]);
    return { blogs, totalBlogs };
  }

  const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
  return { blogs, totalBlogs: blogs.length };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    if (pageParam) {
      const page = Math.max(1, parseInt(pageParam, 10) || 1);
      const limit = Math.max(1, parseInt(limitParam || "6", 10));
      const skip = (page - 1) * limit;

      const { blogs, totalBlogs } = await fetchBlogsFromDB(skip, limit);
      const totalPages = Math.ceil(totalBlogs / limit) || 1;

      return NextResponse.json(
        {
          blogs: JSON.parse(JSON.stringify(blogs)),
          totalPages,
          currentPage: page,
          totalBlogs,
        },
        { status: 200 },
      );
    }

    const { blogs } = await fetchBlogsFromDB();
    return NextResponse.json(JSON.parse(JSON.stringify(blogs)), {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
