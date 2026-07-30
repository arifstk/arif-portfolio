// app/blog/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import SocialLinks from "@/components/SocialLinks";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

// Database Helper
async function getBlogBySlug(slug: string) {
  if (!slug || slug === "undefined") return null;

  try {
    await connectDB();
    let blog = await Blog.findOne({ slug }).lean();
    if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slug).lean();
    }
    if (!blog) return null;

    return JSON.parse(JSON.stringify(blog));
  } catch {
    return null;
  }
}

// Dynamic SEO Metadata Generator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const title = `${blog.title} — Shaikh Arif`;
  const description = blog.excerpt || `Read ${blog.title} on Shaikh Arif's developer blog.`;
  const images = blog.coverImage ? [{ url: blog.coverImage }] : [];

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: blog.createdAt,
      authors: [blog.authorName || "Shaikh Arif"],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export default async function SingleBlogPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "";

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#070c18] text-slate-800 dark:text-gray-200 py-12 pt-25 transition-colors duration-300">

      {/* Background Ambient Violet Glow Effects */}
      {/* <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-70 md:w-150 h-40 md:h-88 bg-violet-600/15 dark:bg-violet-600/20 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 -right-20 w-50 md:w-100 h-33 md:h-75 bg-violet-700/10 dark:bg-violet-700/15 blur-[100px] rounded-full" /> */}

      <div className="relative w-[92%] md:w-[80%] mx-auto space-y-6">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-violet-700 dark:text-gray-400 dark:hover:text-violet-400 transition-colors duration-200 mb-2"
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>

        {/* --- Top Header Card --- */}
        <div className="rounded-2xl bg-white dark:bg-black/20 border border-slate-200 dark:border-gray-700 p-3 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border border-violet-100 dark:border-violet-900/40 uppercase tracking-wider">
              {blog.category || "Web Application"}
            </span>
            {formattedDate && (
              <span className="text-xs font-medium text-[#6d7f98] dark:text-slate-300 bg-[#f8fafc] dark:bg-gray-900 px-3 py-1 rounded-full border border-slate-100 dark:border-gray-800">
                {formattedDate}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1e293b] dark:text-gray-100 tracking-tight leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-start gap-4 pt-4 border-t border-slate-100 dark:border-gray-800">
            {/* Author Section */}
            <div className="flex items-center gap-3 bg-[#f8fafc] dark:bg-gray-900 border border-slate-200 dark:border-gray-800 px-3.5 py-2 rounded-xl">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-100 dark:bg-gray-800 shrink-0 border border-slate-200 dark:border-gray-700">
                <Image
                  src={blog.authorImage || "/author.jpg"}
                  alt={blog.authorName || "Author"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1e293b] dark:text-gray-200">
                  {blog.authorName || "Shaikh Arif"}
                </h4>
                <p className="text-[11px] text-[#64748b] dark:text-gray-400">
                  {blog.authorRole || "Full-Stack Developer"}
                </p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-1.5 bg-[#f8fafc] dark:bg-gray-900 border border-slate-200 dark:border-gray-800 px-2.5 py-1.5 rounded-xl text-[#64748b] dark:text-gray-300">
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* --- Main Content Article Body --- */}
        <article className="rounded-2xl bg-white dark:bg-black/20 border border-slate-200 dark:border-gray-700 p-3 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-8">

          {blog.coverImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-800">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {blog.excerpt && (
            <p className="text-base sm:text-lg text-[#64748b] dark:text-gray-300 leading-relaxed font-medium border-b border-slate-100 dark:border-gray-800 pb-6">
              {blog.excerpt}
            </p>
          )}

          <div className="space-y-8 text-[#1e293b] dark:text-gray-300 leading-relaxed">
            {blog.sections?.map((sec: { heading?: string; paragraph?: string }, idx: number) => (
              <div key={idx} className="space-y-3">
                {sec.heading && (
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1e293b] dark:text-gray-100 tracking-tight">
                    {sec.heading}
                  </h2>
                )}
                {sec.paragraph && (
                  <p className="text-sm sm:text-base text-[#64748b] dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {sec.paragraph}
                  </p>
                )}
              </div>
            ))}
          </div>
        </article>

      </div>
    </main>
  );
}

