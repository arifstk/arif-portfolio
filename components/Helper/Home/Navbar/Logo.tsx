// components/Helper/Home/Navbar/Logo.tsx

import React from 'react';
import { Fira_Code, JetBrains_Mono, Source_Code_Pro } from 'next/font/google';
import Link from 'next/link';

// Option 1: Elegant, warm, and personal script font
const affectionateScript = Fira_Code({
  weight: '600',
  subsets: ['latin'],
  display: 'swap',
});

// Option 2: Ultra-friendly, soft, rounded modern font (Good backup if script isn't your style)
const affectionateRound = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export default function Logo() {
  return (
    <div className="flex items-center gap-8">
      {/* Option A: The Script Version (Recommended for a personal, heartfelt touch) */}
      <Link href="/" className="group relative inline-block">
        <span
          className={`${affectionateScript.className} text-2xl font-extrabold text-gray-800 dark:text-gray-100 transition-colors duration-300 hover:text-blue-800 dark:hover:text-blue-400`}
        >
          arif
        </span>
      </Link>
    </div>
  );
}