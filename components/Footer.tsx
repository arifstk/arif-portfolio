// components/Footer.tsx

"use client";
import Link from 'next/link';
import Logo from './Helper/Home/Navbar/Logo';
import SocialLinks from './SocialLinks';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className=" text-[#1e293b] pt-10 pb-3 ">
      <div className="w-[92%] xl:w-[80%] mx-auto flex flex-col gap-4 md:pb-7">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">

          {/* Branding & Description */}
          <div className="flex flex-col items-start gap-4 max-w-2xl">
            <Logo />
            <p className="text-sm sm:text-base text-[#64748b] leading-relaxed">
              Coded in <span className='text-violet-700 dark:text-violet-600 font-semibold'>Visual Studio</span> Code with GitHub dark theme by yours truly. Built with <span className='text-violet-700 dark:text-violet-600 font-semibold'>Next.js</span> and deployed on <span className='text-violet-700 dark:text-violet-600 font-semibold'>Vercel.</span>
            </p>
          </div>
          <div className="text-sm sm:text-base text-[#64748b] leading-relaxed">
            {/* right side's text affair here... */}
          </div>
        </div>

        {/* Bottom Section */}
        <hr className="border-t border-violet-200/50 dark:border-slate-700/40 w-full m-0" />
        <div className="flex flex-col md:flex-row items-start justify-between sm:items-center gap-1 sm:gap-2">

          {/* Copyright text */}
          <p className="flex text-sm text-[#64748b] text-left whitespace-nowrap">
            &copy; {currentYear} Arif Hossain
          </p>

          {/* Social Platforms Links */}
          <div className=" flex justify-end mt-1 sm:mt-0">
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="relative w-[92%] xl:w-[80%] mx-auto flex justify-end pt-2 animate-pulse">
        <button
          onClick={handleScrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-1.5 group flex items-center gap-1.5 text-xs text-gray-400 hover:text-violet-600 transition-colors duration-300 cursor-pointer self-end md:self-auto"
        >
        
          <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-500 group-hover:border-[#007bff]/20 group-hover:bg-[#007bff]/5 transition-all duration-300">
            <ArrowUp className="w-5 h-5 font-bold group-hover:text-violet-600 text-violet-700 group-hover:-translate-y-1 transition-all duration-300" />
          </div>
        </button>
      </div>
    </footer>
  );
}

