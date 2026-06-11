import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const examples = [
  { tag: 'CRM', title: 'מערכת ניהול לידים ולקוחות', desc: 'מעקב אחרי כל ליד משלב הפנייה הראשונה ועד לסגירת עסקה. כולל תזכורות אוטומטיות, היסטוריית תקשורת מלאה ולוח ניהולי חי שמראה בדיוק איפה כל ליד נמצא בתהליך.' },
  { tag: 'אוטומציה', title: 'אוטומציה לגבייה ושליחת חשבוניות', desc: 'המערכת מזהה חשבוניות שלא שולמו, שולחת תזכורות ללקוחות בפרקי זמן מוגדרים ומייצרת דוח גבייה שבועי לצוות הכספים — בלי שאף אחד צריך לגעת בזה.' },
  { tag: 'דשבורד', title: 'לוח ניהולי עם נתוני מכירות', desc: 'תצוגה חיה שמתעדכנת אוטומטית: מכירות יומיות, עמידה ביעדים חודשיים, ביצועי נציגים ומגמות לאורך זמן. מנהלים רואים את כל התמונה ממסך אחד.' },
  { tag: 'ניהול', title: 'מערכת ניהול פרויקטים ומשימות', desc: 'כל פרויקט — מי אחראי, מה הסטטוס, מה מועד הסיום. הצוות מקבל התראות אוטומטיות לפני דדליינים, והמנהל רואה בכל רגע מה ממתין לטיפול.' },
  { tag: 'אינטגרציה', title: 'חיבור טפסים, CRM ואחסון בענן', desc: 'כל פנייה שנכנסת בטופס האתר → נפתחת רשומה ב-CRM → קובץ נשמר בגוגל דרייב → הודעת WhatsApp נשלחת לאחראי. הכל קורה אוטומטית תוך שניות.' },
  { tag: 'דוחות', title: 'דוחות שבועיים אוטומטיים למנהלים', desc: 'כל ראשון בבוקר, כל מנהל מקבל לוואטסאפ סיכום שבועי עם הנתונים הרלוונטיים לתחום שלו — מכירות, גבייה, משימות פתוחות — מוכן לפגישת צוות.' },
]

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function Examples() {
  const [active, setActive] = useState(0)
  const [mobileOpen, setMobileOpen] = useState<number | null>(null)

  return (
    <section id="examples" className="relative px-5 md:px-6 py-20 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 text-center"
        >
          <p className="font-mono tracking-widest text-[#663af3] uppercase text-xs mb-3">דוגמאות</p>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#d8ecf8]"
            style={{ fontFamily: 'Ellinia CLM, sans-serif' }}
          >
            מה שבנינו לעסקים כמו שלך
          </h2>
          <p className="text-[#81899b] mt-4 max-w-xl mx-auto">
            לא תיאורטי, לא תבנית מדף — כל מה שמוצג פה הוא מה שאנחנו בונים בפועל.
          </p>
        </motion.div>

        {/* ── Desktop: left nav + right spotlight ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="hidden lg:grid grid-cols-[1fr_2fr] gap-10"
        >
          {/* Nav list */}
          <div className="flex flex-col self-start">
            {examples.map((e, i) => (
              <button
                key={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="flex items-center gap-4 py-4 border-b border-[#2a2f3d] last:border-b-0 text-right group transition-colors duration-200 cursor-pointer"
              >
                {/* Active bar */}
                <motion.div
                  className="w-[3px] h-6 rounded-full bg-[#663af3] flex-shrink-0 origin-center"
                  animate={{ scaleY: i === active ? 1 : 0.2, opacity: i === active ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                />
                <div className="flex-1 text-right">
                  <span className="font-mono text-[10px] text-[#663af3]/60 block mb-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-sm font-medium leading-snug transition-colors duration-200 block"
                    style={{ color: i === active ? '#ffffff' : '#81899b' }}
                  >
                    {e.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Feature panel */}
          <div className="relative min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease }}
                className="absolute inset-0 rounded-2xl p-px"
                style={{
                  background: 'linear-gradient(135deg, rgba(102,58,243,0.55) 0%, rgba(63,73,89,0.35) 50%, rgba(102,58,243,0.18) 100%)',
                }}
              >
                <div className="relative bg-[#1a1d2b] rounded-2xl h-full p-10 overflow-hidden flex flex-col justify-between">
                  {/* Background grid */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.035]"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(186,215,247,1) 1px,transparent 1px),linear-gradient(90deg,rgba(186,215,247,1) 1px,transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  />
                  {/* Glow */}
                  <div
                    className="absolute -top-16 -right-16 w-64 h-64 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse, rgba(102,58,243,0.2) 0%, transparent 65%)' }}
                  />

                  <div className="relative z-10">
                    <span className="inline-block font-mono text-[#663af3] text-xs uppercase tracking-widest border border-[#663af3]/30 bg-[#663af3]/10 rounded px-3 py-1 mb-6">
                      {examples[active].tag}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-bold text-[#d8ecf8] mb-4 leading-tight"
                      style={{ fontFamily: 'Ellinia CLM, sans-serif' }}
                    >
                      {examples[active].title}
                    </h3>
                    <p className="text-[#81899b] leading-relaxed text-base max-w-lg">
                      {examples[active].desc}
                    </p>
                  </div>

                  {/* Progress dots */}
                  <div className="relative z-10 flex items-center gap-2 mt-10">
                    {examples.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className="transition-all duration-300 rounded-full"
                        style={{
                          width: i === active ? 24 : 6,
                          height: 6,
                          backgroundColor: i === active ? '#663af3' : 'rgba(63,73,89,0.8)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Mobile: accordion ── */}
        <div className="lg:hidden space-y-2">
          {examples.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease, delay: i * 0.06 }}
              className="rounded-xl overflow-hidden"
              style={{
                borderRight: mobileOpen === i ? '2px solid #663af3' : '2px solid transparent',
                transition: 'border-color 0.3s ease',
              }}
            >
              <button
                onClick={() => setMobileOpen(mobileOpen === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 bg-[#2f343e] text-right gap-4"
              >
                <div>
                  <span className="font-mono text-[#663af3] text-[10px] block mb-1">
                    {String(i + 1).padStart(2, '0')} · {e.tag}
                  </span>
                  <span className="text-[#d8ecf8] font-semibold text-sm leading-snug block">{e.title}</span>
                </div>
                <motion.span
                  animate={{ rotate: mobileOpen === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#81899b] flex-shrink-0"
                >
                  <ChevronDown size={16} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {mobileOpen === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="overflow-hidden"
                  >
                    <p className="text-[#81899b] text-sm leading-relaxed px-5 py-4 bg-[#252830]">{e.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
