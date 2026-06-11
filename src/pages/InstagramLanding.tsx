import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, AlertCircle, BarChart2, ChevronDown, Clock } from 'lucide-react'
import { AmitechNebulaBackground } from '../components/AmitechNebulaBackground'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

// ── Liquid glass styles ────────────────────────────────────────────────────────
const glassCard: React.CSSProperties = {
  background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.13)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.14)',
}
const glassCardActive: React.CSSProperties = {
  ...glassCard,
  boxShadow: '0 16px 52px rgba(22,58,210,0.40), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.20)',
  border: '1px solid rgba(22,58,210,0.50)',
}
const glassPrimary: React.CSSProperties = {
  background: 'linear-gradient(145deg, rgba(120,78,255,0.88) 0%, rgba(90,42,218,0.82) 100%)',
  backdropFilter: 'blur(20px) saturate(160%)',
  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
  border: '1px solid rgba(160,118,255,0.45)',
  boxShadow: '0 8px 40px rgba(102,58,243,0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
}
const glassWA: React.CSSProperties = {
  background: 'linear-gradient(145deg, rgba(45,220,110,0.88) 0%, rgba(22,172,75,0.82) 100%)',
  backdropFilter: 'blur(20px) saturate(160%)',
  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
  border: '1px solid rgba(60,220,120,0.45)',
  boxShadow: '0 8px 40px rgba(37,211,102,0.40), inset 0 1px 0 rgba(255,255,255,0.25)',
}

// ── Shimmer overlay ────────────────────────────────────────────────────────────
function GlassShimmer() {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
      <motion.div
        style={{
          position: 'absolute', inset: 0, width: '200%',
          background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.14) 50%, transparent 65%)',
        }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
      />
    </div>
  )
}

// ── Animated counter ───────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const frame = (now: number) => {
      const t = Math.min((now - start) / 1600, 1)
      setVal(Math.round((1 - Math.pow(1 - t, 3)) * target))
      if (t < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [inView, target])
  return <span ref={ref}>{val}{suffix}</span>
}

// ── Word reveal ────────────────────────────────────────────────────────────────
function WordReveal({ lines, delay = 0 }: { lines: string[]; delay?: number }) {
  return (
    <>
      {lines.map((line, li) => {
        const words = line.split(' ')
        return (
          <span key={li} style={{ display: 'block' }}>
            <motion.span
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay + li * 0.18 } } }}
              initial="hidden" animate="show"
            >
              {words.map((w, i) => (
                <React.Fragment key={i}>
                  <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                    <motion.span
                      style={{ display: 'inline-block' }}
                      variants={{
                        hidden: { y: '110%', opacity: 0 },
                        show:   { y: 0, opacity: 1, transition: { duration: 0.72, ease } },
                      }}
                    >{w}</motion.span>
                  </span>
                  {i < words.length - 1 ? ' ' : ''}
                </React.Fragment>
              ))}
            </motion.span>
          </span>
        )
      })}
    </>
  )
}

// ── Data ───────────────────────────────────────────────────────────────────────
const painCards = [
  { icon: MessageCircle, title: 'הכל מפוזר',      text: 'עונים על וואטסאפ, אקסלים, פתקים — אין מקום אחד לכל המידע' },
  { icon: AlertCircle,   title: 'לידים נופלים',   text: 'לידים נופלים בין הכיסאות כי אין מעקב מסודר אחרי כל פנייה' },
  { icon: BarChart2,     title: 'אין תמונת מצב',  text: 'בסוף החודש אין מושג מאיפה הגיעו הלקוחות ומה באמת עבד'   },
  { icon: Clock,         title: 'זמן שנאבד',       text: 'תהליכים ידניים שחוזרים כל שבוע גוזלים שעות שיכלו לייצר הכנסה' },
]

const flowSteps = [
  'לקוח משאיר פרטים',
  'נפתח כרטיס אוטומטי במערכת',
  'נשלחת הודעת וואטסאפ אוטומטית',
  'נוצרת משימת מעקב',
  'בסוף החודש — דוח ברור: כמה לידים, כמה נסגרו, מאיפה הגיעו, כמה הכנסה',
]

