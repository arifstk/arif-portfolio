// app/blog/page.tsx

import BlogCard, { BlogCardProps } from "@/components/BlogCard";
import { Metadata } from "next";

const PAGE_TITLE = "Blog & Articles — Shaikh Arif | Full-Stack Next.js Developer";
const PAGE_DESCRIPTION = "Insights, tutorials, and deep-dives into modern web development, Next.js, TypeScript, MongoDB, and software architecture.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

async function getBlogs(): Promise<BlogCardProps[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-[#070c18] text-slate-800 dark:text-gray-200 py-16 pt-25 transition-colors duration-300 overflow-hidden">

      {/* Background Ambient Violet Glow Effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-70 md:w-150 h-40 md:h-88 bg-violet-600/15 dark:bg-violet-600/20 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 -right-20 w-50 md:w-100 h-33 md:h-75 bg-violet-700/10 dark:bg-violet-700/15 blur-[100px] rounded-full" />

      <div className="relative w-[92%] xl:w-[80%] mx-auto space-y-10">

        {/* Page Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50 shadow-[0_0_15px_rgba(124,58,237,0.15)]">
            <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
            Latest Updates
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1e293b] dark:text-white tracking-wider">
            Blog & <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-700 to-violet-500 dark:from-violet-400 dark:to-violet-600">Articles</span>
          </h1>
          <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Insights, tutorials, and deep-dives into modern web development, Next.js, and software design.
          </p>
        </div>

        {/* Content Section */}
        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-7 rounded-2xl bg-white dark:bg-black/20 border border-slate-200 dark:border-gray-700 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <p className="text-slate-500 dark:text-gray-400 text-base font-medium">
              No blog posts found. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

