import { motion } from 'framer-motion'
import { MessageCircle, ArrowLeft } from 'lucide-react'
import { WA_URL } from '../config'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const trustSignals = [
  { num: '50+', label: 'מערכות שנבנו' },
  { num: '30+', label: 'עסקים מרוצים' },
  { num: '2–4', label: 'שבועות מ-0 למערכת' },
]

export default function CTA() {
  return (
    <section id="cta" className="relative px-5 md:px-6 py-20 md:py-32">
      {/* Gradient line separator */}
      <div className="gradient-line max-w-xs mx-auto mb-20 opacity-60" />

      <motion.div
        className="max-w-2xl mx-auto"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="relative bg-[#2f343e] border border-[#3f4959] rounded-2xl p-10 md:p-16 text-center overflow-hidden">
          {/* Iris glow top */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-64 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(102,58,243,0.28) 0%, transparent 70%)' }}
          />
          {/* Iris glow bottom */}
          <div
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-72 h-48 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(102,58,243,0.12) 0%, transparent 70%)' }}
          />

          <motion.p variants={fadeUp} className="font-mono tracking-widest text-[#663af3] uppercase text-xs mb-5">
            מוכן להתחיל?
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: 'Ellinia CLM, sans-serif' }}
          >
            <span className="text-[#d8ecf8]">מוכן להכניס</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(160deg,#d8ecf8,#98c0ef)' }}
            >
              סדר לעסק שלך?
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[#9da7ba] mb-10 text-base leading-relaxed">
            שיחת אפיון ראשונה — ללא עלות וללא התחייבות.
            <br />
            <span className="text-[#81899b] text-sm">מספר מקומות מוגבל בכל חודש.</span>
          </motion.p>

          {/* Primary WhatsApp CTA */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <motion.a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 justify-center bg-[#663af3] hover:bg-[#7a55f5] text-white font-semibold px-8 py-4 rounded-sm transition-colors duration-200 text-base"
              whileHover={{ scale: 1.03, boxShadow: '0 0 36px rgba(102,58,243,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle size={18} />
              שיחת אפיון חינם — WhatsApp
            </motion.a>
            <motion.a
              href="#services"
              className="inline-flex items-center gap-2 justify-center border border-white/[0.14] hover:border-white/25 bg-transparent hover:bg-white/[0.04] text-[#c7d3ea] font-medium px-7 py-4 rounded-sm transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              לפרטים נוספים
              <ArrowLeft size={15} />
            </motion.a>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            variants={stagger}
            className="border-t border-white/[0.06] pt-8 grid grid-cols-3 gap-4"
          >
            {trustSignals.map(({ num, label }) => (
              <motion.div key={label} variants={fadeUp} className="flex flex-col items-center gap-1">
                <span
                  className="text-xl md:text-2xl font-bold text-[#d8ecf8]"
                  style={{ fontFamily: 'Ellinia CLM, sans-serif' }}
                >
                  {num}
                </span>
                <span className="text-xs text-[#81899b] font-mono text-center">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
