// // components/Helper/Home/Navbar/Logo.tsx

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


// // bg-[#2b7473]
// // text-[#369483] 



// components/Helper/Home/Navbar/Logo.tsx

import Link from 'next/link';

export default function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Link href="/" className="group relative inline-block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 380 320"
          className="w-10 h-8 sm:w-12 sm:h-10"
          role="img"
          aria-label="SA logo"
        >
          <g transform="skewX(-8)">
            <text
              x="120"
              y="230"
              fontFamily="Arial, Helvetica, sans-serif"
              fontWeight="900"
              fontSize="270"
              fill="#ffffff"
              textAnchor="middle"
              stroke="#ffffff"
              strokeWidth="16"
              strokeLinejoin="round"
            >
              S
            </text>
            <text
              x="120"
              y="230"
              fontFamily="Arial, Helvetica, sans-serif"
              fontWeight="900"
              fontSize="270"
              fill="#a09eff"
              textAnchor="middle"
            >
              S
            </text>
          </g>
          <g transform="skewX(-4)">
            <text
              x="255"
              y="245"
              fontFamily="Arial, Helvetica, sans-serif"
              fontWeight="900"
              fontSize="255"
              fill="#ffffff"
              textAnchor="middle"
              stroke="#ffffff"
              strokeWidth="12"
              strokeLinejoin="round"
            >
              A
            </text>
            <text
              x="255"
              y="245"
              fontFamily="Arial, Helvetica, sans-serif"
              fontWeight="900"
              fontSize="255"
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

