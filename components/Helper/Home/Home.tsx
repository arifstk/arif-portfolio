import About from "@/components/About"
import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"


const Home = () => {
  return (
    <div className='overflow-hidden min-h-screen pt-10 md:pt-20'>
      <Hero />
      <Projects />
      <Skills />
    </div>
  )
}

export default Home

