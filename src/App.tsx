import { Navbar } from "./components/Navbar"
import { Hero } from "./components/sections/Hero"
import { Experience } from "./components/sections/Experience"
import { Projects } from "./components/sections/Projects"
import { Skills } from "./components/sections/Skills"
import { Education } from "./components/sections/Education"
// import { Achievements } from "./components/sections/Achievements"
import { Contact } from "./components/sections/Contact"

function App() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden w-full">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      {/* <Achievements /> */}
      <Contact />
    </div>
  )
}

export default App
