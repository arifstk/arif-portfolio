// // app/blog/[slug]/page.tsx
// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
// import { FiCopy, FiArrowLeft } from "react-icons/fi";

// async function getBlog(slug: string) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs/${slug}`, {
//     cache: "no-store",
//   });
//   if (!res.ok) return null;
//   return res.json();
// }

// export default async function SingleBlogPage({ params }: { params: { slug: string } }) {
//   const blog = await getBlog(params.slug);

//   if (!blog) {
//     notFound();
//   }

//   const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });

//   return (
//     <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto space-y-6">

//         {/* Back Link */}
//         <Link
//           href="/blog"
//           className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-violet-400 transition-colors mb-2"
//         >
//           <FiArrowLeft /> Back to Blogs
//         </Link>

//         {/* --- Top Header Container --- */}
//         <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
//           {/* Category & Date */}
//           <div className="flex items-center gap-3">
//             <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-950/80 text-violet-300 border border-violet-800/60">
//               {blog.category || "SAAS"}
//             </span>
//             <span className="text-xs font-medium text-slate-400 bg-slate-800/70 px-3 py-1 rounded-full border border-slate-700/50">
//               {formattedDate}
//             </span>
//           </div>

//           {/* Main Title */}
//           <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-50 tracking-tight leading-tight">
//             {blog.title}
//           </h1>

//           {/* Author info & Social share bar */}
//           <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
//             {/* Author */}
//             <div className="flex items-center gap-3 bg-slate-800/40 border border-slate-800 px-4 py-2 rounded-2xl">
//               <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
//                 <Image
//                   src={blog.authorImage || "/author.jpg"}
//                   alt={blog.authorName || "Author"}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div>
//                 <h4 className="text-sm font-bold text-slate-200">
//                   {blog.authorName || "Alamin Shaikh"}
//                 </h4>
//                 <p className="text-xs text-slate-400">
//                   {blog.authorRole || "Full-Stack & AI Developer"}
//                 </p>
//               </div>
//             </div>

//             {/* Social Share Icons */}
//             <div className="flex items-center gap-2 bg-slate-800/40 border border-slate-800 px-3 py-2 rounded-2xl text-slate-300">
//               <button className="p-2 rounded-xl hover:bg-violet-600/20 hover:text-violet-400 transition-colors">
//                 <FaFacebookF size={14} />
//               </button>
//               <button className="p-2 rounded-xl hover:bg-violet-600/20 hover:text-violet-400 transition-colors">
//                 <FaTwitter size={14} />
//               </button>
//               <button className="p-2 rounded-xl hover:bg-violet-600/20 hover:text-violet-400 transition-colors">
//                 <FaWhatsapp size={14} />
//               </button>
//               <button className="p-2 rounded-xl hover:bg-violet-600/20 hover:text-violet-400 transition-colors border-l border-slate-700 pl-3">
//                 <FiCopy size={14} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* --- Main Content Article Block --- */}
//         <article className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">

//           {/* Main Hero / Banner Image */}
//           {blog.coverImage && (
//             <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-800 border border-slate-800">
//               <Image
//                 src={blog.coverImage}
//                 alt={blog.title}
//                 fill
//                 priority
//                 className="object-cover"
//               />
//             </div>
//           )}

//           {/* Excerpt Lead Paragraph */}
//           {blog.excerpt && (
//             <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium border-b border-slate-800 pb-6">
//               {blog.excerpt}
//             </p>
//           )}

//           {/* Dynamic Body Content Sections */}
//           <div className="space-y-8 text-slate-300 leading-relaxed">
//             {blog.sections?.map((sec: { heading?: string; paragraph?: string }, idx: number) => (
//               <div key={idx} className="space-y-3">
//                 {sec.heading && (
//                   <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
//                     {sec.heading}
//                   </h2>
//                 )}
//                 {sec.paragraph && (
//                   <p className="text-sm sm:text-base text-slate-300 whitespace-pre-line leading-relaxed">
//                     {sec.paragraph}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>

//         </article>

//       </div>
//     </main>
//   );
// }




// app/blog/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FiCopy, FiArrowLeft } from "react-icons/fi";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

// Direct Database Query Helper
async function getBlogBySlug(slug: string) {
  if (!slug || slug === "undefined") return null;

  try {
    await connectDB();
    // Query by slug, or fallback to _id if slug matches object ID format
    let blog = await Blog.findOne({ slug }).lean();
    if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slug).lean();
    }
    if (!blog) return null;

    // Convert MongoDB document to plain JSON object
    return JSON.parse(JSON.stringify(blog));
  } catch {
    return null;
  }
}

export default async function SingleBlogPage({ params }: { params: { slug: string } }) {
  // Await params if Next.js 15+ or destructure directly
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
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-violet-400 transition-colors mb-2"
        >
          <FiArrowLeft /> Back to Blogs
        </Link>

        {/* --- Top Header Container --- */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-950/80 text-violet-300 border border-violet-800/60">
              {blog.category || "SAAS"}
            </span>
            {formattedDate && (
              <span className="text-xs font-medium text-slate-400 bg-slate-800/70 px-3 py-1 rounded-full border border-slate-700/50">
                {formattedDate}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-50 tracking-tight leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-3 bg-slate-800/40 border border-slate-800 px-4 py-2 rounded-2xl">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                <Image
                  src={blog.authorImage || "/author.jpg"}
                  alt={blog.authorName || "Author"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-200">
                  {blog.authorName || "Shaikh Arif"}
                </h4>
                <p className="text-xs text-slate-400">
                  {blog.authorRole || "Full-Stack & AI Developer"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-800/40 border border-slate-800 px-3 py-2 rounded-2xl text-slate-300">
              <button className="p-2 rounded-xl hover:bg-violet-600/20 hover:text-violet-400 transition-colors cursor-pointer">
                <FaFacebookF size={14} />
              </button>
              <button className="p-2 rounded-xl hover:bg-violet-600/20 hover:text-violet-400 transition-colors cursor-pointer">
                <FaTwitter size={14} />
              </button>
              <button className="p-2 rounded-xl hover:bg-violet-600/20 hover:text-violet-400 transition-colors cursor-pointer">
                <FaWhatsapp size={14} />
              </button>
              <button className="p-2 rounded-xl hover:bg-violet-600/20 hover:text-violet-400 transition-colors border-l border-slate-700 pl-3 cursor-pointer">
                <FiCopy size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* --- Main Content Article Body --- */}
        <article className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          {blog.coverImage && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-800 border border-slate-800">
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
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium border-b border-slate-800 pb-6">
              {blog.excerpt}
            </p>
          )}

          <div className="space-y-8 text-slate-300 leading-relaxed">
            {blog.sections?.map((sec: { heading?: string; paragraph?: string }, idx: number) => (
              <div key={idx} className="space-y-3">
                {sec.heading && (
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
                    {sec.heading}
                  </h2>
                )}
                {sec.paragraph && (
                  <p className="text-sm sm:text-base text-slate-300 whitespace-pre-line leading-relaxed">
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

