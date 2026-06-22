// // components/Projects.tsx

// "use client";
// import { useEffect, useState } from "react";
// import ProjectCard from "./ProjectCard";
// import { Project } from "@/types";

// export default function Projects() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [visibleCount, setVisibleCount] = useState(3);

//   useEffect(() => {
//     fetch("/api/projects")
//       .then((r) => r.json())
//       .then((data) => {
//         if (Array.isArray(data)) setProjects(data);
//       })
//       .catch(() => { })
//       .finally(() => setLoading(false));
//   }, []);

//   const handleShowMore = () => {
//     setVisibleCount((prev) => prev + 3);
//   }

//   return (
//     <section className="pt-10 md:pt-20">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-12 text-center">
//           <p className="text-xs font-semibold uppercase tracking-widest text-[#64748b] mb-2">My Works</p>
//           <h2 className="text-4xl font-bold relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-1 after:bg-[#007bff] after:rounded-full">
//             Featured Projects
//           </h2>
//         </div>

//         {/* Grid */}
//         {loading ? (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="h-80 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"
//               />
//             ))}
//           </div>
//         ) : projects.length === 0 ? (
//           <p className="text-slate-400 text-sm">No projects yet.</p>
//         ) : (
//           <>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {projects.map((project) => (
//                 <ProjectCard key={project._id} project={project} />
//               ))}
//             </div>
//             {visibleCount < projects.length && (
//               <div>
//                 <button
//                   onClick={handleShowMore}
//                   className="px-4 py-2 rounded-xl text-xs font-medium bg-[#007bff] hover:bg-[#007bff]/80 text-white transition-colors"
//                 >
//                   Show More
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// }





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
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="pt-10 md:pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6d7f98] mb-2">
            My Works
          </p>
          <h2 className="text-4xl font-bold relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-1 after:bg-[#369483] after:rounded-full">
            Featured Projects
          </h2>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, visibleCount).map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>

            {visibleCount < projects.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleShowMore}
                  className="px-6 py-2 bg-[#007bff] text-white rounded-lg hover:bg-[#0056b3] transition cursor-pointer"
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
