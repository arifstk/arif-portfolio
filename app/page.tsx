// import Home from '@/components/Helper/Home/Home';

import Hero from '@/components/Hero';
import HeroMobile from '@/components/HeroMobile';
import HireButtonBanner from '@/components/HireButtonBanner';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';

const HomePage = () => {
  return (
    <div className='overflow-hidden min-h-screen pt-8 md:pt-20'>
      <HeroMobile />
      <Hero />
      <Projects />
      <Skills />
      <div className='pt-3 sm:pt-11 pb-4 w-[92%] xl:w-[80%] mx-auto'>
        <HireButtonBanner />
      </div>
    </div>
  )
}

export default HomePage;

