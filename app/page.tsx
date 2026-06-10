// import Home from '@/components/Helper/Home/Home';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import React from 'react'

const HomePage = () => {
  return (
    <div className='overflow-hidden min-h-screen pt-10 md:pt-20'>
      <Hero />
      <Projects />
      <Skills />
    </div>
  )
}

export default HomePage;

