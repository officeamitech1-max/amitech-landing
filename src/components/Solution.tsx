import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }

const outcomes = [
  'מידע עסקי מרוכז במקום אחד',
  'תהליכים שרצים לבד — בלי תלות בזיכרון',
  'דשבורד ניהולי שמראה הכל בזמן אמת',
  'יכולת לצמוח מבלי לאבד שליטה',
]

export default function Solution() {
  return (
    <section id="solution" className="relative px-5 md:px-6 py-20 md:py-32">
      <motion.div
        className="max-w-3xl mx-auto"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Gradient border wrapper: p-px with gradient background */}
        <div
          className="p-px rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(102,58,243,0.5) 0%, rgba(63,73,89,0.5) 50%, rgba(102,58,243,0.2) 100%)',
          }}
        >
          <div className="relative bg-[#2f343e] rounded-2xl p-10 md:p-16 text-center overflow-hidden">
            {/* Animated iris glow */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-64 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(102,58,243,0.3) 0%, transparent 70%)',
                animation: 'glow-pulse 3s ease-in-out infinite',
              }}
            />
            <div
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-44 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(102,58,243,0.12) 0%, transparent 70%)',
                animation: 'glow-pulse 3s ease-in-out infinite',
                animationDelay: '1.5s',
              }}
            />

            <motion.p variants={fadeUp} className="font-mono tracking-widest text-[#663af3] uppercase text-xs mb-5">
              הפתרון
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'Ellinia CLM, sans-serif' }}
            >
              <span className="text-[#d8ecf8]">מערכות מידע, אוטומציות ודשבורדים</span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(160deg,#d8ecf8,#98c0ef)' }}
              >
                שמכניסים סדר, שליטה ובהירות
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-[#81899b] leading-relaxed mb-10 max-w-xl mx-auto">
              אנחנו לא מוכרים תוכנה מדף. אנחנו מאפיינים את העסק שלך מא׳ עד ת׳, מבינים בדיוק איך הוא עובד, ובונים פתרון שמתאים לך — לא להפך.
            </motion.p>

            {/* Outcome checklist */}
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-right">
              {outcomes.map((o) => (
                <motion.div
                  key={o}
                  variants={fadeUp}
                  className="flex items-center gap-3 bg-[#663af3]/07 border border-[#663af3]/18 rounded-lg px-4 py-3 hover:border-[#663af3]/35 transition-colors"
                >
                  <CheckCircle2 size={16} className="text-[#663af3] flex-shrink-0" />
                  <span className="text-[#c7d3ea] text-sm">{o}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
