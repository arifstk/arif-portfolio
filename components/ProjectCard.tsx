// components/ProjectCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, MoveRight } from 'lucide-react';
// import { FaGithubSquare } from "react-icons/fa";
import SourceCodeButton from './SourceCodeButton';

interface ProjectCardProps {
  project: {
    _id?: string;
    title: string;
    description: string;
    image: string;
    techStack: string[];
    demoUrl: string;
    githubUrl: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { _id, title, description, image, techStack, demoUrl, githubUrl } = project;

  return (
    <div className="group flex flex-col h-full rounded-2xl dark:bg-black/20 dark:border-gray-700 border border-slate-200 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(139,92,246,0.12)]">

      {/* Project Image Container — clicking takes you to detail page */}
      <Link href={_id ? `/projects/${_id}` : "#"} className="block relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
        {image ? (
          <Image
            src={image}
            alt={`${title} Thumbnail`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-102"
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
        <Link href={_id ? `/projects/${_id}` : "#"}>
          <h4 className="text-xl font-bold text-[#1e293b] dark:text-gray-200 mb-2 transition-colors duration-300 hover:text-violet-700 dark:hover:text-violet-500 truncate">
            {title}
          </h4>
        </Link>

        {/* Short Description */}
        <p className="text-sm text-[#64748b] dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">
          {description}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3 mt-auto">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="text-[10px] font-medium px-2.5 py-0.5 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-slate-400 border border-violet-100 dark:border-violet-900/40 rounded-full transition-colors duration-300 group-hover:border-violet-500/20 tracking-tight"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-violet-700 hover:bg-violet-600 dark:bg-violet-700 dark:hover:bg-violet-600 text-white border  dark:border-violet-900/60 px-3 rounded-xl transition-all duration-200 shadow-xs"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </Link>

          <SourceCodeButton
            githubUrl={githubUrl}
            projectTitle={title}
            className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-[#1e293b] dark:text-gray-200 bg-[#f8fafc] dark:bg-gray-900 border border-slate-200 dark:border-gray-700 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-gray-800 hover:border-violet-300 dark:hover:border-violet-800"
          />
        </div>

        {/* View Details link */}
        {_id && (
          <Link
            href={`/projects/${_id}`}
            className="mt-3 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-violet-700 dark:text-violet-500 border border-violet-100 dark:border-violet-900/30 bg-violet-50/40 dark:bg-violet-950/20 hover:bg-violet-100/60 dark:hover:bg-violet-900/30 transition-all duration-200"
          >
            View Details
            <MoveRight className="w-6 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

