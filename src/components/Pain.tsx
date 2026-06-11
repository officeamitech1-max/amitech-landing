import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }

const painPoints = [
  { title: 'הכל מפוזר, שום דבר לא מסודר', body: 'לקוחות בוואטסאפ, חשבוניות באקסל, משימות בראש. כשצריך למצוא משהו, זה לוקח דקות — ולפעמים אי-אפשר.' },
  { title: 'תהליכים תלויים באנשים', body: 'כשעובד עוזב או חולה — עצר. אין תיעוד, אין מערכת, הכל בזיכרון.' },
  { title: 'אין תמונת מצב אמיתית', body: 'אתה לא יודע כמה לידים פתוחים, מי חייב כסף, מה בוצע ומה לא. הניחוש הוא לא שיטת ניהול.' },
  { title: 'הגדלה מייצרת בלגן', body: 'כל ניסיון לצמוח מוביל לבלגן גדול יותר. בלי מערכת, צמיחה מנוהלת פשוט לא אפשרית.' },
]

// 9 nodes around a circle r=155, center=200,200 — each with its own accent color
const nodes = [
  { label: 'לקוחות',  x: 200, y:  45, fa: 'float-a', dur: 3.2, del: 0,   color: '#4a9fff' },
  { label: 'WhatsApp', x: 345, y:  88, fa: 'float-b', dur: 2.9, del: 0.4, color: '#3dc8a0' },
  { label: 'Excel',    x: 355, y: 245, fa: 'float-c', dur: 3.5, del: 0.2, color: '#45c870' },
  { label: 'מיילים',  x: 265, y: 355, fa: 'float-a', dur: 3.0, del: 0.6, color: '#5590ff' },
  { label: 'טפסים',   x: 135, y: 355, fa: 'float-b', dur: 2.7, del: 0.1, color: '#7878e8' },
  { label: 'יומן',     x:  45, y: 245, fa: 'float-c', dur: 3.3, del: 0.5, color: '#9055e0' },
  { label: 'לידים',   x:  55, y:  88, fa: 'float-a', dur: 2.8, del: 0.3, color: '#8045d8' },
  { label: 'גבייה',   x: 120, y:  40, fa: 'float-b', dur: 3.1, del: 0.7, color: '#6068f0' },
  { label: 'משימות',  x: 282, y:  40, fa: 'float-c', dur: 2.6, del: 0.2, color: '#4a88ff' },
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
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="relative" style={{ width: '100%', maxWidth: '580px' }}>
              {/* Glow backdrop */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(80,120,255,0.13) 0%, rgba(102,58,243,0.07) 45%, transparent 70%)',
                }}
              />
              <svg
                viewBox="-15 -15 430 430"
                className="w-full h-full"
                style={{ overflow: 'visible' }}
              >
                <defs>
                  {/* Hub glow filter */}
                  <filter id="hub-glow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Node glow filter */}
                  <filter id="node-glow" x="-35%" y="-35%" width="170%" height="170%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Hub fill gradient */}
                  <radialGradient id="hub-fill" cx="50%" cy="38%" r="65%">
                    <stop offset="0%"   stopColor="#2b1e52" />
                    <stop offset="55%"  stopColor="#181530" />
                    <stop offset="100%" stopColor="#0d0f1e" />
                  </radialGradient>
                  {/* Node fill gradient */}
                  <radialGradient id="node-fill" cx="40%" cy="32%" r="70%">
                    <stop offset="0%"   stopColor="#1e2a42" />
                    <stop offset="100%" stopColor="#0f1520" />
                  </radialGradient>
                  {/* Per-node line gradients */}
                  {nodes.map((n, i) => (
                    <linearGradient key={i} id={`lg-${i}`} x1={n.x} y1={n.y} x2={HUB.x} y2={HUB.y} gradientUnits="userSpaceOnUse">
                      <stop offset="0%"   stopColor={n.color} stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#663af3" stopOpacity="0.12" />
                    </linearGradient>
                  ))}
                </defs>

                {/* Faint outer orbit reference ring */}
                <circle
                  cx={HUB.x} cy={HUB.y} r="163"
                  fill="none"
                  stroke="rgba(80,130,255,0.07)"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                />

                {/* Lines from nodes to hub — gradient colored */}
                {nodes.map((n, i) => (
                  <line
                    key={i}
                    x1={n.x} y1={n.y}
                    x2={HUB.x} y2={HUB.y}
                    stroke={`url(#lg-${i})`}
                    strokeWidth="1.2"
                    strokeDasharray="4 5"
                    style={{ animation: `dash-flow 2.8s linear infinite`, animationDelay: `${n.del}s` }}
                  />
                ))}

                {/* Hub outer orbit ring 2 — slow, wide */}
                <circle
                  cx={HUB.x} cy={HUB.y} r="92"
                  fill="none"
                  stroke="rgba(80,120,255,0.10)"
                  strokeWidth="1"
                  strokeDasharray="3 8"
                  style={{ animation: 'dash-flow 12s linear infinite reverse' }}
                />
                {/* Hub outer orbit ring 1 — purple */}
                <circle
                  cx={HUB.x} cy={HUB.y} r="76"
                  fill="none"
                  stroke="rgba(102,58,243,0.28)"
                  strokeWidth="1"
                  strokeDasharray="4 5"
                  style={{ animation: 'dash-flow 7s linear infinite reverse' }}
                />

                {/* Hub */}
                <g style={{ animation: 'float-b 3.6s ease-in-out infinite' }} filter="url(#hub-glow)">
                  {/* Outer glow halo */}
                  <circle cx={HUB.x} cy={HUB.y} r="66" fill="rgba(102,58,243,0.08)" />
                  {/* Main hub circle */}
                  <circle cx={HUB.x} cy={HUB.y} r="60" fill="url(#hub-fill)" stroke="rgba(102,58,243,0.80)" strokeWidth="1.5" />
                  {/* Inner highlight */}
                  <circle cx={HUB.x - 12} cy={HUB.y - 14} r="22" fill="rgba(255,255,255,0.025)" />
                  <text x={HUB.x} y={HUB.y - 9} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#c8d8f5" fontFamily="Heebo, sans-serif" fontWeight="600">מערכת</text>
                  <text x={HUB.x} y={HUB.y + 9} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#c8d8f5" fontFamily="Heebo, sans-serif" fontWeight="600">מידע</text>
                </g>

                {/* Satellite nodes */}
                {nodes.map((n, i) => (
                  <g
                    key={i}
                    style={{ animation: `${n.fa} ${n.dur}s ease-in-out infinite`, animationDelay: `${n.del * 0.8}s` }}
                    filter="url(#node-glow)"
                  >
                    {/* Outer glow halo */}
                    <circle cx={n.x} cy={n.y} r="38" fill="none" stroke={n.color} strokeWidth="0" opacity="0.08" />
                    {/* Main node */}
                    <circle cx={n.x} cy={n.y} r="35" fill="url(#node-fill)" stroke={n.color} strokeWidth="1.2" strokeOpacity="0.55" />
                    {/* Inner glass highlight */}
                    <circle cx={n.x - 9} cy={n.y - 11} r="12" fill="rgba(255,255,255,0.03)" />
                    {/* Accent dot top-left */}
                    <circle cx={n.x - 20} cy={n.y - 22} r="2.5" fill={n.color} opacity="0.6" />
                    <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#c5d8f0" fontFamily="Heebo, sans-serif" fontWeight="500">
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
              <span className="text-[#e5efff]">כשהמידע מפוזר —</span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(160deg,#e5efff,#98c0ef)' }}
              >
                העסק מאבד שליטה
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#b0bccf] leading-relaxed mb-10 text-base">
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
                    <p className="text-[#e5efff] font-semibold mb-0.5">{title}</p>
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
