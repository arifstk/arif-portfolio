// app/blog/page.tsx

import BlogCard, { BlogCardProps } from "@/components/BlogCard";
import HireButtonBanner from "@/components/HireButtonBanner";
import HireButtonBlog from "@/components/HireButtonBlog";
import { MoveLeft, MoveRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const PAGE_TITLE = "Blog & Articles — Shaikh Arif | Full-Stack Developer";
const PAGE_DESCRIPTION = "Insights, tutorials, and deep-dives into modern web development.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
};

async function getAllBlogs(): Promise<BlogCardProps[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
    });
    if (!res.ok) return [];

    const data = await res.json();

    return Array.isArray(data) ? data : data.blogs || [];
  } catch {
    return [];
  }
}

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const currentPage = Math.max(1, Number(resolvedParams.page) || 1);
  const ITEMS_PER_PAGE = 6;

  const allBlogs = await getAllBlogs();

  const totalPages = Math.ceil(allBlogs.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBlogs = allBlogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-[#070c18] text-slate-800 dark:text-gray-200 py-16 pt-25 transition-colors duration-300 overflow-hidden">

      {/* Background Ambient Violet Glow Effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-70 md:w-150 h-40 md:h-88 bg-violet-600/15 dark:bg-violet-600/20 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 -right-20 w-50 md:w-100 h-33 md:h-75 bg-violet-700/10 dark:bg-violet-700/15 blur-[100px] rounded-full" />

      <div className="relative w-[92%] xl:w-[80%] mx-auto space-y-10">

        <HireButtonBlog />

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
            Insights, tutorials, and deep-dives into modern web development.
          </p>
        </div>

        {/* Content Section */}
        {paginatedBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-3 sm:p-7 rounded-2xl bg-white dark:bg-black/20 border border-slate-200 dark:border-gray-700 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <p className="text-slate-500 dark:text-gray-400 text-base font-medium">
              No blog posts found. Check back later!
            </p>
          </div>
        ) : (
          <div className="space-y-5 sm:space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {paginatedBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>

            {/* --- Pagination --- */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center pt-4">
                <div className="inline-flex items-center justify-between gap-3 px-6 py-2.5 rounded-full bg-white/90 dark:bg-gray-900/90 border border-slate-200/80 dark:border-gray-800 shadow-md backdrop-blur-md text-sm font-semibold">

                  {/* Previous Link */}
                  {currentPage > 1 ? (
                    <Link
                      href={`/blog?page=${currentPage - 1}`}
                      className="flex items-center justify-center gap-1.5 text-violet-600 dark:text-violet-400 hover:text-violet-900 dark:hover:text-violet-300 transition-colors"
                    >
                      <MoveLeft className="w-4 h-4" /> <span>Prev</span>
                    </Link>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5 text-slate-300 dark:text-gray-600 cursor-not-allowed">
                      <MoveLeft className="w-4 h-4" /> <span>Prev</span>
                    </span>
                  )}

                  {/* Indicator Page / Total */}
                  <span className="text-violet-600 dark:text-violet-400 font-bold px-2">
                    {currentPage}/{totalPages}
                  </span>

                  {/* Next Link */}
                  {currentPage < totalPages ? (
                    <Link
                      href={`/blog?page=${currentPage + 1}`}
                      className="flex items-center justify-center gap-1.5 text-violet-600 dark:text-violet-400 hover:text-violet-900 dark:hover:text-violet-300 transition-colors"
                    >
                      <span>Next</span> <MoveRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5 text-slate-300 dark:text-gray-600 cursor-not-allowed">
                      <span>Next</span> <MoveRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <HireButtonBanner />
      </div>
    </main>
  );
}

