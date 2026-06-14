import Nav from './components/Nav'
import Hero from './components/Hero'
import Pain from './components/Pain'
import Solution from './components/Solution'
import Services from './components/Services'
import Process from './components/Process'
import MidCTA from './components/MidCTA'
import Examples from './components/Examples'
import Why from './components/Why'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { AmitechNebulaBackground } from './components/AmitechNebulaBackground'

function App() {
  return (
    <div className="relative text-[#e5efff] min-h-screen" dir="rtl">
      <AmitechNebulaBackground />
      <Nav />
      <Hero />
      <Pain />
      <Solution />
      <Services />
      <Process />
      <MidCTA />
      <Examples />
      <Why />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}

export default App