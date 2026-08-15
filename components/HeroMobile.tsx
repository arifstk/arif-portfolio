// components/HeroMobile.tsx

import Link from 'next/link'
import Image from 'next/image'
import HeroDescription from './HeroDescription'
import SocialLinks from './SocialLinks'

const HeroMobile = () => {
  return (
    <div>
      <div className=' md:hidden relative isolate overflow-hidden h-screen grid grid-cols-1 md:grid-cols-2 gap-10 -mt-3 pt-15 pb-[35%]'>

        {/* ── Mobile-only background photo ─────── */}
        <div className='absolute inset-0 md:hidden aspect-9/20'>
          <Image
            src="/images/hero.png"
            alt="Image of me"
            fill
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, 0vw"
            className="object-cover object-top"
          />
          {/* gradients on mobile */}
          <div className='absolute inset-0 bg-linear-to-t from-black/95 via-black/55 to-black/10' />
          <div className='absolute inset-0 bg-linear-to-r from-black/70 via-black/20 to-transparent' />
        </div>

        {/* ── Text ────────────── */}
        <div className='relative z-10 flex flex-col items-start justify-end gap-3 md:gap-7 text-start px-3 pt-23 text-white md:text-gray-800 md:dark:text-white/70'>
          <div>
            {/* <h3 className='font-semibold tracking-wider mb-1 text-gray-200 md:text-gray-800 md:dark:text-white/70'>
              Software Developer
            </h3> */}
            <div className='inline-flex items-center gap-2 py-1 mb-3 '>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75' />
                <span className='relative inline-flex rounded-full h-2 w-2 bg-violet-600' />
              </span>
              <p className='text-sm sm:text-sm font-semibold tracking-wider text-violet-400 dark:text-violet-300'>
                Software Developer
              </p>
            </div>
            <h2 className='text-2xl mb-1 font-semibold tracking-wider'>
              Hello I&apos;m
            </h2>
            {/* <h1 className='text-white md:text-violet-500 text-4xl tracking-widest sm:tracking-normal font-semibold'>
            Arif Hossain
          </h1> */}
            <h1 className='bg-linear-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent text-4xl tracking-tight sm:tracking-normal font-extrabold drop-shadow-sm'>
              Shaikh Arif Hossain
            </h1>
          </div>
          <HeroDescription />

          <Link href="/projects">
            <button className='bg-white/10 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-full border border-white/40 md:border-gray-500 dark:md:border-gray-500 font-semibold text-white md:text-gray-800 md:dark:text-white/70 hover:bg-[#369483] hover:text-white hover:border-[#369483] hover:shadow-md px-6 py-2 text-sm cursor-pointer transition-colors duration-200 tracking-widest -mt-5 mb-3'>
              My Works
            </button>
          </Link>
          <SocialLinks />
        </div>
      </div>
    </div>
  )
}

export default HeroMobile
