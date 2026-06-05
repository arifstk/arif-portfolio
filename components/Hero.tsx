// components/Hero.tsx

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import SocialLinks from './SocialLinks'
// import Statistics from './Statistics'
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
          <h1 className='text-sky-600 dark:text-sky-400
            text-5xl md:text-7xl tracking-normal font-semibold'>Arif Hossain</h1>
        </div>
        {/* <p className='w-auto md:max-w-[90%] font-thin leading-6'>As a Software Engineer, I design and build innovative software solutions, solve complex problems, and ensure systems are scalable and user-friendly. From creating web apps to optimizing backend systems, I bridge the gap between technology and user needs.</p> */}
        <HeroDescription />
        <Link href="/projects">
          <Button className='bg-transparent rounded-full border border-gray-500 dark:border-gray-500 text-gray-800 dark:text-white/70 hover:bg-sky-700 hover:text-white hover:shadow-md hover:shadow-sky-200 px-6 text-sm cursor-pointer'>My Works</Button>
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
