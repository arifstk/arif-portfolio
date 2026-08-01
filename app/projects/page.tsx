// // app/projects/page.tsx

// import type { Metadata } from "next";
// import Script from "next/script";
// import HireButtonProductPg from '@/components/HireButtonProductPg'
// import Projects from '@/components/Projects'
// import { getProjects } from "@/lib/data/projects";

// export const dynamic = "force-dynamic";

// const PAGE_TITLE = "Projects — Shaikh Arif | Full-Stack Next.js Developer";
// const PAGE_DESCRIPTION =
//   "Selected Next.js full-stack projects covering production systems, admin dashboards, and internal tools — built with MongoDB, Tailwind CSS, and NextAuth.";

// export const metadata: Metadata = {
//   title: PAGE_TITLE,
//   description: PAGE_DESCRIPTION,
//   alternates: {
//     canonical: "/projects",
//   },
//   openGraph: {
//     title: PAGE_TITLE,
//     description: PAGE_DESCRIPTION,
//     url: "/projects",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: PAGE_TITLE,
//     description: PAGE_DESCRIPTION,
//   },
// };

// export default async function Page() {
//   const projects = await getProjects();

//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     name: "Projects",
//     description: PAGE_DESCRIPTION,
//     mainEntity: {
//       "@type": "ItemList",
//       itemListElement: projects.map((p, i) => ({
//         "@type": "ListItem",
//         position: i + 1,
//         url: `/projects/${p._id}`,
//         name: p.title,
//       })),
//     },
//   };

//   return (
//     <div className="pt-20 md:pt-25 mb-10">
//       <Script
//         id="projects-jsonld"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />

//       <div className='w-[92%] xl:w-[80%] mx-auto'>
//         <p className="text-xs font-semibold uppercase tracking-widest text-[#6d7f98] mb-2">
//           Selected Works
//         </p>
//         {/* This is now the page's single <h1> — was a <h4> before, which meant
//             the whole page had no top-level heading at all. */}
//         <h1 className="text-sm tracking-wide text-[#6d7f98] mb-2 pb-3 font-normal">
//           Selected Next.js Full-Stack Projects to work across production systems and internal tools
//         </h1>
//         <HireButtonProductPg />
//       </div>
//       <Projects projects={projects} />
//     </div>
//   )
// }





// app/projects/page.tsx

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import HireButtonProductPg from '@/components/HireButtonProductPg';
import Projects from '@/components/Projects';
import { getProjects } from "@/lib/data/projects";
import { MoveLeft, MoveRight } from "lucide-react";

export const dynamic = "force-dynamic";

const PAGE_TITLE = "Projects — Shaikh Arif | Full-Stack Developer";
const PAGE_DESCRIPTION =
  "Selected Next.js full-stack projects covering production systems, admin dashboards, and internal tools — built with MongoDB, Tailwind CSS and NextAuth.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const currentPage = Math.max(1, Number(resolvedParams.page) || 1);
  const ITEMS_PER_PAGE = 6;

  // 1. Fetch all projects
  const allProjects = await getProjects();

  // 2. Calculate server-side pagination
  const totalPages = Math.ceil(allProjects.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = allProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects",
    description: PAGE_DESCRIPTION,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allProjects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `/projects/${p._id}`,
        name: p.title,
      })),
    },
  };

  return (
    <div className="pt-20 md:pt-25 mb-10">
      <Script
        id="projects-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className='w-[92%] xl:w-[80%] mx-auto'>
        <p className="text-lg font-semibold tracking-widest text-[#6d7f98] mb-2">
          Selected Works
        </p>
        <h1 className="text-sm tracking-wide text-[#6d7f98] mb-2 pb-3 font-normal">
          Selected Next.js Full-Stack Projects to work across production systems and internal tools
        </h1>
        <HireButtonProductPg />
      </div>

      {/* Render paginated list */}
      <Projects projects={paginatedProjects} />

      {/* --- Capsule Pagination Control --- */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-8">
          <div className="inline-flex items-center justify-between gap-3 px-6 py-2.5 rounded-full bg-white/90 dark:bg-gray-900/90 border border-slate-200/80 dark:border-gray-800 shadow-md backdrop-blur-md text-sm font-semibold">

            {/* Previous Link */}
            {currentPage > 1 ? (
              <Link
                href={`/projects?page=${currentPage - 1}`}
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
                href={`/projects?page=${currentPage + 1}`}
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
  );
}

