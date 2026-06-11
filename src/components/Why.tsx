import { motion } from 'framer-motion'
import { Brain, Search, Target, GraduationCap, ShieldCheck, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Item { icon: LucideIcon; title: string; desc: string }

const items: Item[] = [
  { icon: Brain, title: 'מבינים עסקים, לא רק טכנולוגיה', desc: 'לפני שאנחנו בונים — אנחנו מבינים. כי פתרון טכנולוגי שלא מתאים לעסק הוא לא פתרון.' },
  { icon: Search, title: 'אפיון מעמיק לפני כל פתרון', desc: 'כל פרויקט מתחיל בשיחה ארוכה ומיפוי מדויק — לא בהנחות ובקיצורי דרך.' },
  { icon: Target, title: 'מערכות שמותאמות בדיוק לך', desc: 'אין תבנית מדף. כל מה שאנחנו בונים מותאם לפי תהליכי העבודה הספציפיים שלך.' },
  { icon: GraduationCap, title: 'הדרכה עד שזה עובד', desc: 'לא מעלימים אחרי ההשקה. מוודאים שהצוות שלך מבין ומשתמש במערכת בביטחון.' },
  { icon: ShieldCheck, title: 'תמיכה גם אחרי ההשקה', desc: 'זמינים לשאלות, שיפורים ועדכונים גם אחרי שהמערכת עולה לאוויר.' },
  { icon: TrendingUp, title: 'תוצאות מדידות', desc: 'בונים מערכות שאפשר למדוד — פחות שעות ידניות, יותר מידע, יותר שליטה.' },
]

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

function WhyItem({ icon: Icon, title, desc, index }: Item & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay: index * 0.07 }}
      className="group flex items-start gap-4 py-6 border-b border-[#2a2f3d] last:border-b-0 hover:border-[#663af3]/35 transition-colors duration-300 cursor-default"
    >
      <div className="flex-shrink-0 mt-0.5 w-8 h-8 flex items-center justify-center text-[#3f4959] group-hover:text-[#663af3] transition-colors duration-300">
        <Icon size={19} />
      </div>
      <div className="min-w-0">
        <h3 className="text-[#c7d3ea] font-semibold mb-1 group-hover:text-white transition-colors duration-200">
          {title}
        </h3>
        <p className="text-[#b0bccf] text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

export default function Why() {
  return (
    <section id="why" className="relative px-5 md:px-6 py-20 md:py-32 overflow-hidden">
      {/* Faint background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(102,58,243,0.05) 0%, transparent 65%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Two-column header: left = section info, right = bold statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end mb-16"
        >
          <div>
            <p className="font-mono tracking-widest text-[#663af3] uppercase text-xs mb-3">למה אנחנו</p>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#e5efff] leading-tight"
              style={{ fontFamily: 'Ellinia CLM, sans-serif' }}
            >
              למה עסקים בוחרים ב-Amitech
            </h2>
          </div>
          <p
            className="text-[#b0bccf] text-lg md:text-xl leading-relaxed md:text-right border-r md:border-r-0 md:border-r-0 border-transparent"
            style={{ borderRightColor: 'rgba(102,58,243,0.3)' }}
          >
            לא מוכרים תוכנה. לא נותנים ייעוץ שנשכח. בונים מערכות שמשנות את האופן שבו העסק שלך עובד — ונשארים איתך אחרי זה.
          </p>
        </motion.div>

        {/* Two-column list — no cards, just text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          {items.map((it, i) => (
            <WhyItem key={it.title} {...it} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
