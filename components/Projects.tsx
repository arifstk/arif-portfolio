// // components/Projects.tsx

"use client";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="pt-15 md:pt-20 mb-10">
      <div className="w-[92%] xl:w-[80%] mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-violet-700 after:rounded-full tracking-wider">
            Selected Projects
          </h2>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-slate-400 text-sm">No projects yet.</p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-13 sm:gap-10">
              {projects.slice(0, visibleCount).map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>

            {visibleCount < projects.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleShowMore}
                  className="px-6 py-2 text-sm bg-violet-700 hover:bg-violet-600 dark:bg-violet-700 dark:hover:bg-violet-600 text-white rounded-xl  transition cursor-pointer"
                >
                  Show More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
