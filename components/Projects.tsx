// // components/Projects.tsx (Server Component — presentational)

// import ProjectsGrid from "./ProjectsGrid";
// import type { Project } from "@/types";

// export default function Projects({ projects = [] }: { projects?: Project[] }) {
//   return (
//     <section className="pt-15 md:pt-20 mb-10">
//       <div className="w-[92%] xl:w-[80%] mx-auto">
//         {/* Header */}
//         <div className="mb-3">
//           <p className="text-lg font-semibold tracking-widest text-violet-700 dark:text-violet-500 mb-2">
//             Selected Works
//           </p>
//           <p className="text-sm tracking-wide text-slate-600 dark:text-slate-400 mb-2 pb-3 font-normal">
//             A collection of real-world Next.js full-stack projects showcasing scalable web applications, production-ready systems, and custom internal tools built with modern technologies.
//           </p>
//         </div>

//         {projects.length === 0 ? (
//           <p className="text-slate-400 text-sm">No projects yet.</p>
//         ) : (
//           <ProjectsGrid projects={projects} />
//         )}
//       </div>
//     </section>
//   );
// }


// components/Projects.tsx
import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";
import ProjectsGrid from "./ProjectsGrid";
import type { Project } from "@/types";

interface ProjectsProps {
  projects?: Project[];
  currentPage?: number;
  totalPages?: number;
  baseUrl?: string; // e.g. "/" or "/projects"
}

export default function Projects({
  projects = [],
  currentPage = 1,
  totalPages = 1,
  baseUrl = "",
}: ProjectsProps) {
  return (
    <section className="pt-15 md:pt-20 mb-10">
      <div className="w-[92%] xl:w-[80%] mx-auto">
        {/* Header */}
        <div className="mb-3">
          <p className="text-lg font-semibold tracking-widest text-violet-800 dark:text-violet-600 mb-2">
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

        {/* --- Shared Capsule Pagination Control --- */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-8">
            <div className="inline-flex items-center justify-between gap-3 px-6 py-2.5 rounded-full bg-white/90 dark:bg-gray-900/90 border border-slate-200/80 dark:border-gray-800 shadow-md backdrop-blur-md text-sm font-semibold">
              
              {/* Previous Link */}
              {currentPage > 1 ? (
                <Link
                  href={`${baseUrl}?page=${currentPage - 1}`}
                  className="flex items-center justify-center gap-1.5 text-violet-800 dark:text-violet-600 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                >
                  <MoveLeft className="w-4 h-4" /> <span>Prev</span>
                </Link>
              ) : (
                <span className="flex items-center justify-center gap-1.5 text-slate-300 dark:text-gray-600 cursor-not-allowed">
                  <MoveLeft className="w-4 h-4" /> <span>Prev</span>
                </span>
              )}

              {/* Indicator Page / Total */}
              <span className="text-violet-800 dark:text-violet-600 font-bold px-2">
                {currentPage}/{totalPages}
              </span>

              {/* Next Link */}
              {currentPage < totalPages ? (
                <Link
                  href={`${baseUrl}?page=${currentPage + 1}`}
                  className="flex items-center justify-center gap-1.5 text-violet-800 dark:text-violet-600 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                >
                  <span>Next</span> <MoveRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="flex items-center justify-center gap-1.5 text-slate-300 dark:text-gray-600 cursor-not-allowed">
                  <span>Next</span> <MoveRight className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

