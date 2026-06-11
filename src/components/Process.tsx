import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const steps = [
  { num: '01', title: 'שיחת אפיון', desc: 'מבינים את העסק שלך, הבעיות, המטרות והתהליכים הקיימים' },
  { num: '02', title: 'מיפוי תהליכים', desc: 'מתעדים ומנתחים את זרימת הנתונים והעבודה בעסק' },
  { num: '03', title: 'תכנון הפתרון', desc: 'בונים ארכיטקטורה של המערכת ומציגים אותה לאישורך' },
  { num: '04', title: 'בנייה ויישום', desc: 'מקימים, מחברים ומגדירים את כל רכיבי המערכת' },
  { num: '05', title: 'הדרכה ותמיכה', desc: 'מדריכים את הצוות ונותנים תמיכה גם אחרי ההשקה' },
]

const stepVariant = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

function AnimatedLine() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [lineWidth, setLineWidth] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(() => {
      if (ref.current) setLineWidth(ref.current.offsetWidth)
    })
    ro.observe(ref.current)
    setLineWidth(ref.current.offsetWidth)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={ref} className="absolute top-7 right-[14%] left-[14%]" style={{ height: 0 }}>
      {/* Track */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-[#3f4959]" />
      {/* Gradient fill — grows from right to left */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-l from-[#663af3] to-[#663af3]/30 origin-right"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.4, ease, delay: 0.3 }}
      />
      {/* Traveling dot */}
      {lineWidth > 0 && (
        <motion.div
          className="absolute rounded-full bg-[#663af3] pointer-events-none"
          style={{
            right: 0,
            top: '-5px',
            width: 12,
            height: 12,
            boxShadow: '0 0 12px rgba(102,58,243,0.9), 0 0 4px rgba(102,58,243,1)',
          }}
          initial={{ x: 0, opacity: 0 }}
          animate={inView ? { x: -lineWidth, opacity: [0, 1, 1, 0] } : { x: 0, opacity: 0 }}
          transition={{ duration: 1.4, ease, delay: 0.3 }}
        />
      )}
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" className="relative px-5 md:px-6 py-20 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-20 text-center"
        >
          <p className="font-mono tracking-widest text-[#663af3] uppercase text-xs mb-3">תהליך</p>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#d8ecf8]"
            style={{ fontFamily: 'Ellinia CLM, sans-serif' }}
          >
            מ-0 למערכת פועלת — בצעדים ברורים
          </h2>
        </motion.div>

        {/* Desktop */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="hidden md:grid grid-cols-5 gap-6 relative"
        >
          <AnimatedLine />
          {steps.map(({ num, title, desc }) => (
            <motion.div key={num} variants={stepVariant} className="flex flex-col items-center text-center group">
              <motion.div
                className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-[#05060f] border border-[#3f4959] mb-6 transition-all duration-300 group-hover:border-[#663af3]/60 group-hover:bg-[#663af3]/08"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-mono text-[#b6d9fc] text-sm font-medium">{num}</span>
              </motion.div>
              <h3 className="text-[#d8ecf8] font-semibold text-sm mb-2 leading-snug">{title}</h3>
              <p className="text-[#81899b] text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-0 md:hidden"
        >
          {steps.map(({ num, title, desc }, i) => (
            <motion.div key={num} variants={stepVariant} className="flex gap-5 group">
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#05060f] border border-[#3f4959] group-hover:border-[#663af3]/50 transition-colors">
                  <span className="font-mono text-[#b6d9fc] text-xs">{num}</span>
                </div>
                {i < steps.length - 1 && <div className="w-px flex-1 my-2 bg-gradient-to-b from-[#663af3]/60 to-[#3f4959]" />}
              </div>
              <div className="pb-8 pt-2">
                <h3 className="text-[#d8ecf8] font-semibold mb-1">{title}</h3>
                <p className="text-[#81899b] text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
