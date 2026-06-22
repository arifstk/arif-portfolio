// components/ProjectCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithubSquare } from "react-icons/fa";

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
    <div className="group flex flex-col h-full rounded-2xl dark:bg-black/20 dark:border-gray-700 border border-slate-200 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,123,255,0.08)]">

      {/* Project Image Container — clicking takes you to detail page */}
      <Link href={_id ? `/projects/${_id}` : "#"} className="block relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
        {image ? (
          <Image
            src={image}
            alt={`${title} Thumbnail`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
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
          <h4 className="text-xl font-bold text-[#1e293b] dark:text-gray-200 mb-2 transition-colors duration-300 hover:text-[#369483] dark:hover:text-[#369483] truncate">
            {title}
          </h4>
        </Link>

        {/* Short Description */}
        <p className="text-sm text-[#64748b] dark:text-gray-400 leading-relaxed mb-5 line-clamp-2">
          {description}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="text-[11px] font-medium px-2.5 py-1 bg-[#f8fafc] dark:bg-gray-900 dark:border-gray-700 text-[#6d7f98] rounded-md border border-slate-100 transition-colors duration-300 group-hover:border-[#007bff]/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-gray-800">
          <Link
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold text-white bg-[#2b7473] transition-all duration-300 hover:bg-[#338a89] hover:shadow-[0_4px_12px_rgba(0,123,255,0.2)]"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </Link>
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-[#1e293b] dark:text-gray-200 bg-[#f8fafc] dark:bg-gray-900 border border-slate-100 dark:border-gray-700 transition-all duration-300 hover:bg-[#f1f5f9] hover:border-slate-200"
          >
            <FaGithubSquare className="w-4 h-4" />
            Source Code
          </Link>
        </div>

        {/* View Details link */}
        {_id && (
          <Link
            href={`/projects/${_id}`}
            className="mt-3 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-[#2b7473] dark:text-[#369483] border border-blue-100 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}