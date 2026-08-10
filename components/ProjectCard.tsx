// components/ProjectCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';

interface ProjectCardProps {
  project: {
    _id?: string;
    type?: string;
    title: string;
    description?: any;
    image: string;
    techStack: string[];
    demoUrl?: string;
    githubUrl?: string;
    outcome?: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { _id, title, description, image, techStack = [], outcome } = project;
  const maxVisibleTech = 3;
  const visibleTech = techStack.slice(0, maxVisibleTech);
  const remainingTechCount = techStack.length - maxVisibleTech;

  const contentText = outcome || (typeof description === 'string' ? description : '');

  return (
    <div>
      {/* DESKTOP */}
      <div className="hidden sm:block">
        {_id && (
          <Link href={`/projects/${_id}`}
            className="group relative w-full aspect-square rounded-2xl dark:bg-black/20 dark:border-gray-700 border border-slate-200 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 dark:hover:border-violet-500/20 hover:shadow-[0_12px_30px_rgba(124,58,237,0.18)] flex flex-col justify-end">

            <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-100">
              {image ? (
                <Image
                  src={image}
                  alt={`${title} Thumbnail`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-slate-100 dark:bg-gray-900 text-slate-400 dark:text-gray-600 text-sm">
                  No Image
                </div>
              )}
            </div>

            <div className="relative z-10 w-full bg-violet-100/90 dark:bg-black/80 rounded-xl p-3.5 border-t border-violet-300 dark:border-gray-700 
            shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3),0_8px_10px_-6px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_30px_-5px_rgba(0,0,0,0.8)] transform translate-y-[115%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out
            ">

              {/* Title */}
              <p className=" text-sm font-semibold uppercase tracking-wide text-violet-800 dark:text-violet-400">
                {title}
              </p>

              {/* Tag / Type */}
              <p className="text-lg font-bold text-slate-800 dark:text-slate-200 line-clamp-1 mb-0.5 truncate">
                {project.type || "Web App"}
              </p>

              {/* Outcome */}
              {contentText && (
                <p className="text-sm text-zinc-700 dark:text-gray-400 leading-relaxed mb-2.5 line-clamp-2">
                  {contentText}
                </p>
              )}

              {/* Bottom Line */}
              <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-violet-300 dark:border-gray-600">

                {/* Tech Badges */}
                <div className="flex items-center gap-1 overflow-hidden">
                  {visibleTech.map((tech, index) => (
                    <span
                      key={index}
                      className="text-[11px] font-medium px-2 py-0.5 bg-violet-50 dark:bg-gray-900 text-[#64748b] dark:text-gray-400 border border-zinc-200 dark:border-gray-700 rounded-full tracking-tight whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}

                  {/* Overflow Counter Tag */}
                  {remainingTechCount > 0 && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-violet-200 dark:bg-violet-950/60 text-violet-900 dark:text-slate-400 border border-violet-200 dark:border-violet-800/50 rounded-full whitespace-nowrap">
                      +{remainingTechCount}
                    </span>
                  )}
                </div>

                <div
                  className="inline-flex items-center gap-1 text-xs font-semibold text-violet-800 dark:text-violet-500 hover:underline shrink-0 ml-auto"
                >
                  <span>Details</span>
                  <MoveRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* MOBILE  --------------------------------------------- */}
      <div className="block sm:hidden">
        {_id && (
          <Link
            href={`/projects/${_id}`}
            className=" flex flex-col h-full rounded-2xl dark:bg-black/20 dark:border-gray-700 border border-slate-200 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 dark:hover:border-violet-500/20 hover:shadow-[0_12px_30px_rgba(124,58,237,0.18)]">

            <div className="block relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
              {image ? (
                <Image
                  src={image}
                  alt={`${title} Thumbnail`}
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-auto object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-slate-100 dark:bg-gray-900 text-slate-400 dark:text-gray-600 text-sm">
                  No Image
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex flex-col grow p-3">
              {/* Title */}
              <p className="text-sm font-bold uppercase tracking-wider text-violet-800 dark:text-violet-400 mb-1 truncate">
                {title}
              </p>

              {/* Type */}
              <span className="text-xl sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-200 rounded-full mb-2 inline-block">
                {project.type || "Web App"}
              </span>

              {/* Outcome */}
              {outcome && (
                <p className="text-sm text-[#64748b] dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                  {outcome}
                </p>
              )}


              <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-violet-200 dark:border-gray-600">
                {/* Tech Stack Badges */}
                <div className="flex items-center gap-1 overflow-hidden">
                  {visibleTech.map((tech, index) => (
                    <span
                      key={index}
                      className="text-[11px] font-medium px-2 py-0.5 bg-slate-50 dark:bg-gray-900 text-[#64748b] dark:text-gray-400 border border-zinc-200 dark:border-gray-700 rounded-full tracking-tight whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}

                  {/* Overflow Counter Tag */}
                  {remainingTechCount > 0 && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-slate-400 border border-violet-200 dark:border-violet-800/50 rounded-full whitespace-nowrap">
                      +{remainingTechCount}
                    </span>
                  )}
                </div>
                <div
                  className="inline-flex items-center gap-1 text-xs font-semibold text-violet-800 dark:text-violet-400 hover:underline shrink-0 ml-auto"
                >
                  <span>Details</span>
                  <MoveRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        )
        }
      </div>
    </div >
  );
}


