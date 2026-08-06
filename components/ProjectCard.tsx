// components/ProjectCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, MoveRight } from 'lucide-react';

interface ProjectCardProps {
  project: {
    _id?: string;
    type: string;
    title: string;
    description: any;
    image: string;
    techStack: string[];
    demoUrl: string;
    githubUrl: string;
    outcome?: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { _id, title, description, image, techStack, demoUrl, githubUrl, outcome } = project;

  return (
    <div className=" flex flex-col h-full rounded-2xl dark:bg-black/20 dark:border-gray-700 border border-slate-200 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 dark:hover:border-violet-500/20 hover:shadow-[0_12px_30px_rgba(124,58,237,0.18)]">

      <Link href={_id ? `/projects/${_id}` : "#"} className="block relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
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
      </Link>

      {/* Content Area */}
      <div className="flex flex-col grow p-3">
        {/* Project Title */}
        <p className="text-md font-bold uppercase tracking-widest tracking-relaxed text-violet-800 dark:text-violet-400 mb-1 truncate">
          {title}
        </p>

        {/* Project Type */}
        <span className="text-2xl sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-200 rounded-full mb-2 inline-block">
          {project.type || "Web App"}
        </span>

        {/* Outcome */}
        {outcome && (
          <p className="text-md text-[#64748b] dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">
            {outcome}
          </p>
        )}

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-2 mt-auto">
          {techStack.map((tech, index) => (
            // <span
            //   key={index}
            //   className="text-xs font-medium px-3 py-0.5
            //    bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-slate-400 border border-violet-200 dark:border-violet-800/50 rounded-full transition-colors duration-300 group-hover:border-violet-500/20 tracking-tight"
            // >
            //   {tech}
            // </span>
            <span
              key={index}
              className="text-xs font-medium px-3 py-0.5 bg-slate-50 dark:bg-gray-900 text-[#64748b] dark:text-gray-400 border border-zinc-200 dark:border-gray-700 rounded-full transition-colors duration-300 group-hover:border-zinc-500/20 tracking-tight"
            >
              {tech}
            </span>
          ))}
        </div>

        {_id && (
          <div className="mt-3 flex justify-end">
            <Link
              href={`/projects/${_id}`}
              className="group inline-flex items-center gap-1.5 pb-1 pr-1 text-xs font-semibold text-violet-800 dark:text-violet-500 transition-all duration-200"
            >
              <span>View Details</span>
              <MoveRight className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

