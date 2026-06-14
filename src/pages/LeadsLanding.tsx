import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageCircle, Zap, BarChart2, Users, Bot,
  LayoutDashboard, ChevronDown, Check,
} from 'lucide-react'
import { WA_URL } from '../config'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease, delay },
})

// ── Particle canvas ────────────────────────────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let raf: number
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const N = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 13000), 85)
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      a: Math.random() * 0.4 + 0.08,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of pts) {
        p.x = (p.x + p.vx + canvas.width) % canvas.width
        p.y = (p.y + p.vy + canvas.height) % canvas.height
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(91,143,255,${p.a})`; ctx.fill()
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
        const d = Math.hypot(dx, dy)
        if (d < 120) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(91,143,255,${0.09 * (1 - d / 120)})`
          ctx.lineWidth = 0.5; ctx.stroke()
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" />
}

// ── Animated counter ───────────────────────────────────────────────────────────
function StatCounter({ target, suffix = '' }: { target: number | string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(typeof target === 'number' ? 0 : target)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.5 })
    io.observe(el); return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!inView || typeof target !== 'number') return
    const start = performance.now()
    const frame = (now: number) => {
      const t = Math.min((now - start) / 1500, 1)
      setVal(Math.round((1 - Math.pow(1 - t, 3)) * target))
      if (t < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [inView, target])
  return <span ref={ref}>{val}{suffix}</span>
}

// ── Service card ───────────────────────────────────────────────────────────────
function ServiceCard({
  icon: Icon, title, desc, delay,
}: { icon: React.ElementType; title: string; desc: string; delay: number }) {
  return (
    <motion.div {...fadeUp(delay)} whileHover={{ y: -5 }} className="p-px rounded-2xl" style={{
      background: 'linear-gradient(135deg, rgba(91,143,255,0.45), rgba(168,85,247,0.22), rgba(91,143,255,0.06))',
    }}>
      <div className="rounded-2xl p-7 h-full" style={{ background: '#0c0f1e' }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{
          background: 'rgba(91,143,255,0.1)', border: '1px solid rgba(91,143,255,0.22)',
        }}>
          <Icon size={22} style={{ color: '#5b8fff' }} />
        </div>
        <h3 className="font-bold text-[1.1rem] mb-3" style={{ color: '#f0f4ff' }}>{title}</h3>
        <p style={{ color: 'rgba(240,244,255,0.52)', fontSize: '0.9rem', lineHeight: 1.72 }}>{desc}</p>
      </div>
    </motion.div>
  )
}

