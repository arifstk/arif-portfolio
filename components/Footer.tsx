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
    <footer className="w-full text-[#1e293b] mt-10 pb-4">
      <div className="pt-10 w-[92%] xl:w-[80%] mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 justify-center md:justify-between items-center gap-4">

          {/* Logo / Name Branding */}
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <Logo />
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex justify-center items-center gap-4 sm:gap-6">
            {NavLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.path}
                className="text-sm font-medium text-[#64748b] hover:text-violet-500 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Platforms Links */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <SocialLinks />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-4">

          {/* Copyright text */}
          <p className="text-xs text-[#64748b] text-center sm:text-left">
            &copy; {currentYear} Arif Hossain | All rights reserved.
          </p>

          {/* Back to Top Functional Button */}
          <button
            onClick={handleScrollToTop}
            aria-label="Scroll back to top"
            className="group flex items-center gap-1.5 text-xs font-semibold text-[#64748b] hover:text-[#007bff] transition-colors duration-300 cursor-pointer"
          >
            Back to top
            <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-500 group-hover:border-[#007bff]/20 group-hover:bg-[#007bff]/5 transition-all duration-300">
              <ArrowUp className="w-3.5 h-3.5 group-hover:text-[#007bff] group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
