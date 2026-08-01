// components/Projects.tsx (Server Component — presentational)

import ProjectsGrid from "./ProjectsGrid";
import type { Project } from "@/types";

export default function Projects({ projects = [] }: { projects?: Project[] }) {
  return (
    <section className="pt-15 md:pt-20 mb-10">
      <div className="w-[92%] xl:w-[80%] mx-auto">
        {/* Header */}
        <div className="mb-3">
          <p className="text-lg font-semibold tracking-widest text-violet-700 dark:text-violet-500 mb-2">
            Selected Works
          </p>
          <p className="text-sm tracking-wide text-slate-600 dark:text-slate-400 mb-2 pb-3 font-normal">
            A collection of real-world Next.js full-stack projects showcasing scalable web applications, production-ready systems, and custom internal tools built with modern technologies.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-slate-400 text-sm">No projects yet.</p>
        ) : (
          <ProjectsGrid projects={projects} />
        )}
      </div>
    </section>
  );
}
