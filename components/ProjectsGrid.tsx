// components/ProjectsGrid.tsx (Client Component)
"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-13 sm:gap-10">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </>
  );
}

