// app/projects/page.tsx

import type { Metadata } from "next";
import Script from "next/script";
import HireButtonProductPg from '@/components/HireButtonProductPg'
import Projects from '@/components/Projects'
import { getProjects } from "@/lib/data/projects";

export const dynamic = "force-dynamic";

const PAGE_TITLE = "Projects — Arif Hossain | Full-Stack Next.js Developer";
const PAGE_DESCRIPTION =
  "Selected Next.js full-stack projects covering production systems, admin dashboards, and internal tools — built with MongoDB, Tailwind CSS, and NextAuth.";

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

export default async function Page() {
  const projects = await getProjects();

  // Structured data — helps search engines understand this is a
  // list/collection of individual project pages, and can surface
  // rich results (e.g. site links) for the project titles.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects",
    description: PAGE_DESCRIPTION,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `/projects/${p._id}`,
        name: p.title,
      })),
    },
  };

  return (
    <div className="pt-15 md:pt-25 mb-10">
      <Script
        id="projects-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className='w-[92%] xl:w-[80%] mx-auto'>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6d7f98] mb-2">
          Selected Works
        </p>
        {/* This is now the page's single <h1> — was a <h4> before, which meant
            the whole page had no top-level heading at all. */}
        <h1 className="text-sm tracking-wide text-[#6d7f98] mb-2 pb-3 font-normal">
          Selected Next.js Full-Stack Projects to work across production systems and internal tools
        </h1>
        <HireButtonProductPg />
      </div>
      <Projects projects={projects} />
    </div>
  )
}

