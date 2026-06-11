import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch, Database, Zap, BarChart2, Settings2, Link2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Service { icon: LucideIcon; title: string; desc: string }

const services: Service[] = [
  { icon: GitBranch, title: 'אפיון תהליכים עסקיים', desc: 'מיפוי מעמיק של זרימת העבודה — מזהים צווארי בקבוק, כפילויות ונקודות כשל לפני שבונים כלום.' },
  { icon: Database, title: 'בניית CRM ומערכות מידע', desc: 'מערכות ניהול לקוחות ולידים שבנויות בדיוק לאופן שבו העסק שלך עובד — לא להפך.' },
  { icon: Zap, title: 'אוטומציות עסקיות', desc: 'מה שחוזר על עצמו — מאטמטים. שליחת הודעות, עדכון רשומות, תזכורות, תהליכי אישור.' },
  { icon: BarChart2, title: 'דשבורדים ודוחות ניהוליים', desc: 'תמונת מצב חיה: מכירות, ביצועים, משימות ועמידה ביעדים — הכל במקום אחד בזמן אמת.' },
  { icon: Settings2, title: 'שיפור מערכות קיימות', desc: 'עובד עם Notion, Airtable, Monday, Salesforce? מסדרים, מחברים ומשפרים מה שכבר יש.' },
  { icon: Link2, title: 'חיבור בין מערכות ותהליכים', desc: 'אינטגרציות בין הכלים — טפסים, CRM, אחסון, מייל — כך שמידע זורם אוטומטית.' },
]

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

function ServiceRow({ icon: Icon, title, desc, index }: Service & { index: number }) {
  const [hovered, setHovered] = useState(false)
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative cursor-default"
    >
      {/* Animated top border line */}
      <div className="relative h-px overflow-hidden bg-[#2a2f3d]">
        <motion.div
          className="absolute inset-0 bg-gradient-to-l from-[#663af3] to-[#663af3]/40"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease }}
          style={{ transformOrigin: 'right' }}
        />
      </div>

      <div className="flex items-center gap-6 md:gap-10 py-6 md:py-8">
        {/* Number */}
        <motion.span
          animate={{ color: hovered ? 'rgba(102,58,243,0.7)' : 'rgba(47,52,62,1)' }}
          transition={{ duration: 0.3 }}
          className="font-mono text-4xl md:text-5xl font-bold leading-none w-12 md:w-16 flex-shrink-0 text-right select-none"
        >
          {num}
        </motion.span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <motion.h3
            animate={{ color: hovered ? '#ffffff' : '#d8ecf8' }}
            transition={{ duration: 0.25 }}
            className="text-lg md:text-xl font-semibold leading-snug"
            style={{ fontFamily: 'Ellinia CLM, sans-serif' }}
          >
            {title}
          </motion.h3>

          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease }}
                className="hidden md:block text-[#81899b] text-sm leading-relaxed overflow-hidden"
              >
                {desc}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Mobile: always visible */}
          <p className="md:hidden text-[#81899b] text-sm leading-relaxed mt-2">{desc}</p>
        </div>

        {/* Icon */}
        <motion.div
          animate={{
            borderColor: hovered ? 'rgba(102,58,243,0.5)' : 'rgba(47,52,62,0.8)',
            backgroundColor: hovered ? 'rgba(102,58,243,0.1)' : 'rgba(0,0,0,0)',
            color: hovered ? '#b6d9fc' : '#3f4959',
          }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center"
        >
          <Icon size={19} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative px-5 md:px-6 py-20 md:py-32">
      <div className="max-w-5xl mx-auto">
        {/* Header — left aligned for editorial feel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <p className="font-mono tracking-widest text-[#663af3] uppercase text-xs mb-3">שירותים</p>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#d8ecf8]"
              style={{ fontFamily: 'Ellinia CLM, sans-serif' }}
            >
              מה אנחנו בונים בשבילך
            </h2>
          </div>
          <p className="text-[#81899b] text-sm max-w-xs md:text-right">
            כל פרויקט מתחיל בהבנה — לא בכלים.
          </p>
        </motion.div>

        {/* Rows */}
        <div>
          {services.map((s, i) => (
            <ServiceRow key={s.title} {...s} index={i} />
          ))}
          {/* Bottom border */}
          <div className="h-px bg-[#2a2f3d]" />
        </div>
      </div>
    </section>
  )
}
