// app/blog/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import SocialLinks from "@/components/SocialLinks";
import { Metadata } from "next";
import Newsletter from "@/components/Newsletter";
import { SITE_URL } from "@/lib/seo";
import { cache } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

// ✅ React cache ব্যবহার করে Request Deduplication নিশ্চিত করা হলো
const getBlogBySlug = cache(async (slug: string) => {
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
});

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
  const description = blog.excerpt || `Read ${blog.title} on Shaikh Arif's developer blog`;
  const images = blog.coverImage ? [{ url: blog.coverImage }] : [];

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${slug}`,
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

// (**bold**) and inline code (`code`)
function InlineFormattedText({ text }: { text: string }) {
  if (!text) return null;

  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="inline-block px-1 py-0.5 mx-0.5 text-sm font-mono font-medium rounded-md bg-violet-100 dark:bg-slate-800 text-violet-800 dark:text-slate-300 border border-violet-200 dark:border-slate-500 shadow-xs align-baseline"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-slate-900 dark:text-gray-100">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
}

// clip text ([clip: ...]), and bold
function RichParagraphRenderer({ content }: { content: string }) {
  if (!content) return null;

  const tokens = content.split(/(\[clip:\s*[^\]]+\])/g);

  return (
    <div className="space-y-2">
      {tokens.map((token, index) => {
        if (token.startsWith("[clip:") && token.endsWith("]")) {
          const clipVal = token.slice(6, -1).trim();
          return (
            <div
              key={index}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-medium text-slate-800 dark:text-slate-300 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/80 rounded-md"
            >
              <span className="overflow-x-auto select-all">📋 {clipVal}</span>
            </div>
          );
        }

        const lines = token.split("\n");
        return (
          <div key={index} className="space-y-1">
            {lines.map((line, lineIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith("# ")) {
                return (
                  <h1 key={lineIdx} className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-gray-100 pt-3">
                    <InlineFormattedText text={trimmed.replace(/^#\s+/, "")} />
                  </h1>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={lineIdx} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-gray-100 pt-3">
                    <InlineFormattedText text={trimmed.replace(/^##\s+/, "")} />
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={lineIdx} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-gray-100 pt-2">
                    <InlineFormattedText text={trimmed.replace(/^###\s+/, "")} />
                  </h3>
                );
              }
              if (trimmed.startsWith("#### ")) {
                return (
                  <h4 key={lineIdx} className="text-base sm:text-lg font-semibold text-slate-900 dark:text-gray-100 pt-2">
                    <InlineFormattedText text={trimmed.replace(/^####\s+/, "")} />
                  </h4>
                );
              }

              return (
                <p key={lineIdx} className="text-md text-slate-700 dark:text-gray-300 leading-relaxed">
                  <InlineFormattedText text={line} />
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage ? [blog.coverImage] : [],
    datePublished: blog.createdAt,
    author: {
      "@type": "Person",
      name: blog.authorName || "Shaikh Arif",
      url: SITE_URL,
    },
  };

  return (
    <main className="min-h-screen text-slate-800 dark:text-gray-200 py-12 pt-25 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative w-[92%] md:w-[80%] mx-auto space-y-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-violet-700 dark:text-gray-400 dark:hover:text-violet-400 transition-colors duration-200 mb-2"
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>

        {/* Header Section */}
        <div className="rounded-2xl bg-linear-to-br from-violet-300/60 via-purple-50/10 to-indigo-300/60 dark:from-violet-950/40 dark:via-purple-950/20 dark:to-slate-900 border border-slate-200 dark:border-gray-700 p-3 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-900/40 uppercase tracking-wider">
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

            <div className="flex items-center gap-1.5 bg-[#f8fafc] dark:bg-gray-900 border border-slate-200 dark:border-gray-800 px-2.5 py-1.5 rounded-xl text-[#64748b] dark:text-gray-300">
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Article Body */}
        <article className="rounded-2xl sm:border sm:border-slate-200 sm:dark:border-gray-700 sm:p-5 sm:shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-8">
          {blog.coverImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-violet-100/40 dark:bg-gray-900 border border-slate-200 dark:border-gray-800">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                priority
                className="object-contain"
              />
            </div>
          )}

          {blog.excerpt && (
            <p className="text-base sm:text-lg text-[#64748b] dark:text-gray-300 leading-relaxed font-medium border-b border-slate-100 dark:border-gray-800 pb-6">
              {blog.excerpt}
            </p>
          )}

          {/* Article */}
          <div className="space-y-8 text-[#1e293b] dark:text-gray-300 leading-relaxed">
            {blog.sections?.map((sec: any, secIdx: number) => (
              <div key={secIdx} className="space-y-4 pt-2">
                {sec.heading && (
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1e293b] dark:text-gray-100 tracking-tight">
                    <InlineFormattedText text={sec.heading} />
                  </h2>
                )}

                {sec.blocks && sec.blocks.length > 0 && (
                  sec.blocks.map((block: any, blockIdx: number) => {
                    if (block.type === "paragraph" && block.value) {
                      return <RichParagraphRenderer key={blockIdx} content={block.value} />;
                    }

                    if (block.type === "code" && block.value) {
                      return (
                        <div
                          key={blockIdx}
                          className="relative my-4 rounded-xl bg-[#080d1a] border border-slate-800 shadow-xl overflow-hidden"
                        >
                          <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1527] border-b border-slate-800/80">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          </div>
                          <pre className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-cyan-400 overflow-x-auto leading-relaxed">
                            <code>{block.value}</code>
                          </pre>
                        </div>
                      );
                    }

                    return null;
                  })
                )}
              </div>
            ))}
          </div>
        </article>

      </div>
      <div className="pt-15 w-full sm:w-[92%] md:w-[80%] mx-auto"><Newsletter /></div>
    </main>
  );
}
