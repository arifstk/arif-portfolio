// components/Hero.tsx
import Link from 'next/link'
import Image from 'next/image'
import SocialLinks from './SocialLinks'
import Photo from './Photo'
import HeroDescription from './HeroDescription'

const Hero = () => {
  return (
    <div className='hidden md:flex justify-between relative isolate overflow-hidden md:overflow-visible md:rounded-none min-h-150 md:min-h-0 flex-1 md:flex-2 gap-10 pt-2 md:py-5 md:w-[92%] xl:w-[80%] mx-auto'>
      {/* ── Text ────────────── */}
      <div className='relative z-10 flex flex-col items-start gap-5 md:gap-7 text-start px-6 py-10 md:p-0 text-white md:text-gray-800 md:dark:text-white/70'>
        <div>
          <h3 className='font-semibold tracking-wider mb-1 text-gray-200 md:text-gray-800 md:dark:text-white/70'>
            Software Developer
          </h3>
          <h2 className='text-3xl md:text-5xl mb-2 font-semibold tracking-wider'>
            Hello I&apos;m
          </h2>
          <h1 className='text-violet-600 dark:text-violet-500 text-5xl md:text-7xl tracking-tight sm:tracking-normal font-semibold'>
            Arif Hossain
          </h1>
        </div>
        <HeroDescription />

        <Link href="/projects">
          <button className='text-sm bg-violet-200 hover:bg-violet-300 border border-violet-400 font-medium px-6 py-1.5 rounded-full text-violet-800 transition-colors duration-200 dark:backdrop-blur-sm dark:bg-violet-900/30 dark:text-violet-50 dark:hover:bg-violet-900/50 dark:border-violet-900 tracking-widest cursor-pointer'>
            My Works
          </button>
        </Link>
        <SocialLinks />
      </div>

      {/* ── Desktop photo (unchanged circular animated version) ──── */}
      <div className='hidden md:block'>
        <Photo />
      </div>
    </div>
  )
}

export default Hero

