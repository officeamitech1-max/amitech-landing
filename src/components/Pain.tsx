import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }

const painPoints = [
  { title: 'הכל פזור, שום דבר לא בסדר', body: 'לקוחות בוואטסאפ, חשבוניות באקסל, משימות בראש. כשצריך למצוא משהו, זה לוקח דקות — ולפעמים אי-אפשר.' },
  { title: 'תהליכים תלויים באנשים', body: 'כשעובד עוזב או חולה — עצר. אין תיעוד, אין מערכת, הכל בזיכרון.' },
  { title: 'אין תמונת מצב אמיתית', body: 'אתה לא יודע כמה לידים פתוחים, מי חייב כסף, מה בוצע ומה לא. הניחוש הוא לא שיטה ניהול.' },
  { title: 'הגדלה מייצרת בלגן', body: 'כל ניסיון לצמוח מוביל לבלגן גדול יותר. בלי מערכת, צמיחה מנוהלת פשוט לא אפשרית.' },
]

// Pixel coordinates for 9 nodes arranged around a circle (r=155, center=200,200)
const nodes = [
  { label: 'לקוחות',  x: 200, y:  45, fa: 'float-a', dur: 3.2, del: 0 },
  { label: 'WhatsApp', x: 345, y:  88, fa: 'float-b', dur: 2.9, del: 0.4 },
  { label: 'Excel',    x: 355, y: 245, fa: 'float-c', dur: 3.5, del: 0.2 },
  { label: 'מיילים',  x: 265, y: 355, fa: 'float-a', dur: 3.0, del: 0.6 },
  { label: 'טפסים',   x: 135, y: 355, fa: 'float-b', dur: 2.7, del: 0.1 },
  { label: 'יומן',     x:  45, y: 245, fa: 'float-c', dur: 3.3, del: 0.5 },
  { label: 'לידים',   x:  55, y:  88, fa: 'float-a', dur: 2.8, del: 0.3 },
  { label: 'גבייה',   x: 120, y:  40, fa: 'float-b', dur: 3.1, del: 0.7 },
  { label: 'משימות',  x: 282, y:  40, fa: 'float-c', dur: 2.6, del: 0.2 },
]

const HUB = { x: 200, y: 200 }

export default function Pain() {
  return (
    <section id="pain" className="relative px-5 md:px-6 py-20 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">

          {/* SVG — top on mobile */}
          <motion.div
            className="order-first md:order-last flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            {/* Glow backdrop behind SVG */}
            <div className="relative" style={{ width: '100%', maxWidth: '480px' }}>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(102,58,243,0.12) 0%, transparent 65%)',
                  transform: 'scale(0.9)',
                }}
              />
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                style={{ overflow: 'visible' }}
              >
                <defs>
                  <filter id="hub-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="node-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <radialGradient id="hub-fill" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#2a2540" />
                    <stop offset="100%" stopColor="#1a1d2e" />
                  </radialGradient>
                </defs>

                {/* Lines from nodes to hub */}
                {nodes.map((n, i) => (
                  <line
                    key={i}
                    x1={n.x} y1={n.y}
                    x2={HUB.x} y2={HUB.y}
                    stroke="rgba(186,215,247,0.2)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    style={{ animation: `dash-flow 2.8s linear infinite`, animationDelay: `${n.del}s` }}
                  />
                ))}

                {/* Hub outer glow ring */}
                <circle
                  cx={HUB.x} cy={HUB.y} r="70"
                  fill="none"
                  stroke="rgba(102,58,243,0.15)"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                  style={{ animation: 'dash-flow 7s linear infinite reverse' }}
                />

                {/* Hub */}
                <g style={{ animation: 'float-b 3.6s ease-in-out infinite' }} filter="url(#hub-glow)">
                  <circle cx={HUB.x} cy={HUB.y} r="55" fill="url(#hub-fill)" stroke="rgba(102,58,243,0.75)" strokeWidth="1.5" />
                  <text x={HUB.x} y={HUB.y - 7} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#b6d9fc" fontFamily="JetBrains Mono, monospace" fontWeight="500">מערכת</text>
                  <text x={HUB.x} y={HUB.y + 9} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#b6d9fc" fontFamily="JetBrains Mono, monospace" fontWeight="500">ניהול חכמה</text>
                </g>

                {/* Satellite nodes */}
                {nodes.map((n, i) => (
                  <g
                    key={i}
                    style={{ animation: `${n.fa} ${n.dur}s ease-in-out infinite`, animationDelay: `${n.del * 0.8}s` }}
                    filter="url(#node-glow)"
                  >
                    <circle cx={n.x} cy={n.y} r="32" fill="#2f343e" stroke="rgba(63,73,89,0.9)" strokeWidth="1" />
                    <circle cx={n.x} cy={n.y} r="32" fill="none" stroke="rgba(102,58,243,0.22)" strokeWidth="0.8" />
                    <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#9da7ba" fontFamily="Ellinia CLM, sans-serif">
                      {n.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            className="order-last md:order-first"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} className="font-mono tracking-widest text-[#663af3] uppercase text-xs mb-4">
              הבעיה
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold leading-tight mb-5"
              style={{ fontFamily: 'Ellinia CLM, sans-serif' }}
            >
              <span className="text-[#d8ecf8]">כשהמידע מפוזר —</span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(160deg,#d8ecf8,#98c0ef)' }}
              >
                העסק מאבד שליטה
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#81899b] leading-relaxed mb-10 text-base">
              הבעיה היא לא שאין לך מערכת. הבעיה היא שהעסק לא באמת מחובר. כל אחד עובד בכלי משלו, ואין מקום אחד שבו אפשר לראות את התמונה המלאה.
            </motion.p>

            <motion.div variants={stagger} className="space-y-0">
              {painPoints.map(({ title, body }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="group flex gap-4 py-5 border-b border-white/[0.06] last:border-b-0"
                >
                  <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[#663af3] ring-4 ring-[#663af3]/15 group-hover:ring-[#663af3]/35 transition-all" />
                  <div>
                    <p className="text-[#d8ecf8] font-semibold mb-0.5">{title}</p>
                    <p className="text-[#d7ddea] text-sm leading-relaxed">{body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
