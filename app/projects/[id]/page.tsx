// app/projects/[id]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { ExternalLink, ArrowLeft, Code2, Layers, MoveRight } from "lucide-react";
import { FaGithubSquare } from "react-icons/fa";
import ProjectGallery from "@/components/ProjectGallery";

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

  const { title, description, image, images = [], techStack = [], demoUrl, githubUrl } = project;

  return (
    <main className="min-h-screen pt-15 md:pt-24 pb-10">

      {/* ── Back nav ─────────────────────────────────── */}
      <div className=" mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-[#369483] dark:hover:text-blue-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to projects
        </Link>
      </div>

      <div>
        <div className="relative w-full aspect-16/8 rounded-2xl overflow-hidden bg-linear-to-br from-teal-200 via-teal-100 to-cyan-100 dark:from-teal-950 dark:via-teal-900 dark:to-slate-900 mb-10 shadow-[0_10px_50px_rgba(20,184,166,0.25)] dark:shadow-[0_10px_50px_rgba(45,212,191,0.2)]">
          {image ? (
            <Image
              src={image}
              alt={`${title} screenshot`}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-contain object-center"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full gap-3 text-slate-300 dark:text-gray-700">
              <Layers className="w-12 h-12" />
              <span className="text-sm font-medium">No preview image</span>
            </div>
          )}
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ── Main grid: content + sidebar ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

          {/* Left — title, description, tech */}
          <div>
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1e293b] dark:text-white leading-tight mb-4">
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
                  <Code2 className="w-4 h-4 text-[#369483]" />
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                    Tech Stack
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="text-[12px] font-semibold px-3 py-1.5 bg-[#f8fafc] dark:bg-gray-900 dark:border-gray-700 text-[#6d7f98] rounded-md border border-slate-200 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — sticky action sidebar */}
          <aside className="lg:sticky lg:top-28 self-start space-y-3">

            {/* Card */}
            <div className="rounded-2xl border border-slate-100 dark:border-gray-800 bg-slate-50 dark:bg-gray-900/60 p-5 space-y-3">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Project Links</p>

              {/* Live Demo */}
              {demoUrl && (
                <Link
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-[#2b7473] hover:bg-[#369483] hover:shadow-[0_4px_16px_rgba(0,123,255,0.25)] transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </Link>
              )}

              {/* Source Code */}
              {githubUrl && (
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-[#1e293b] dark:text-slate-100 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700 hover:border-slate-300 transition-all duration-200"
                >
                  <FaGithubSquare className="w-4 h-4" />
                  Source Code
                </Link>
              )}

              {/* Divider */}
              <div className="h-px bg-slate-100 dark:bg-gray-800 my-1" />

              {/* Back to all projects */}
              <Link
                href="/projects"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All projects
              </Link>
            </div>

            {/* Tech count badge */}
            {techStack.length > 0 && (
              <div className="rounded-2xl border border-slate-100 dark:border-gray-800 bg-slate-50 dark:bg-gray-900/60 p-5">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Built with</p>
                <p className="text-2xl font-bold text-[#369483] tracking-widest flex items-center">
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

        {/* Hire button */}
        <div className="mt-15">
          <div className="mt-3 rounded-2xl bg-linear-to-br from-teal-200 via-teal-100 to-cyan-50 dark:from-teal-950 dark:via-teal-900 dark:to-slate-900 shadow-[0_10px_50px_rgba(20,184,166,0.25)] dark:shadow-[0_10px_50px_rgba(45,212,191,0.2)] p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center justify-between border border-slate-200 dark:border-slate-600">
          <div className='col-span-2'>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Let's Work Together</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-400 tracking-widest mb-3">Tell me <span className='text-[#369483] font-extrabold '>what you're Building</span> </h2>
            <p className="text-lg text-gray-600 dark:text-slate-300 flex items-center tracking-wider">
              Share the scope, blockers, timeline, and outcome you're looking for. I'll review the context and follow up with clear next steps.
            </p>
          </div>
          <div className='flex flex-col gap-3'>
            <Link href="/contact">
              <button className='bg-[#369483] hover:bg-[#2b7473] hover:shadow-[0_4px_16px_rgba(0,123,255,0.25)] transition-all duration-200 text-white font-semibold py-2 px-4 rounded-xl cursor-pointer flex items-center gap-2'>
                Let's Talk <MoveRight />
              </button>
            </Link>
            <Link href="#">
              <button className='bg-transparent hover:bg-[#2b7473] hover:text-white hover:shadow-[0_4px_16px_rgba(0,123,255,0.25)] transition-all duration-200 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-full cursor-pointer flex items-center gap-2 ring-1 ring-[#369483]'>
                Hire on Upwork <MoveRight />
              </button></Link>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}

