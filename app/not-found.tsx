// // app/not-found.tsx
// import Link from "next/link";

// export default function NotFound() {
//   return (
//     <section className="py-10 mt-6 md:mt-15 text-gray-800 dark:text-gray-200 min-h-[70vh] flex items-center justify-center">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6">

//         {/* ── Number ── */}
//         <div className="relative mb-8 select-none">
//           <p className="text-[10rem] sm:text-[14rem] font-black leading-none text-violet-100 dark:text-slate-800/80 tracking-tighter">
//             404
//           </p>
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-12 h-0.5 bg-violet-700 mr-4 shrink-0" />
//             <p className="text-sm sm:text-md font-semibold text-violet-700 uppercase tracking-[0.2em]">
//               Page not found
//             </p>
//           </div>
//         </div>

//         {/* ── Message ── */}
//         <h1 className="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-100 mb-3 leading-snug">
//           Looks like you're lost.
//         </h1>
//         <p className="text-sm sm:text-md text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-sm">
//           The page you're looking for doesn't exist or has been moved. Let's get you back on track.
//         </p>

//         {/* ── Actions ── */}
//         <div className="flex flex-wrap gap-3">
//           <Link
//             href="/"
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-violet-700 hover:bg-violet-600 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-blue-200 dark:hover:shadow-none"
//           >
//             <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//               <path d="M3 12l9-9 9 9M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9" />
//             </svg>
//             Go home
//           </Link>
//           <Link
//             href="/projects"
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all duration-200"
//           >
//             View projects
//             <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }


import Link from 'next/link';
import { Search, Home, Mail, ArrowRight, Link2Off } from 'lucide-react';

export default function NotFound() {
  return (
    <div className=" bg-violet-50/30 dark:bg-slate-950 flex items-center justify-center p-3">
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
            <span>If this persists, contact me and I'll help.</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-violet-800 dark:bg-violet-600 hover:bg-violet-900 dark:hover:bg-violet-500 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-lg shadow-violet-800/30 dark:shadow-violet-400/20"
        >
          Go home
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
