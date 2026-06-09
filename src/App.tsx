import Nav from './components/Nav'
import Hero from './components/Hero'
import Pain from './components/Pain'
import Solution from './components/Solution'
import Services from './components/Services'
import Process from './components/Process'
import Examples from './components/Examples'
import Why from './components/Why'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-[#05060f] text-[#d8ecf8] min-h-screen" dir="rtl">
      <Nav />
      <Hero />
      <Pain />
      <Solution />
      <Services />
      <Process />
      <Examples />
      <Why />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}

export default App