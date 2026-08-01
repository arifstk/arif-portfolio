
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

  const allProjects = await getProjects();

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
        <HireButtonProductPg />
      </div>

      {/* Render paginated list */}
      <Projects 
        projects={paginatedProjects} 
        currentPage={currentPage} 
        totalPages={totalPages} 
        baseUrl="/projects"
      />
    </div>
  );
}

