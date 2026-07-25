// components/Projects.tsx (Server Component — presentational)

import ProjectsGrid from "./ProjectsGrid";
import type { Project } from "@/types";

export default function Projects({ projects = [] }: { projects?: Project[] }) {
  return (
    <section className="pt-15 md:pt-20 mb-10">
      <div className="w-[92%] xl:w-[80%] mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-violet-700 after:rounded-full tracking-wider">
            Selected Projects
          </h2>
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
