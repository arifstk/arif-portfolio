// components/Helper/Home/Navbar/Logo.tsx

import React from 'react';
// import { Fira_Code, JetBrains_Mono, Source_Code_Pro } from 'next/font/google';
import { Caveat, Indie_Flower, Kalam, Permanent_Marker } from 'next/font/google';
import Link from 'next/link';

const affectionateScript = Kalam({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});
// Option 1: Elegant, warm, and personal script font
// const affectionateScript = Fira_Code({
//   weight: '600',
//   subsets: ['latin'],
//   display: 'swap',
// });

// Option 2: Ultra-friendly, soft, rounded modern font (Good backup if script isn't your style)
// const affectionateRound = JetBrains_Mono({
//   subsets: ['latin'],
//   display: 'swap',
// });

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-8">
      {/* Option A: The Script Version (Recommended for a personal, heartfelt touch) */}
      <Link href="/" className="group relative inline-block">
        {/* <span
          className={`${affectionateScript.className} text-2xl font-extrabold text-gray-800 dark:text-gray-100 transition-colors duration-300 hover:text-blue-800 dark:hover:text-blue-400`}
        >arif</span> */}
        <span
          className={`${affectionateScript.className} text-4xl font-extrabold text-white transition-colors duration-300 bg-indigo-600 px-2.5 flex items-center justify-center text-center rounded-md`}
        >
          a
        </span>
      </Link>
    </div>
  );
}