// ── Testimonial card ───────────────────────────────────────────────────────────
function TestiCard({
  quote, name, role, initials, delay,
}: { quote: string; name: string; role: string; initials: string; delay: number }) {
  return (
    <motion.div {...fadeUp(delay)} whileHover={{ borderColor: 'rgba(168,85,247,0.38)' }}
      className="rounded-2xl p-8 transition-colors duration-300"
      style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
    >
      <p style={{ color: 'rgba(240,244,255,0.82)', fontSize: '1.02rem', lineHeight: 1.78, fontStyle: 'italic', marginBottom: '1.4rem' }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm text-white"
          style={{ background: 'linear-gradient(135deg, #5b8fff, #a855f7)' }}>
          {initials}
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: '#f0f4ff' }}>{name}</p>
          <p style={{ color: 'rgba(240,244,255,0.45)', fontSize: '0.8rem' }}>{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ── Data ───────────────────────────────────────────────────────────────────────
const services = [
  { icon: Users,         title: 'CRM מותאם אישית',         desc: 'מערכת ניהול לקוחות שמתאימה בדיוק לאיך שהעסק שלכם עובד — לא פתרון מדף.' },
  { icon: Zap,           title: 'אוטומציות עם Make',        desc: 'חיבורים חכמים בין כל הכלים שלכם — CRM, WhatsApp, מייל, גוגל שיטס — עובדים לבד.' },
  { icon: LayoutDashboard, title: 'מערכות Monday.com',      desc: 'ניהול פרויקטים, מעקב לידים ולוחות עבודה שנבנים בדיוק לפי הצרכים שלכם.' },
  { icon: BarChart2,     title: 'דשבורדים ואנליטיקה',       desc: 'תמונת מצב עסקית בזמן אמת — מכירות, לידים, ביצועים — הכל במקום אחד.' },
  { icon: MessageCircle, title: 'אינטגרציית WhatsApp',      desc: 'תגובות אוטומטיות, שליחת הודעות מתוזמנות ועדכוני לקוחות — בלי מגע יד.' },
  { icon: Bot,           title: 'שילוב AI בתהליכים',        desc: 'כלים חכמים שמסכמים, מסדרים וממיינים מידע — כדי שתתמקדו בלקוחות, לא בניירת.' },
]

const testimonials = [
  { quote: 'בנו לנו מערכת Monday שחסכה לנו שעות ניהול כל שבוע. עכשיו כל הלידים מטופלים אוטומטית ואנחנו לא מפספסים פנייה אחת.', name: 'גיא ד.', role: 'מכון כושר ופילאטיס', initials: 'ג' },
  { quote: 'האוטומציות עם Make שינו לנו את הדרך לעבוד. הלקוחות מקבלים מענה מיידי בוואטסאפ ואנחנו לא צריכים לזכור כלום.', name: 'שרון מ.', role: 'קליניקת ייעוץ ורפואה', initials: 'ש' },
  { quote: 'סוף סוף יש לי סדר בלקוחות. ה-CRM שלהם מותאם בדיוק לעסק שלי — לא פתרון קופסה שצריך להתפשר עליו.', name: 'דן ל.', role: 'סוכנות נדלן', initials: 'ד' },
  { quote: 'מה שלקח לי שלוש שעות ביום עכשיו קורה לבד. ממליץ בחום לכל בעל עסק שרוצה לצמוח בלי לגדול בכאב.', name: 'אורי ב.', role: 'בעל עסק — שיפוצים', initials: 'א' },
]

const WA_LEADS = 'https://wa.me/972559830069?text=%D7%94%D7%99%D7%99%2C+%D7%90%D7%A9%D7%9E%D7%97+%D7%9C%D7%A9%D7%9E%D7%95%D7%A2+%D7%A4%D7%A8%D7%98%D7%99%D7%9D'

// ── Page ───────────────────────────────────────────────────────────────────────
export default function LeadsLanding() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div dir="rtl" style={{ fontFamily: 'Heebo, sans-serif', background: '#060812', color: '#f0f4ff', minHeight: '100vh', overflowX: 'hidden' }}>
      <ParticleCanvas />

      {/* Orbs */}
      {[
        { w: 600, h: 600, bg: 'rgba(91,143,255,0.11)', top: '-200px', left: '-200px' },
        { w: 500, h: 500, bg: 'rgba(168,85,247,0.09)', bottom: '20%', right: '-180px' },
        { w: 350, h: 350, bg: 'rgba(34,211,238,0.07)', top: '55%',  left: '30%' },
      ].map((o, i) => (
        <div key={i} className="fixed rounded-full pointer-events-none z-0" style={{ ...o, filter: 'blur(90px)' }} />
      ))}

      {/* NAV */}
      <nav className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-16 py-4 transition-all duration-300 ${scrolled ? 'border-b' : ''}`}
        style={{ background: 'rgba(6,8,18,0.72)', backdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <span className="font-black text-2xl tracking-tight"
          style={{ background: 'linear-gradient(135deg,#5b8fff,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Amitech
        </span>
        <div className="hidden md:flex items-center gap-8">
          {[['#services', 'שירותים'], ['#process', 'תהליך'], ['#testimonials', 'לקוחות']].map(([href, label]) => (
            <a key={href} href={href} style={{ color: 'rgba(240,244,255,0.55)', fontSize: '0.9rem', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f0f4ff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,244,255,0.55)')}
            >{label}</a>
          ))}
        </div>
        <a href={WA_LEADS} target="_blank" rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full font-medium text-sm text-white transition-opacity hover:opacity-85"
          style={{ background: 'linear-gradient(135deg,#5b8fff,#a855f7)', textDecoration: 'none' }}>
          יצירת קשר
        </a>
      </nav>

      <main style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HERO ── */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-8"
            style={{ background: 'rgba(91,143,255,0.1)', border: '1px solid rgba(91,143,255,0.28)', color: '#5b8fff' }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5b8fff', boxShadow: '0 0 8px #5b8fff', flexShrink: 0 }} />
            מותאם לעסקים קטנים ובינוניים
          </motion.div>

          <h1 className="font-black leading-tight mb-6 max-w-3xl"
            style={{ fontSize: 'clamp(2.6rem,6vw,4.8rem)', letterSpacing: '-0.03em' }}>
            <motion.span style={{ display: 'block' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.25 }}>
              תפסיקו לנהל הכל מהראש —
            </motion.span>
            <motion.span style={{ display: 'block', background: 'linear-gradient(135deg,#5b8fff,#a855f7,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.42 }}>
              בנו מערכת שעובדת בשבילכם
            </motion.span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.62 }}
            className="max-w-lg mb-10 font-light leading-relaxed"
            style={{ color: 'rgba(240,244,255,0.58)', fontSize: '1.12rem' }}>
            מערכות ניהול, אוטומציות ו-CRM שמשחררים אתכם מהשוטף ומאפשרים צמיחה אמיתית — בלי לגדול בכאב.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={WA_LEADS} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base text-white transition-transform hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#5b8fff,#a855f7)', textDecoration: 'none', boxShadow: '0 0 32px rgba(91,143,255,0.35)' }}>
              <MessageCircle size={18} />
              שלחו לנו וואטסאפ ←
            </a>
            <a href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-normal text-base transition-all hover:border-white/20 hover:bg-white/10"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#f0f4ff', textDecoration: 'none', backdropFilter: 'blur(10px)' }}>
              הכירו אותנו
              <ChevronDown size={16} />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap justify-center gap-10 mt-16">
            {[
              { n: 30, suffix: '+', label: 'עסקים שכבר עובדים עם מערכת מסודרת' },
              { n: 15, suffix: '+', label: 'שעות שנחסכות בשבוע בממוצע' },
              { n: 30, suffix: '', label: 'יום עד שרואים תוצאות' },
            ].map(({ n, suffix, label }, i) => (
              <div key={i} className="text-center">
                <div className="font-black leading-none mb-1" style={{ fontSize: '2.6rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg,#5b8fff,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  <StatCounter target={n} suffix={suffix} />
                </div>
                <div style={{ color: 'rgba(240,244,255,0.48)', fontSize: '0.84rem', fontWeight: 300 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)', margin: '0 4rem' }} />

        {/* ── SERVICES ── */}
        <section id="services" className="px-5 py-24">
          <motion.p {...fadeUp(0)} className="text-center text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#5b8fff' }}>מה אנחנו עושים</motion.p>
          <motion.h2 {...fadeUp(0.08)} className="text-center font-black mb-4 max-w-2xl mx-auto" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            פתרונות שמשנים את אופן הניהול<br />של העסק שלכם
          </motion.h2>
          <motion.p {...fadeUp(0.16)} className="text-center font-light mb-14 max-w-xl mx-auto" style={{ color: 'rgba(240,244,255,0.52)', fontSize: '1rem', lineHeight: 1.78 }}>
            אנחנו לא מוכרים תוכנה מדף — בונים לכם פתרון שמתאים בדיוק לאיך שהעסק עובד.
          </motion.p>
          <div className="grid gap-5 max-w-5xl mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {services.map((s, i) => <ServiceCard key={i} {...s} delay={i * 0.07} />)}
          </div>
        </section>

        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)', margin: '0 4rem' }} />

        {/* ── PROCESS ── */}
        <section id="process" className="px-5 py-24" style={{ background: 'rgba(255,255,255,0.013)' }}>
          <motion.p {...fadeUp(0)} className="text-center text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#5b8fff' }}>איך זה עובד</motion.p>
          <motion.h2 {...fadeUp(0.08)} className="text-center font-black mb-4" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            שלושה שלבים ואתם<br />כבר עובדים עם המערכת
          </motion.h2>
          <motion.p {...fadeUp(0.16)} className="text-center font-light mb-16 max-w-md mx-auto" style={{ color: 'rgba(240,244,255,0.52)', fontSize: '1rem', lineHeight: 1.78 }}>
            תהליך פשוט ושקוף — מהפגישה הראשונה עד המערכת שעובדת.
          </motion.p>

          <div className="grid gap-0 max-w-4xl mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
            {[
              { n: '01', title: 'שיחת אבחון',       desc: 'מבינים את העסק, הכאבים והצרכים האמיתיים שלכם. 30 דקות בלי התחייבות — ורואים יחד מה אפשר לשפר.' },
              { n: '02', title: 'בניית המערכת',      desc: 'מפתחים את הפתרון המותאם — אוטומציות, CRM, חיבורים בין כלים — עד שזה עובד בדיוק כמו שצריך.' },
              { n: '03', title: 'הדרכה ותמיכה',      desc: 'מוסרים, מלמדים ונשארים זמינים. המערכת שלכם עובדת, ואתם יודעים איך להשתמש בה בעצמכם.' },
            ].map(({ n, title, desc }, i) => (
              <motion.div key={i} {...fadeUp(i * 0.12)} className="text-center px-6 py-8">
                <div className="font-black mb-4" style={{ fontSize: '3rem', color: 'rgba(91,143,255,0.16)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{n}</div>
                <h3 className="font-bold mb-3" style={{ fontSize: '1.05rem', color: '#f0f4ff' }}>{title}</h3>
                <p style={{ color: 'rgba(240,244,255,0.52)', fontSize: '0.88rem', lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)', margin: '0 4rem' }} />

        {/* ── TESTIMONIALS ── */}
        <section id="testimonials" className="px-5 py-24">
          <motion.p {...fadeUp(0)} className="text-center text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#5b8fff' }}>מה אומרים עלינו</motion.p>
          <motion.h2 {...fadeUp(0.08)} className="text-center font-black mb-4" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', letterSpacing: '-0.02em' }}>
            עסקים שקפצו קדימה
          </motion.h2>
          <motion.p {...fadeUp(0.16)} className="text-center font-light mb-14 max-w-md mx-auto" style={{ color: 'rgba(240,244,255,0.52)', fontSize: '1rem', lineHeight: 1.78 }}>
            עסקים שהחליטו להפסיק לנהל בכאוס — ורואים תוצאות.
          </motion.p>
          <div className="grid gap-5 max-w-4xl mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {testimonials.map((t, i) => <TestiCard key={i} {...t} delay={i * 0.08} />)}
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="cta" className="px-5 py-28 text-center">
          <motion.div {...fadeUp(0)} className="max-w-2xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
            {/* Top glow */}
            <div className="absolute pointer-events-none" style={{ top: -100, left: '50%', transform: 'translateX(-50%)', width: 400, height: 200, background: 'rgba(91,143,255,0.11)', filter: 'blur(60px)' }} />

            <h2 className="font-black mb-4 relative z-10" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              רוצים לדעת מה אפשר<br />
              <span style={{ background: 'linear-gradient(135deg,#5b8fff,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                לשפר אצלכם כבר החודש?
              </span>
            </h2>
            <p className="font-light mb-8 mx-auto relative z-10 max-w-md" style={{ color: 'rgba(240,244,255,0.55)', fontSize: '1rem', lineHeight: 1.78 }}>
              שלחו לנו &ldquo;שלום&rdquo; בוואטסאפ. 30 דקות שיחה — ורואים יחד איפה העסק מאבד זמן וכסף, בלי עלות.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center relative z-10 mb-6">
              {[
                'ללא התחייבות',
                'תגובה תוך שעה',
                'מותאם לעסק שלך',
              ].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(240,244,255,0.6)' }}>
                  <Check size={14} style={{ color: '#5b8fff' }} />{t}
                </span>
              ))}
            </div>

            <div className="relative inline-flex justify-center z-10">
              <motion.div className="absolute rounded-full pointer-events-none"
                style={{ inset: '-10%', border: '1px solid rgba(91,143,255,0.30)' }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
              <motion.div className="absolute rounded-full pointer-events-none"
                style={{ inset: '-18%', border: '1px solid rgba(91,143,255,0.18)' }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 }}
              />
              <motion.a
                href={WA_LEADS} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(91,143,255,0.45)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-base text-white"
                style={{ background: 'linear-gradient(135deg,#5b8fff,#a855f7)', textDecoration: 'none', boxShadow: '0 0 32px rgba(91,143,255,0.38)' }}
              >
                <MessageCircle size={20} />
                שלחו לנו וואטסאפ עכשיו
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="px-8 md:px-16 py-10 flex flex-wrap items-center justify-between gap-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <span className="font-black text-xl" style={{ background: 'linear-gradient(135deg,#5b8fff,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Amitech
          </span>
          <div className="flex gap-7">
            {[['#services', 'שירותים'], ['#process', 'תהליך'], ['#testimonials', 'לקוחות']].map(([href, label]) => (
              <a key={href} href={href} style={{ color: 'rgba(240,244,255,0.45)', fontSize: '0.88rem', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f0f4ff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,244,255,0.45)')}
              >{label}</a>
            ))}
          </div>
          <p style={{ color: 'rgba(240,244,255,0.28)', fontSize: '0.82rem' }}>© 2024 Amitech. כל הזכויות שמורות.</p>
        </footer>

      </main>
    </div>
  )
}
