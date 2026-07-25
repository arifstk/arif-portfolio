// components/ProjectsGrid.tsx (Client Component)
"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [visibleCount, setVisibleCount] = useState(6);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-13 sm:gap-10">
        {projects.slice(0, visibleCount).map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {visibleCount < projects.length && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-6 py-2 text-sm bg-violet-700 hover:bg-violet-600 dark:bg-violet-700 dark:hover:bg-violet-600 text-white rounded-xl transition cursor-pointer"
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
}

