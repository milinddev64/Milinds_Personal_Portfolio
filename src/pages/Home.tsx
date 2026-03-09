import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Photos from '@/components/Photos'
import Contact from '@/components/Contact'

const Home = () => {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Photos />
      <Contact />
    </main>
  )
}

export default Home
