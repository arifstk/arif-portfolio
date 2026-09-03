// lib/data/blogs.ts

import { connectDB } from "@/lib/db";
import BlogModel from "@/models/Blog";
import { cacheTag } from "next/cache";

async function fetchBlogsFromDB() {
  try {
    await connectDB();
    const blogs = await BlogModel.find().sort({ createdAt: -1 }).lean();

    return blogs.map((b: any) => ({
      _id: String(b._id),
      title: b.title,
      slug: b.slug,
      description: b.description,
      content: b.content,
      image: b.image,
      createdAt: b.createdAt,
    }));
  } catch {
    return [];
  }
}

export async function getBlogs() {
  "use cache";
  cacheTag("blogs");

  return await fetchBlogsFromDB();
}
