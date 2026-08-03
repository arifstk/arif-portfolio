// components/About.tsx

import React from 'react';
import { Code2, Bolt } from 'lucide-react';
import { FaCubes } from 'react-icons/fa';
import { BsDatabase } from 'react-icons/bs';
import Image from 'next/image';

export default function About() {
  const pillars = [
    {
      icon: <Code2 className="w-6 h-6 text-violet-700" />,
      title: "Web Development",
      description: "Building high-performance, responsive web applications utilizing modern front-end and back-end ecosystems."
    },
    {
      icon: <FaCubes className="w-6 h-6 text-violet-700" />,
      title: "Problem Solving",
      description: "Breaking down complex computational issues into practical, structured, and modular logic workflows."
    },
    {
      icon: <BsDatabase className="w-6 h-6 text-violet-700" />,
      title: "Backend & Databases",
      description: "Designing secure API endpoints, maintaining server architectures, and optimizing data layers."
    },
    {
      icon: <Bolt className="w-6 h-6 text-violet-700" />,
      title: "Optimization",
      description: "Ensuring fast load times, semantic structure, and maintaining a clean, highly scalable codebase."
    }
  ];

  return (
    <section id="about" className="mt-1 pt-20 md:pt-25 mb-10 text-gray-800 dark:text-gray-200">

      {/* Section Header */}
      <div className="">
        <p className="text-lg font-semibold tracking-widest text-violet-800 dark:text-violet-600 mb-2">
          About Me
        </p>
        <p className="text-sm tracking-wide text-slate-600 dark:text-slate-400 mb-2 pb-3 font-normal">
          Next.js Full-Stack Developer specializing in building modern, scalable web applications, production systems, and internal business tools with a focus on performance and user experience.
        </p>
      </div>

      <div className="mb-8 md:mb-10">
      </div>
      {/* banner */}
      <div className="w-full h-full md:w-full md:h-full overflow-hidden rounded-2xl mb-10 md:mb-16">
        <Image
          src="/images/about-banner3.jpeg" width={400} height={400}
          alt="about banner"
          quality={100}
          className="object-contain w-full h-full"
          priority={true}
        />
      </div>

      {/* Main Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-12 lg:gap-16 items-start">

        {/* Left Side: Narrative Biography */}
        <div className="lg:col-span-5 space-y-5">
          <h3 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-gray-300">
            Bridging Creativity & Code
          </h3>
          <p className="text-[#64748b] text-sm sm:text-base leading-relaxed">
            I am a software developer deeply passionate about crafting clean, efficient, and user-centric software solutions. My journey into tech stems from a curiosity about how complex back-end operations can elegantly translate into seamless front-end experiences.
          </p>
          <p className="text-[#64748b] text-sm sm:text-base leading-relaxed">
            Whether it’s architecting robust web applications, optimizing database workflows, or engineering responsive UI elements, I strive to write code that is not just functional, but <strong className="text-violet-700 font-bold">scalable and maintainable</strong>.
          </p>
          <p className="text-[#64748b] text-sm sm:text-base leading-relaxed">
            When I'm not coding, you can find me exploring new technical frameworks, refining my system design skills, or contributing to open-source collaborative projects.
          </p>
        </div>

        {/* Right Side: Expertise Highlights Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-violet-300/60 via-purple-50/10 to-indigo-300/60 dark:from-violet-950/40 dark:via-purple-950/20 dark:to-slate-900  dark:border-gray-700 p-6 rounded-xl border border-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,123,255,0.04)]"
            >
              <div className="mb-4">
                {pillar.icon}
              </div>
              <h4 className="text-lg font-bold text-[#1e293b] dark:text-gray-200 mb-2">
                {pillar.title}
              </h4>
              <p className="text-sm text-[#64748b] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

