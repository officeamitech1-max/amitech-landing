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
      <a href="#" className="flex items-center gap-2.5">
        <img src="/logo-mark.svg" alt="" className="h-10 w-auto" />
        <span
          className="text-[#e5efff] font-bold text-lg tracking-tight"
          style={{ fontFamily: 'Ellinia CLM, sans-serif' }}
        >
          Amitech
        </span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        <a href="#pain" className="text-[#9da7ba] hover:text-[#c7d3ea] text-sm font-medium transition-colors">הבעיה</a>
        <a href="#services" className="text-[#9da7ba] hover:text-[#c7d3ea] text-sm font-medium transition-colors">שירותים</a>
        <a href="#process" className="text-[#9da7ba] hover:text-[#c7d3ea] text-sm font-medium transition-colors">תהליך</a>
        <a href="#why" className="text-[#9da7ba] hover:text-[#c7d3ea] text-sm font-medium transition-colors">למה אנחנו</a>
        <a href="#faq" className="text-[#9da7ba] hover:text-[#c7d3ea] text-sm font-medium transition-colors">שאלות</a>
      </div>

      <a
        href="#cta"
        className="relative text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(30,72,220,0.85) 0%, rgba(18,52,190,0.80) 100%)',
          backdropFilter: 'blur(18px) saturate(160%)',
          WebkitBackdropFilter: 'blur(18px) saturate(160%)',
          border: '1px solid rgba(80,130,255,0.40)',
          boxShadow: '0 4px 24px rgba(22,58,210,0.38), inset 0 1px 0 rgba(255,255,255,0.18)',
        }}
      >
        לתיאום שיחה
      </a>
    </nav>
  )
}