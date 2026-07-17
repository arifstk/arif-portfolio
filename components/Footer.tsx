// components/Footer.tsx

"use client";
import Link from 'next/link';
import Logo from './Helper/Home/Navbar/Logo';
import { NavLinks } from '@/Constant/Constant';
import SocialLinks from './SocialLinks';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full text-[#1e293b] mt-10 pt-10 pb-8 bg-violet-50 dark:bg-slate-950">
      <div className="w-[92%] xl:w-[80%] mx-auto flex flex-col gap-5">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">

          {/* Branding & Description */}
          <div className="flex flex-col items-start gap-4 max-w-2xl">
            <Logo />
            <p className="text-sm text-[#64748b] leading-relaxed">
              Coded in <span className='text-violet-700 dark:text-violet-600 font-semibold'>Visual Studio</span> Code with GitHub dark theme by yours truly. Built with <span className='text-violet-700 dark:text-violet-600 font-semibold'>Next.js</span> and deployed with <span className='text-violet-700 dark:text-violet-600 font-semibold'>Vercel.</span>
            </p>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={handleScrollToTop}
            aria-label="Scroll back to top"
            className="group flex items-center gap-1.5 text-xs font-semibold text-[#64748b] hover:text-violet-600 transition-colors duration-300 cursor-pointer self-end md:self-auto"
          >
            Back to top
            <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-500 group-hover:border-[#007bff]/20 group-hover:bg-[#007bff]/5 transition-all duration-300">
              <ArrowUp className="w-3.5 h-3.5 group-hover:text-violet-600 group-hover:-translate-y-1 transition-all duration-300" />
            </div>
          </button>
        </div>

        {/* Divider Line */}
        <hr className="border-t border-violet-200/50 dark:border-slate-700/40 w-full m-0" />

        {/* Bottom Section */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">

          {/* Copyright text */}
          <p className="text-sm text-[#64748b] text-center sm:text-left">
            &copy; {currentYear} Arif Hossain
          </p>

          {/* Social Platforms Links */}
          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <SocialLinks />
          </div>

        </div>
      </div>
    </footer>
  );
}