const stats = [
  { target: 30, suffix: '+', label: 'עסקים שכבר עובדים עם מערכת מסודרת' },
  { target: 15, suffix: '+', label: 'שעות שנחסכות בשבוע בממוצע'          },
  { target: 30, suffix: '',  label: 'יום עד שרואים תוצאות'                },
]

// ── Pain carousel (orbital 3D coverflow) ──────────────────────────────────────
function PainCarousel() {
  const [active, setActive] = useState(0)
  const N = painCards.length
  const startX = useRef(0)

  const go = (dir: 1 | -1) => setActive(a => (a + dir + N) % N)

  return (
    <div
      style={{ perspective: '1100px', position: 'relative', height: 370, overflow: 'hidden' }}
      onPointerDown={e => { startX.current = e.clientX }}
      onPointerUp={e => {
        const dx = e.clientX - startX.current
        if (dx < -50) go(1)
        else if (dx > 50) go(-1)
      }}
    >
      {painCards.map(({ icon: Icon, title, text }, i) => {
        let d = i - active
        if (d > N / 2) d -= N
        if (d < -N / 2) d += N
        const ad = Math.abs(d)
        const isActive = ad === 0
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 264,
              left: 'calc(50% - 132px)',
              top: '50%',
              transform: 'translateY(-56%)',
              zIndex: 10 - ad * 2,
              cursor: isActive ? 'default' : 'pointer',
            }}
            onClick={() => !isActive && setActive(i)}
          >
            <motion.div
              animate={{
                x: d * 218,
                y: ad * -22,
                rotateY: -d * 24,
                scale: Math.max(1 - ad * 0.13, 0.65),
                opacity: Math.max(1 - ad * 0.38, 0),
              }}
              transition={{ type: 'spring', stiffness: 230, damping: 28 }}
            >
              <div
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={isActive ? glassCardActive : glassCard}
              >
                <motion.div
                  animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(22,58,210,0.20)', border: '1px solid rgba(22,58,210,0.38)' }}
                >
                  <Icon size={20} className="text-[#6b9eff]" />
                </motion.div>
                <p className="text-white font-bold text-base">{title}</p>
                <p className="text-[#c2cfe6] text-sm leading-relaxed">{text}</p>
              </div>
            </motion.div>
          </div>
        )
      })}

      {/* Nav row: prev arrow · dots · next arrow */}
      <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-3">
        <button
          onClick={() => go(-1)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 text-xl leading-none"
          style={glassCard}
          aria-label="previous"
        >‹</button>
        {painCards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 20 : 8,
              background: i === active ? '#1a3ad2' : 'rgba(255,255,255,0.35)',
              opacity: i === active ? 1 : 0.45,
            }}
          />
        ))}
        <button
          onClick={() => go(1)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 text-xl leading-none"
          style={glassCard}
          aria-label="next"
        >›</button>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function InstagramLanding() {
  return (
    <div className="relative text-[#e5efff] min-h-screen" dir="rtl" style={{ fontFamily: 'Heebo, sans-serif' }}>
      <AmitechNebulaBackground />

      {/* ── HERO ── */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-5 py-24">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="inline-block text-[#663af3] text-sm font-semibold tracking-widest uppercase mb-7 px-4 py-1.5 rounded-full"
          style={{ ...glassCard, border: '1px solid rgba(102,58,243,0.35)' }}
        >
          מערכות עבודה חכמות לעסקים
        </motion.span>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-7 max-w-2xl">
          <WordReveal lines={['העסק שלך גדל.', 'התפעול נשאר מאחור.']} delay={0.3} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.0 }}
          className="text-[#c2cfe6] text-lg leading-relaxed max-w-lg mb-10"
        >
          דברים נופלים בין הכיסאות. לקוחות לא מקבלים מענה בזמן.
          <br />
          אין תמונת מצב ברורה. הכול תלוי בך.
          <br />
          <span className="text-[#dae6f5] font-medium">אנחנו בונים לך מערכת שמחזיקה את העסק — בלעדיך.</span>
        </motion.p>

        <motion.a
          href="#whatsapp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.25 }}
          whileHover={{ scale: 1.04, boxShadow: '0 12px 60px rgba(102,58,243,0.60)' }}
          whileTap={{ scale: 0.97 }}
          className="relative inline-flex items-center px-8 py-4 rounded-2xl text-white font-semibold text-base overflow-hidden"
          style={glassPrimary}
        >
          <GlassShimmer />
          <span className="relative z-10">בואו נבדוק יחד מה אפשר לשפר</span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={22} className="text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── PAIN ── */}
      <section className="relative z-10 px-0 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-3xl md:text-5xl font-bold text-white text-center mb-12 px-5"
        >
          מכירים את זה?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <PainCarousel />
        </motion.div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="relative z-10 px-5 py-24 max-w-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-3xl md:text-5xl font-bold text-white text-center mb-14"
        >
          מה אנחנו בונים לך
        </motion.h2>

        <div className="flex flex-col items-center">
          {flowSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease, delay: i * 0.14 }}
              className="flex flex-col items-center w-full"
            >
              <div className="w-full rounded-2xl px-6 py-4 text-center" style={glassCard}>
                <span className="text-xs font-bold tracking-widest uppercase block mb-1" style={{ color: 'rgba(160,127,255,0.7)' }}>
                  שלב {i + 1}
                </span>
                <p className="text-[#e5efff] text-sm md:text-base font-medium">{step}</p>
              </div>
              {i < flowSteps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.14 + 0.2 }}
                  style={{ originY: 0 }}
                >
                  <ChevronDown size={20} className="my-1" style={{ color: '#663af3' }} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="text-[#c2cfe6] text-sm text-center mt-10"
        >
          מתאים לסטודיואים, קליניקות, נותני שירות, עסקים עם צוות קטן
        </motion.p>
      </section>

      {/* ── STATS ── */}
      <section className="relative z-10 px-5 py-24 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map(({ target, suffix, label }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease, delay: i * 0.13 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-8 text-center"
              style={glassCard}
            >
              <div className="text-6xl font-bold mb-3" style={{ color: '#7a55f5', textShadow: '0 0 40px rgba(102,58,243,0.5)' }}>
                <Counter target={target} suffix={suffix} />
              </div>
              <p className="text-[#c2cfe6] text-sm leading-relaxed">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="whatsapp" className="relative z-10 px-5 py-28 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-center gap-7"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug">
            רוצה לדעת איזה תהליך בעסק שלך אפשר להפוך לאוטומטי כבר החודש?
          </h2>

          <p className="text-[#c2cfe6] text-base leading-relaxed max-w-md">
            שלחו לי &ldquo;מערכת&rdquo; בוואטסאפ ונבדוק יחד איפה העסק שלכם מאבד זמן, כסף ולידים — בלי עלות ובלי התחייבות.
          </p>

          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute rounded-full"
              style={{ width: '110%', height: '110%', border: '1px solid rgba(37,211,102,0.35)' }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{ width: '125%', height: '125%', border: '1px solid rgba(37,211,102,0.20)' }}
              animate={{ scale: [1, 1.22, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
            <motion.a
              href="https://wa.me/972559830069?text=%D7%9E%D7%A2%D7%A8%D7%9B%D7%AA"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 16px 64px rgba(37,211,102,0.55)' }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-bold text-lg overflow-hidden"
              style={glassWA}
            >
              <GlassShimmer />
              <MessageCircle size={22} className="relative z-10 flex-shrink-0" />
              <span className="relative z-10">שלחו &ldquo;מערכת&rdquo; בוואטסאפ</span>
            </motion.a>
          </div>

          <p className="text-[#c2cfe6] text-sm">עונים תוך שעה בשעות הפעילות</p>
        </motion.div>
      </section>
    </div>
  )
}
