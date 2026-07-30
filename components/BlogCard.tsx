// // components/BlogCard.tsx

// import Image from "next/image";
// import Link from "next/link";

// export interface BlogCardProps {
//   _id: string;
//   title: string;
//   slug: string;
//   category?: string;
//   excerpt: string;
//   authorName?: string;
//   authorRole?: string;
//   authorImage?: string;
//   createdAt: string;
// }

// export default function BlogCard({ blog }: { blog: BlogCardProps }) {
//   const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });

//   return (
//     <Link href={`/blog/${blog.slug}`} className="block group">
//       <div className="flex flex-col justify-between rounded-3xl bg-slate-900 border border-slate-800/80 p-6 transition-all duration-300 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-950/20">
//         {/* Top Content */}
//         <div>
//           {/* Category Tag */}
//           <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-violet-950/60 text-violet-300 border border-violet-800/50 mb-4">
//             {blog.category || "Web Application"}
//           </span>

//           {/* Title */}
//           <h3 className="text-xl font-bold text-slate-100 group-hover:text-violet-400 transition-colors leading-snug mb-3">
//             {blog.title}
//           </h3>

//           {/* Excerpt */}
//           <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-6">
//             {blog.excerpt}
//           </p>
//         </div>

//         {/* Bottom Author Card Footer */}
//         <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between mt-auto">
//           <div className="flex items-center gap-3">
//             <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
//               <Image
//                 src={blog.authorImage || "/author.jpg"}
//                 alt={blog.authorName || "Author"}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div>
//               <h4 className="text-xs font-semibold text-slate-200">
//                 {blog.authorName || "Shaikh Arif"}
//               </h4>
//               <p className="text-[11px] text-slate-400">
//                 {blog.authorRole || "Full-Stack Developer"}
//               </p>
//             </div>
//           </div>

//           <span className="text-xs font-medium text-slate-400 bg-slate-800/80 border border-slate-700/60 px-3 py-1 rounded-full">
//             {formattedDate}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }





// components/BlogCard.tsx
import Image from "next/image";
import Link from "next/link";

export interface BlogCardProps {
  _id: string;
  title: string;
  slug?: string; // Can be optional if DB record is missing slug
  category?: string;
  excerpt: string;
  authorName?: string;
  authorRole?: string;
  authorImage?: string;
  createdAt: string;
}

export default function BlogCard({ blog }: { blog: BlogCardProps }) {
  // Safe fallback if slug is missing or undefined
  const cardSlug = blog.slug || blog._id;

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "";

  return (
    <Link href={`/blog/${cardSlug}`} className="block group">
      <div className="flex flex-col justify-between rounded-3xl bg-slate-900 border border-slate-800/80 p-6 transition-all duration-300 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-950/20">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-violet-950/60 text-violet-300 border border-violet-800/50 mb-4">
            {blog.category || "SAAS"}
          </span>

          <h3 className="text-xl font-bold text-slate-100 group-hover:text-violet-400 transition-colors leading-snug mb-3">
            {blog.title}
          </h3>

          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-6">
            {blog.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
              <Image
                src={blog.authorImage || "/author.jpg"}
                alt={blog.authorName || "Author"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-200">
                {blog.authorName || "Alamin Shaikh"}
              </h4>
              <p className="text-[11px] text-slate-400">
                {blog.authorRole || "Full-Stack & AI Developer"}
              </p>
            </div>
          </div>

          {formattedDate && (
            <span className="text-xs font-medium text-slate-400 bg-slate-800/80 border border-slate-700/60 px-3 py-1 rounded-full">
              {formattedDate}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

