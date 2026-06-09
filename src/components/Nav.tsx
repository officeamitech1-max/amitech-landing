import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-12 py-5 transition-all duration-300 ${
      scrolled ? 'bg-[#05060f]/90 backdrop-blur-xl border-b border-white/[0.06] py-3' : ''
    }`}>
      <a href="#">
        <img src="/logo.png" alt="Amitech" className="h-12 w-auto" style={{ mixBlendMode: 'screen' }} />
      </a>

      <div className="hidden md:flex items-center gap-8">
        <a href="#pain" className="text-[#9da7ba] hover:text-[#c7d3ea] text-sm font-medium transition-colors">הבעיה</a>
        <a href="#services" className="text-[#9da7ba] hover:text-[#c7d3ea] text-sm font-medium transition-colors">שירותים</a>
        <a href="#process" className="text-[#9da7ba] hover:text-[#c7d3ea] text-sm font-medium transition-colors">תהליך</a>
        <a href="#why" className="text-[#9da7ba] hover:text-[#c7d3ea] text-sm font-medium transition-colors">למה אנחנו</a>
        <a href="#faq" className="text-[#9da7ba] hover:text-[#c7d3ea] text-sm font-medium transition-colors">שאלות</a>
      </div>

      <a href="#cta" className="bg-[#663af3] hover:bg-[#7a55f5] text-white text-sm font-semibold px-5 py-2.5 rounded-sm transition-colors">
        לתיאום שיחה
      </a>
    </nav>
  )
}