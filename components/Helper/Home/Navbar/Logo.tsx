// components/Helper/Home/Navbar/Logo.tsx

import { Caveat, Indie_Flower, Kalam, Permanent_Marker } from 'next/font/google';
import Link from 'next/link';

const affectionateScript = Kalam({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-8">
      <Link href="/" className="group relative inline-block">
        <span
          className={`${affectionateScript.className} text-4xl font-extrabold text-white transition-colors duration-300 bg-violet-600 px-2.5 flex items-center justify-center text-center rounded-xl`}
        >
          a
        </span>
      </Link>
    </div>
  );
}


// bg-[#2b7473]
// text-[#369483] 

