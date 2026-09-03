// components/Helper/Home/Navbar/Logo.tsx

// import { Kalam } from 'next/font/google';
// import Link from 'next/link';

// const affectionateScript = Kalam({
//   weight: '400',
//   subsets: ['latin'],
//   display: 'swap',
// });

// export default function Logo() {
//   return (
//     <div className="flex items-center justify-center">
//       <Link href="/" className="group relative inline-block">
//         <span
//           className={`${affectionateScript.className} text-4xl font-extrabold text-white transition-colors duration-300 bg-violet-800 dark:bg-violet-700 px-3 flex items-center justify-center text-center rounded-full`}
//         >
//           a
//         </span>
//       </Link>
//     </div>
//   );
// }


// bg-[#2b7473]
// text-[#369483] 



// components/Helper/Home/Navbar/Logo.tsx

import Link from 'next/link';

export default function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Link href="/" className="group relative inline-block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 340 300"
          className="w-12 h-10 select-none"
          role="img"
          aria-label="SA logo"
        >
          <g transform="skewX(-6)">
            {/* S - Outline */}
            <text
              x="95"
              y="225"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
              fontSize="240"
              fill="#ffffff"
              textAnchor="middle"
              stroke="#ffffff"
              strokeWidth="20"
              strokeLinejoin="round"
            >
              S
            </text>
            {/* S - Main Fill */}
            <text
              x="95"
              y="225"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
              fontSize="240"
              fill="#a09eff"
              textAnchor="middle"
            >
              S
            </text>

            {/* A - Outline */}
            <text
              x="205"
              y="225"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
              fontSize="240"
              fill="#ffffff"
              textAnchor="middle"
              stroke="#ffffff"
              strokeWidth="20"
              strokeLinejoin="round"
            >
              A
            </text>
            {/* A - Main Fill */}
            <text
              x="205"
              y="225"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
              fontSize="240"
              fill="#4920ae"
              textAnchor="middle"
            >
              A
            </text>
          </g>
        </svg>
      </Link>
    </div>
  );
}

