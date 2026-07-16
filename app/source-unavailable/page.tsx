// app/source-unavailable/page.tsx

import Link from "next/link";
import { Lock, ArrowLeft, MoveRight } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ project?: string }>;
}

export const metadata = {
  title: "Source Unavailable — Project",
};

export default async function SourceUnavailablePage({ searchParams }: PageProps) {
  const { project } = await searchParams;

  return (
    <main className="min-h-screen pt-0 sm:pt-20 pb-0 sm:pb-12 flex items-center justify-center">
      <div className="max-w-3xl w-full text-center px-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-linear-to-br from-violet-200 via-purple-100 to-indigo-100 dark:from-violet-950/40 dark:via-purple-950/20 dark:to-slate-900  flex items-center justify-center mb-6 ring ring-violet-500/50">
          <Lock className="w-7 h-7 text-violet-700 dark:text-violet-500" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-white mb-3">
          Source code isn&apos;t public
        </h1>

        <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-8">
          {project ? (
            <>
              The repository for <span className="font-semibold text-violet-700">{project} </span> is
              kept private — usually because it&apos;s a client project or contains config I can&apos;t
              share publicly.
            </>
          ) : (
            <>
              This repository is kept private — usually because it&apos;s a client project or contains
              config I can&apos;t share publicly.
            </>
          )}{" "}
          Happy to walk you through the code directly if you&apos;re interested.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/projects"
            className=" bg-transparent hover:bg-violet-100 dark:hover:bg-violet-950/40 text-gray-500 dark:text-white/60 font-semibold text-sm py-2.5 px-5 rounded-full cursor-pointer flex items-center justify-center gap-2 ring-1 ring-violet-500/50 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" /> Back to projects
          </Link>
          <Link
            href="/contact"
            className=" bg-violet-700 hover:bg-violet-600 text-white shadow-[0_4px_12px_rgba(139,92,246,0.2)] dark:bg-violet-700 dark:hover:bg-violet-600 transition-all duration-200 font-semibold text-sm py-2.5 px-6 rounded-full cursor-pointer flex items-center justify-center gap-2"
          >
            Get in touch <MoveRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

