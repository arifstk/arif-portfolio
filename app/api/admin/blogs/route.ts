// app/api/admin/blogs/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { revalidatePath, revalidateTag } from "next/cache";

async function guardAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export async function GET() {
  try {
    await guardAdmin();
    await connectDB();

    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message === "Unauthorized" ? 401 : 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await guardAdmin();
    await connectDB();

    const body = await req.json();
    const {
      title,
      category,
      coverImage,
      coverImagePublicId,
      excerpt,
      authorName,
      authorRole,
      authorImage,
      sections,
    } = body;

    if (!title || !coverImage) {
      return NextResponse.json(
        { error: "Title and Cover Image are required." },
        { status: 400 },
      );
    }

    let slug = slugify(title);
    const existing = await Blog.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const newBlog = await Blog.create({
      title,
      slug,
      category: category || "Web Application",
      coverImage,
      coverImagePublicId,
      excerpt,
      authorName: authorName || "Shaikh Arif",
      authorRole: authorRole || "Full-Stack Developer",
      authorImage: authorImage || "/author.jpg",
      sections: sections || [],
    });
    revalidateTag("blogs", "max");
    revalidatePath("/blog");

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message === "Unauthorized" ? 401 : 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    await guardAdmin();
    await connectDB();

    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 },
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedBlog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 },
      );
    }
    revalidateTag("blogs", "max");

    return NextResponse.json(updatedBlog);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message === "Unauthorized" ? 401 : 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await guardAdmin();
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 },
      );
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    revalidateTag("blogs", "max");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message === "Unauthorized" ? 401 : 500 },
    );
  }
}
