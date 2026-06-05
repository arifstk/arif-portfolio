import About from "@/components/About"
import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"


const Home = () => {
  return (
    <div className='overflow-hidden min-h-screen mt-13 md:mt-20'>
      <Hero />
      <Skills />
      <Projects />
    </div>
  )
}

export default Home

