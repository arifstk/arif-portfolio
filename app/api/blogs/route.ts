// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { unstable_cache } from "next/cache";

async function fetchBlogsFromDB(skip?: number, limit?: number) {
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

const getCachedBlogs = (skip?: number, limit?: number) =>
  unstable_cache(
    async () => fetchBlogsFromDB(skip, limit),
    [`blogs-api-${skip ?? "all"}-${limit ?? "all"}`], // Unique Cache Key
    {
      revalidate: 3600,
      tags: ["blogs"],
    },
  )();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    if (pageParam) {
      const page = Math.max(1, parseInt(pageParam, 10) || 1);
      const limit = Math.max(1, parseInt(limitParam || "6", 10));
      const skip = (page - 1) * limit;

      // get data from cashed
      const { blogs, totalBlogs } = await getCachedBlogs(skip, limit);
      const totalPages = Math.ceil(totalBlogs / limit) || 1;

      return NextResponse.json(
        {
          blogs,
          totalPages,
          currentPage: page,
          totalBlogs,
        },
        { status: 200 },
      );
    }

    // cash for all blog
    const { blogs } = await getCachedBlogs();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
