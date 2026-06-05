// components/Projects.tsx

import React from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '@/Constant/Constant';

export default function Projects() {
  return (
    <section id="projects" className=" py-20">
      <div className="text-center mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#64748b] mb-2">My Works</p>
        <h2 className="text-4xl font-bold relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-1 after:bg-[#007bff] after:rounded-full">Featured Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}

