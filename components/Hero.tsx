// // components/Hero.tsx
// import Link from 'next/link'
// import Image from 'next/image'
// import SocialLinks from './SocialLinks'
// import Photo from './Photo'
// import HeroDescription from './HeroDescription'

// const Hero = () => {
//   return (
//     <div className='hidden md:flex justify-between relative isolate overflow-hidden md:overflow-visible md:rounded-none min-h-150 md:min-h-0 flex-1 md:flex-2 gap-10 pt-2 md:py-5 md:w-[92%] xl:w-[80%] mx-auto'>
//       {/* ── Text ────────────── */}
//       <div className='relative z-10 flex flex-col items-start gap-5 md:gap-7 text-start px-6 py-10 md:p-0 text-white md:text-gray-800 md:dark:text-white/70'>
//         <div>
//           <p className='font-semibold tracking-wider mb-1 text-gray-200 md:text-gray-800 md:dark:text-white/70'>
//             Software Developer
//           </p>
//           <p className='text-3xl md:text-5xl mb-2 font-semibold tracking-wider'>
//             Hello I&apos;m
//           </p>
//           <h1 className='text-violet-800 dark:text-violet-600 text-5xl md:text-7xl tracking-tight sm:tracking-normal font-semibold'>
//             Arif Hossain
//           </h1>
//         </div>
//         <HeroDescription />

//         <Link href="/projects">
//           <button className='text-sm bg-violet-50 hover:bg-violet-100 border border-violet-200 font-medium px-6 py-1.5 rounded-full text-violet-800 transition-colors duration-200 dark:backdrop-blur-sm dark:bg-violet-900/30 dark:text-violet-50 dark:hover:bg-violet-900/50 dark:border-slate-700 tracking-wide cursor-pointer'>
//             My Works
//           </button>
//         </Link>
//         <SocialLinks />
//       </div>

//       {/* ── Desktop photo (unchanged circular animated version) ──── */}
//       <div className='hidden md:block'>
//         <Photo />
//       </div>
//     </div>
//   )
// }

// export default Hero



// components/Hero.tsx
import Link from 'next/link'
import Image from 'next/image'
import SocialLinks from './SocialLinks'
import Photo from './Photo'
import HeroDescription from './HeroDescription'

const Hero = () => {
  return (
    <div className='hidden md:flex justify-between relative isolate overflow-hidden md:overflow-visible md:rounded-none min-h-150 md:min-h-0 flex-1 md:flex-2 gap-10 pt-2 md:py-5 md:w-[92%] xl:w-[80%] mx-auto'>

      {/* ── Background Ambient Light Glow Effect ────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/4 -z-10 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px] dark:bg-violet-600/30"
      />

      {/* ── Text ────────────── */}
      <div className='relative z-10 flex flex-col items-start gap-5 md:gap-7 text-start px-6 py-10 md:p-0 text-white md:text-gray-800 md:dark:text-white/70'>
        <div>
          {/* Status Badge */}
          <div className='inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-md'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75' />
              <span className='relative inline-flex rounded-full h-2 w-2 bg-violet-600' />
            </span>
            <p className='text-xs sm:text-sm font-semibold tracking-wider text-violet-700 dark:text-violet-300'>
              Software Developer
            </p>
          </div>

          <p className='text-3xl md:text-5xl mb-2 font-semibold tracking-wider text-gray-800 dark:text-white/90'>
            Hello I&apos;m
          </p>

          {/* Gradient Modern Heading */}
          <h1 className='bg-linear-to-r from-violet-800 via-purple-600 to-indigo-600 dark:from-violet-500 dark:via-purple-500 dark:to-indigo-400 bg-clip-text text-transparent text-4xl md:text-6xl tracking-tight sm:tracking-normal font-extrabold drop-shadow-sm'>
            Arif Hossain
          </h1>
        </div>

        <HeroDescription />

        {/* Modernized CTA Button */}
        <div className="flex gap-4">
          <Link href="/projects">
            <button className='group relative inline-flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-full text-violet-950 dark:text-white bg-linear-to-r from-violet-100 to-purple-100 hover:from-violet-200 hover:to-purple-200 dark:from-violet-900/40 dark:to-purple-900/40 dark:hover:from-violet-900/60 dark:hover:to-purple-900/60 border border-violet-300/60 dark:border-violet-700/50 shadow-sm hover:shadow-md hover:shadow-violet-500/10 transition-all duration-300 tracking-wide cursor-pointer'>
              <span>My Works</span>
              <span className='inline-block transition-transform duration-200 group-hover:translate-x-1'>→</span>
            </button>
          </Link>
          <SocialLinks />
        </div>
      </div>

      <div className='hidden md:block relative'>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-linear-to-tr from-violet-600/20 to-indigo-500/20 blur-2xl transform scale-110"
        />
        <Photo />
      </div>

    </div>
  )
}

export default Hero



