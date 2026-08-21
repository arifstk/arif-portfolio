// app/not-found.tsx

import Link from 'next/link';
import { Search, Home, Mail, Link2Off, MoveRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center p-3">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-violet-100 dark:border-violet-800/30 mt-20 p-4 py-8 md:p-8 md:py-13 max-w-lg w-full text-center shadow-xl shadow-violet-800/5 dark:shadow-violet-400/5 transition-colors">

        {/* Top Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-6">
          <Link2Off className="w-8 h-8 text-violet-800 dark:text-violet-400" />
        </div>

        {/* Badge */}
        <span className="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-400 text-xs font-semibold tracking-wider uppercase mb-4">
          404 Not Found
        </span>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
          <span className="text-violet-800 dark:text-violet-400">This page doesn't exist.</span> Let's get you back on track.
        </h1>

        {/* Info Box */}
        <div className="border border-violet-100 dark:border-violet-800/30 rounded-2xl overflow-hidden mb-8 text-left divide-y divide-violet-100 dark:divide-violet-800/30 bg-violet-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3 p-4 text-sm text-slate-700 dark:text-slate-300">
            <Search className="w-4 h-4 text-violet-800 dark:text-violet-400 shrink-0" />
            <span>Double-check the URL for typing mistakes.</span>
          </div>
          <div className="flex items-center gap-3 p-4 text-sm text-slate-700 dark:text-slate-300">
            <Home className="w-4 h-4 text-violet-800 dark:text-violet-400 shrink-0" />
            <span>Head to the <Link href="/" className="text-violet-800 dark:text-violet-400 underline font-medium hover:text-violet-900 dark:hover:text-violet-300 transition-colors">homepage</Link> to keep browsing.</span>
          </div>
          <div className="flex items-center gap-3 p-4 text-sm text-slate-700 dark:text-slate-300">
            <Mail className="w-4 h-4 text-violet-800 dark:text-violet-400 shrink-0" />
            <span>If this persists, <Link href="/contact" className="text-violet-800 dark:text-violet-400 underline font-medium hover:text-violet-900 dark:hover:text-violet-300 transition-colors">contact</Link> me and I'll help.</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 bg-violet-800 dark:bg-violet-600 hover:bg-violet-600 dark:hover:bg-violet-500 text-white text-sm font-medium px-6 py-2 rounded-xl shadow-lg shadow-violet-800/30 dark:shadow-violet-400/20 transition-all duration-200"
        >
          Go home
          <MoveRight className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5" />
        </Link>
      </div>
    </div>
  );
}
