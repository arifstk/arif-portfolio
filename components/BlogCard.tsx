// components/BlogCard.tsx

import Image from "next/image";
import Link from "next/link";

export interface BlogCardProps {
  _id: string;
  title: string;
  slug?: string;
  category?: string;
  excerpt: string;
  authorName?: string;
  authorRole?: string;
  authorImage?: string;
  createdAt: string;
}

export default function BlogCard({ blog }: { blog: BlogCardProps }) {
  const cardSlug = blog.slug || blog._id;

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "";

  return (
    <Link href={`/blog/${cardSlug}`} className="block group h-full">
      <div className="flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-black/20 border border-slate-300 dark:border-gray-700 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 dark:hover:border-violet-500/50 hover:shadow-[0_12px_30px_rgba(124,58,237,0.18)]">

        {/* Upper Card Content */}
        <div className="p-4 sm:p-6">
          {/* Category Badge */}
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border border-violet-100 dark:border-violet-900/40 mb-4 transition-colors duration-300 group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-600">
            {blog.category || "Web Application"}
          </span>

          {/* Title */}
          <h3 className="text-xl font-bold text-[#1e293b] dark:text-gray-100 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors leading-snug mb-3">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[#64748b] dark:text-gray-400 line-clamp-3 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>

        {/* Filled Footer Section */}
        <div className="px-4 sm:px-6 py-2 sm:py-4 bg-violet-200/40 dark:bg-violet-950/30 border-t border-violet-200 dark:border-violet-900/40 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white dark:bg-gray-800 border border-violet-200 dark:border-violet-800/60 shrink-0">
              <Image
                src={blog.authorImage || "/author.jpg"}
                alt={blog.authorName || "Author"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1e293b] dark:text-gray-200">
                {blog.authorName || "Shaikh Arif"}
              </h4>
              <p className="text-xs text-[#64748b] dark:text-gray-400">
                {blog.authorRole || "Full-Stack JavaScript Developer"}
              </p>
            </div>
          </div>

          {formattedDate && (
            <span className="text-xs font-medium text-violet-700 dark:text-violet-300 bg-white/80 dark:bg-black/30 px-3 py-1 rounded-full border border-violet-200/80 dark:border-violet-800/50 shadow-xs">
              {formattedDate}
            </span>
          )}
        </div>

      </div>
    </Link>
  );
}

 