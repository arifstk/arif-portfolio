// app/page.tsx (or wherever HomePage lives)

import type { Metadata } from "next";
import Script from "next/script";
import dynamic from "next/dynamic";
import Hero from '@/components/Hero';
import HeroMobile from '@/components/HeroMobile';
// import HireButtonBanner from '@/components/HireButtonBanner';
// import Projects from '@/components/Projects';
// import Skills from '@/components/Skills';
import { getProjects } from '@/lib/data/projects';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';
// import GitHubActivity from "@/components/GitHubActivity";
// import Newsletter from "@/components/Newsletter";


const Projects = dynamic(() => import("@/components/Projects"));
const Skills = dynamic(() => import("@/components/Skills"));
const HireButtonBanner = dynamic(() => import("@/components/HireButtonBanner"));
const GitHubActivity = dynamic(() => import("@/components/GitHubActivity"));
const Newsletter = dynamic(() => import("@/components/Newsletter"));


export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const resolvedParams = await searchParams;
  const currentPage = Math.max(1, Number(resolvedParams?.page) || 1);
  const ITEMS_PER_PAGE = 6;
  
  const projects = await getProjects();
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shaikh Arif",
    url: SITE_URL,
    jobTitle: "Full-Stack Developer",
    sameAs: [],
  };

  return (
    <div className='overflow-hidden min-h-screen mt-1 pt-15 md:pt-20'>
      <Script
        id="person-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HeroMobile />
      <Hero />
      <Projects 
        projects={paginatedProjects} 
        currentPage={currentPage} 
        totalPages={totalPages} 
        baseUrl="/"
      />
      <Skills />
      <div className='pt-3 sm:pt-11 pb-4 w-full sm:w-[92%] xl:w-[80%] mx-auto'>
        <HireButtonBanner />
      </div>
      <div className='pt-3 sm:pt-11 pb-4 w-[92%] xl:w-[80%] mx-auto'>
        <GitHubActivity />
      </div>
      <div className='pt-3 sm:pt-11 pb-4 w-full sm:w-[92%] xl:w-[80%] mx-auto'>
        <Newsletter />
      </div>
    </div>
  )
}

export default HomePage;

