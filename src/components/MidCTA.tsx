import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { WA_URL } from '../config'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function MidCTA() {
  return (
    <section className="relative px-5 md:px-6 py-20 overflow-hidden">
      {/* Background glow strip */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(102,58,243,0.13) 0%, transparent 70%)',
        }}
      />
      {/* Top / bottom gradient lines */}
      <div className="gradient-line max-w-lg mx-auto mb-0 opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease }}
        className="relative max-w-3xl mx-auto text-center py-16"
      >
        <p className="font-mono tracking-widest text-[#663af3] uppercase text-xs mb-5">
          בוא נדבר
        </p>

        <h2
          className="text-3xl md:text-5xl font-bold leading-tight mb-5"
          style={{ fontFamily: 'Ellinia CLM, sans-serif' }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(160deg, #e5efff 30%, #98c0ef)' }}
          >
            נשמע כמו משהו שמתאים לך?
          </span>
        </h2>

        <p className="text-[#b0bccf] text-base leading-relaxed mb-10 max-w-lg mx-auto">
          שיחת אפיון קצרה — מספיק כדי להבין אם יש כאן ערך לעסק שלך.
          <br />
          <span className="text-[#96a3b5] text-sm">ללא עלות, ללא התחייבות.</span>
        </p>

        <div className="relative inline-flex items-center justify-center">
          {/* Pulse rings */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ inset: '-16%', border: '1px solid rgba(102,58,243,0.32)' }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ inset: '-28%', border: '1px solid rgba(102,58,243,0.16)' }}
            animate={{ scale: [1, 1.22, 1], opacity: [0.38, 0, 0.38] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
          />
          <motion.a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 48px rgba(102,58,243,0.55)' }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-white font-semibold text-base overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(120,78,255,0.92) 0%, rgba(88,42,215,0.88) 100%)',
              backdropFilter: 'blur(18px)',
              border: '1px solid rgba(160,118,255,0.40)',
              boxShadow: '0 8px 36px rgba(102,58,243,0.42), inset 0 1px 0 rgba(255,255,255,0.22)',
              textDecoration: 'none',
            }}
          >
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.14) 50%, transparent 65%)',
                width: '200%',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1.8 }}
            />
            <MessageCircle size={18} className="relative z-10 flex-shrink-0" />
            <span className="relative z-10">שלחו לנו וואטסאפ</span>
          </motion.a>
        </div>
      </motion.div>

      <div className="gradient-line max-w-lg mx-auto mt-0 opacity-50" />
    </section>
  )
}
