// app/projects/[id]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { ExternalLink, ArrowLeft, Code2, Layers, MoveRight } from "lucide-react";
import ProjectGallery from "@/components/ProjectGallery";
import SourceCodeButton from "@/components/SourceCodeButton";
import HireButtonBanner from "@/components/HireButtonBanner";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getProject(id: string) {
  try {
    await connectDB();
    const project = await Project.findById(id).lean();
    return project as any;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Project`,
    description: project.description,
    openGraph: { images: project.image ? [project.image] : [] },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();
  const { title, description, image, images = [], techStack = [], demoUrl, githubUrl, outcome } = project;

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-5 w-[92%] xl:w-[80%] mx-auto">

      {/* ── Back nav ─────────────────────────────────── */}
      <div className=" mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to projects
        </Link>
      </div>

      <div>
        {/* Banner image frame with a soft violet shadow glow */}
        <div className="relative w-full aspect-16/8 rounded-2xl overflow-hidden bg-linear-to-br from-violet-100 via-purple-100 to-indigo-100 dark:from-violet-950/40 dark:via-purple-950/20 dark:to-slate-900 border border-slate-200 dark:border-slate-600 shadow-[0_10px_50px_rgba(139,92,246,0.15)] dark:shadow-[0_10px_50px_rgba(139,92,246,0.1)] mb-10">
          {image ? (
            <Image
              src={image}
              alt={`${title} screenshot`}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full gap-3 text-slate-300 dark:text-gray-700">
              <Layers className="w-12 h-12 text-violet-300 dark:text-violet-800" />
              <span className="text-sm font-medium">No preview image</span>
            </div>
          )}
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-0 bg-linear-to-t pointer-events-none" />
        </div>

        {/* ── Main grid: content + sidebar ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 mt-8">

          {/* Left — title, description, tech */}
          <div>
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1e293b] dark:text-white leading-tight mb-4">
              {title}
            </h1>

            {/* Description */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-base text-[#475569] dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Tech stack */}
            {techStack.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <Code2 className="w-4 h-4 text-violet-700 dark:text-violet-400" />
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                    Tech Stack
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-2.5 py-0.5 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-slate-400 border border-violet-100 dark:border-violet-900/40
                      
                      
                        rounded-full hover:border-violet-300 dark:hover:border-violet-800 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Outcome */}
            {outcome && (
              <div className="mt-8">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider pb-2">✔️ Outcome</p>
                <div className=" rounded-2xl space-y-3 bg-linear-to-br from-violet-300/60 via-purple-50/10 to-indigo-300/60 dark:from-violet-950/40 dark:via-purple-950/20 dark:to-slate-900 shadow-[0_10px_50px_rgba(139,92,246,0.15)] dark:shadow-[0_10px_50px_rgba(139,92,246,0.1)] p-3 sm:p-6 border border-violet-200 dark:border-slate-800
            ">
                  <p className="text-base text-[#505c6c] dark:text-slate-300 leading-relaxed whitespace-pre-line">{outcome}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right — sticky action sidebar */}
          <aside className="lg:sticky lg:top-28 self-start space-y-4">
            {/* Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-900/60 p-5 space-y-3">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Project Links</p>

              {/* Live Demo */}
              {demoUrl && (
                <Link
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm font-semibold text-white bg-violet-700 hover:bg-violet-600 dark:bg-violet-700 dark:hover:bg-violet-600 hover:shadow-[0_4px_16px_rgba(139,92,246,0.3)] transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </Link>
              )}

              {/* Source Code */}
              {githubUrl && (
                <SourceCodeButton
                  githubUrl={githubUrl}
                  projectTitle={title}
                  className="flex items-center justify-center w-full gap-1.5 py-2 rounded-xl text-sm font-semibold text-[#1e293b] dark:text-gray-200 bg-[#f8fafc] dark:bg-gray-900 border border-slate-200 dark:border-gray-700 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-gray-800 hover:border-violet-300 dark:hover:border-violet-800"
                />
              )}

              {/* Divider */}
              <div className="h-px bg-slate-100 dark:bg-gray-800 my-1" />

              {/* Back to all projects */}
              <Link
                href="/projects"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400  bg-violet-100/60 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all duration-200"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All projects
              </Link>
            </div>

            {/* Tech count badge */}
            {techStack.length > 0 && (
              <div className="rounded-2xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-900/60 p-5">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Built with</p>
                <p className="text-2xl font-bold text-violet-700 dark:text-violet-400 tracking-widest flex items-center">
                  {techStack.length}
                  <span className="text-sm font-normal text-slate-400 ml-1.5">technologies</span>
                </p>
              </div>
            )}
          </aside>
        </div>

        {/* More images */}
        <div className="mt-15">
          <ProjectGallery images={images} title={title} />
        </div>
        {/* Hire Button Banner */}
        <div className='pt-10 sm:pt-11'>
          <HireButtonBanner />
        </div>
      </div>
    </main>
  );
}

