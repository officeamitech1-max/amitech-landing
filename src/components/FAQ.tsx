import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const faqs = [
  {
    q: 'מה ההבדל בין Amitech לבין ייעוץ ארגוני רגיל?',
    a: 'ייעוץ ארגוני מסתיים בדוח המלצות. אנחנו מסיימים עם מערכת פועלת. לא רק מגדירים מה צריך להיות אחרת — בונים אותו, מחברים לתהליכים הקיימים, ומדריכים את הצוות לעבוד איתו.',
  },
  {
    q: 'כמה זמן לוקח לבנות מערכת?',
    a: 'תלוי בהיקף. מערכות CRM ואוטומציות בסיסיות — 2–4 שבועות. מערכות מורכבות עם אינטגרציות מרובות — 6–10 שבועות. בשיחת האפיון נגדיר לוח זמנים מדויק.',
  },
  {
    q: 'האם צריך ידע טכני כדי לעבוד עם המערכת?',
    a: 'לא. בונים ממשקים פשוטים, עברית מלאה, ותמיכה לכל שאלה. הדרכה מלאה כלולה בכל פרויקט — עד שכולם עובדים בביטחון.',
  },
  {
    q: 'עם אילו פלטפורמות אתם עובדים?',
    a: 'Notion, Airtable, Monday, Salesforce, Google Workspace, Make, Zapier ועוד. לא קשורים לפלטפורמה אחת — בוחרים את הכלי הנכון לצורך שלך.',
  },
  {
    q: 'מה קורה אחרי ההשקה?',
    a: 'נשארים זמינים. שבועות ראשונים אחרי ההשקה — תמיכה צמודה, תיקונים ושיפורים קטנים. לאחר מכן אפשר להמשיך בהסכם תחזוקה חודשי לפי צורך.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="relative px-5 md:px-6 py-20 md:py-32">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 text-center"
        >
          <p className="font-mono tracking-widest text-[#663af3] uppercase text-xs mb-3">שאלות</p>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#e5efff]"
            style={{ fontFamily: 'Ellinia CLM, sans-serif' }}
          >
            שאלות שעולות בכל שיחה
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              animate={{
                backgroundColor: open === i ? 'rgba(47,52,62,0.5)' : 'rgba(47,52,62,0)',
              }}
              className="rounded-xl overflow-hidden"
              style={{
                borderRight: open === i ? '2px solid #663af3' : '2px solid transparent',
                transition: 'border-color 0.3s ease',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex justify-between items-center w-full px-5 py-5 text-right gap-6 group"
              >
                <span className="text-[#e5efff] font-semibold text-lg leading-snug group-hover:text-white transition-colors">
                  {q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/[0.1] text-[#b0bccf] group-hover:border-[#663af3]/50 group-hover:text-[#b6d9fc] transition-colors duration-300"
                >
                  <ChevronDown size={16} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                    animate={{ height: 'auto', opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                    exit={{ height: 0, opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                    transition={{ duration: 0.4, ease }}
                    className="overflow-hidden"
                  >
                    <p className="text-[#b0bccf] leading-relaxed px-5 pb-6 text-base">{a}</p>
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
