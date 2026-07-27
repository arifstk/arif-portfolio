// app/page.tsx (or wherever HomePage lives)

import type { Metadata } from "next";
import Script from "next/script";
import Hero from '@/components/Hero';
import HeroMobile from '@/components/HeroMobile';
import HireButtonBanner from '@/components/HireButtonBanner';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import { getProjects } from '@/lib/data/projects';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const HomePage = async () => {
  const projects = await getProjects();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arif Hossain",
    url: SITE_URL,
    jobTitle: "Full-Stack Developer",
    sameAs: [],
  };

  return (
    <div className='overflow-hidden min-h-screen mt-1 pt-15 md:pt-20'>
      <Script
        id="person-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HeroMobile />
      <Hero />
      <Projects projects={projects} />
      <Skills />
      <div className='pt-3 sm:pt-11 pb-4 w-[92%] xl:w-[80%] mx-auto'>
        <HireButtonBanner />
      </div>
    </div>
  )
}

export default HomePage;


// // import Home from '@/components/Helper/Home/Home';

// import Hero from '@/components/Hero';
// import HeroMobile from '@/components/HeroMobile';
// import HireButtonBanner from '@/components/HireButtonBanner';
// import Projects from '@/components/Projects';
// import Skills from '@/components/Skills';
// import { getProjects } from '@/lib/data/projects';

// const HomePage = async () => {
//   const projects = await getProjects();
//   return (
//     <div className='overflow-hidden min-h-screen pt-8 md:pt-20'>
//       <HeroMobile />
//       <Hero />
//       <Projects projects={projects} />
//       <Skills />
//       <div className='pt-3 sm:pt-11 pb-4 w-[92%] xl:w-[80%] mx-auto'>
//         <HireButtonBanner />
//       </div>
//     </div>
//   )
// }

// export default HomePage;

