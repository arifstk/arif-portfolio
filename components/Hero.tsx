// components/Hero.tsx
import Link from 'next/link'
import Image from 'next/image'
import SocialLinks from './SocialLinks'
import Photo from './Photo'
import HeroDescription from './HeroDescription'

const Hero = () => {
  return (
    <div className='relative isolate overflow-hidden rounded-3xl md:overflow-visible md:rounded-none min-h-150 md:min-h-0 grid grid-cols-1 md:grid-cols-2 gap-10 pt-2 md:py-5'>

      {/* ── Mobile-only full-bleed background photo ─────── */}
      <div className='absolute inset-0 md:hidden'>
        <Image
          src="/images/hero.png"
          alt="Image of me"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-top"
        />
        {/* gradients so text stays readable over the photo */}
        <div className='absolute inset-0 bg-linear-to-t from-black/95 via-black/55 to-black/10' />
        <div className='absolute inset-0 bg-linear-to-r from-black/70 via-black/20 to-transparent' />
      </div>

      {/* ── Text ────────────── */}
      <div className='relative z-10 flex flex-col items-start gap-5 md:gap-7 text-start px-6 py-10 md:p-0 text-white md:text-gray-800 md:dark:text-white/70'>
        <div>
          <h3 className='font-semibold tracking-wider mb-1 text-gray-200 md:text-gray-800 md:dark:text-white/70'>
            Software Developer
          </h3>
          <h2 className='text-3xl md:text-5xl mb-2 font-semibold tracking-wider'>
            Hello I&apos;m
          </h2>
          <h1 className='text-[#379685] md:text-[#369483] text-5xl md:text-7xl tracking-tight sm:tracking-normal font-semibold'>
            Arif Hossain
          </h1>
        </div>
        <HeroDescription />

        <Link href="/projects">
          <button className='bg-white/10 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-full border border-white/40 md:border-gray-500 dark:md:border-gray-500 font-semibold text-white md:text-gray-800 md:dark:text-white/70 hover:bg-[#369483] hover:text-white hover:border-[#369483] hover:shadow-md px-6 py-2 text-sm cursor-pointer transition-colors duration-200 tracking-widest'>
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

