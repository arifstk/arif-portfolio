// components/Hero.tsx

import Link from 'next/link'
import SocialLinks from './SocialLinks'
import Photo from './Photo'
import HeroDescription from './HeroDescription'

const Hero = () => {
  return (
    <div className='py-1 md:py-5 grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-800 dark:text-white/70'>
      {/* text */}
      <div className='flex flex-col items-center md:items-start gap-5 md:gap-7 text-center md:text-start'>
        <div>
          <h3 className='font-semibold text-gray-800 dark:text-white/70 tracking-wider mb-1'>Software Developer</h3>
          <h2 className='text-3xl md:text-5xl mb-2 font-semibold tracking-wider'>Hello I&apos;m</h2>
          <h1 className='text-indigo-500 
            text-5xl md:text-7xl tracking-normal font-semibold'>Arif Hossain</h1>
        </div>
        <HeroDescription />
        <Link href="/projects">
          <button className='bg-transparent rounded-full border border-gray-500 dark:border-gray-500 text-gray-800 dark:text-white/70 hover:bg-sky-700 hover:text-white hover:shadow-md hover:shadow-sky-200 px-6 py-2 text-sm cursor-pointer'>My Works</button>
        </Link>
        <SocialLinks />
        {/* <Statistics /> */}
      </div>
      {/* photo */}
      <div>
        <Photo />
      </div>
    </div>
  )
}

export default Hero
