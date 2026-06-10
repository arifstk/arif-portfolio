// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-10 mt-6 md:mt-15 text-gray-800 dark:text-gray-200 min-h-[70vh] flex items-center">
      <div className="w-[95%] xl:w-[80%] mx-auto">

        {/* ── Number ── */}
        <div className="relative mb-8 select-none">
          <p className="text-[10rem] sm:text-[14rem] font-black leading-none text-slate-100 dark:text-slate-800/80 tracking-tighter">
            404
          </p>
          <div className="absolute inset-0 flex items-center">
            <div className="w-12 h-0.5 bg-blue-500 mr-4 shrink-0" />
            <p className="text-sm font-semibold text-blue-500 uppercase tracking-[0.2em]">
              Page not found
            </p>
          </div>
        </div>

        {/* ── Message ── */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-snug">
          Looks like you're lost.
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-10 max-w-sm">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* ── Actions ── */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-blue-200 dark:hover:shadow-none"
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M3 12l9-9 9 9M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9" />
            </svg>
            Go home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all duration-200"
          >
            View projects
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}