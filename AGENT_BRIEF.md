# Amitech Landing Page — Agent Brief

## Project Status
- [x] Vite + React + TypeScript setup
- [x] Tailwind CSS v4 installed (@tailwindcss/vite)
- [x] lucide-react installed
- [x] framer-motion installed
- [x] All component files created (empty)
- [x] App.tsx done
- [x] Nav.tsx done
- [ ] Hero.tsx — TODO
- [ ] Pain.tsx — TODO
- [ ] Solution.tsx — TODO
- [ ] Services.tsx — TODO
- [ ] Process.tsx — TODO
- [ ] Examples.tsx — TODO
- [ ] Why.tsx — TODO
- [ ] FAQ.tsx — TODO
- [ ] CTA.tsx — TODO
- [ ] Footer.tsx — TODO

## Stack
- React + TypeScript + Vite
- Tailwind CSS v4 (@tailwindcss/vite) — NO tailwind.config.js
- lucide-react (icons only, NO emojis)
- framer-motion (all animations)
- RTL Hebrew (dir="rtl" set on App.tsx wrapper div)

## index.css (already configured)
@import "tailwindcss";

## index.html — add to <head>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

## Design System — AuthKit Inspired

### Colors (use as Tailwind arbitrary values)
- bg-[#05060f]     → Midnight Ink (page background)
- bg-[#2f343e]     → Graphite Plate (cards)
- border-[#3f4959] → Steel (borders)
- text-[#d8ecf8]   → Glacier (headings)
- text-[#c7d3ea]   → Moonlight (body)
- text-[#81899b]   → Fog (muted/labels)
- text-[#9da7ba]   → Pebble (secondary)
- text-[#b6d9fc]   → Frost Link (accent text)
- bg-[#663af3]     → Electric Iris (primary CTA only)

### Component Rules
- Buttons: bg-[#663af3] rounded-sm (2px) NO gradients NO shadows
- Ghost button: border border-white/[0.14] bg-transparent rounded-sm
- Cards: bg-[#2f343e] border border-[#3f4959]
- Section labels: font-mono tracking-widest text-[#81899b] uppercase text-xs
- Grid bg pattern: [background-image:linear-gradient(rgba(186,215,247,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(186,215,247,0.04)_1px,transparent_1px)] [background-size:40px_40px]
- NO glassmorphism, NO heavy shadows, NO gradients on cards

### Typography
- Hebrew body: font-family Heebo
- Display/Numbers: font-family Syne  
- Labels: font-family JetBrains Mono

### Animations (framer-motion)
- Scroll reveal: whileInView={{opacity:1, y:0}} initial={{opacity:0, y:28}} viewport={{once:true}}
- Stagger: use variants with staggerChildren: 0.08
- FAQ: AnimatePresence for accordion

## Logo
- File: /public/logo.png
- Usage: <img src="/logo.png" style={{mixBlendMode:'screen'}} className="h-12 w-auto" />

## App.tsx (DONE — do not modify)
Wraps everything in:
<div className="bg-[#05060f] text-[#d8ecf8] min-h-screen" dir="rtl">

## Nav.tsx (DONE — do not modify)
- Logo with mix-blend-mode screen
- Nav links: הבעיה / שירותים / תהליך / למה אנחנו / שאלות
- CTA: "לתיאום שיחה" → #cta
- Sticky with backdrop-blur on scroll

## Hero.tsx — BUILD THIS FIRST
- Section: id="hero", relative min-h-screen, flex items-center justify-center text-center
- Blueprint grid overlay (absolute inset-0)
- Canvas particle network (animated dots + connecting lines)
  - 90 particles, rgba(182,217,252) dots, rgba(186,215,247) lines
  - useRef + useEffect, ResizeObserver, requestAnimationFrame
- Iris glow blob top center
- Badge pill: bg-[#663af3]/10 border border-[#663af3]/30 rounded-full
  Text: "מערכות מידע חכמות לעסקים" + pulse dot
- H1 gradient: bg-gradient-to-b from-[#d8ecf8] to-[#98c0ef] bg-clip-text text-transparent
  "העסק שלך צריך מערכת שעובדת בשבילך"
- Subtitle (text-[#9da7ba]): 
  "Amitech מאפיינת, בונה ומטמיעה מערכות מידע, אוטומציות ודשבורדים שמכניסים סדר, שליטה ובהירות לתהליכי העבודה שלך."
- 2 CTAs:
  Primary: bg-[#663af3] rounded-sm "לתיאום שיחת אפיון" + Calendar icon
  Ghost: border border-white/[0.14] rounded-sm "לבדיקת תהליך בעסק שלי" + ArrowLeft icon
- Stats row (border-t border-white/[0.06]):
  50+ מערכות שנבנו | 30+ עסקים שקיבלו שליטה | 40% פחות עבודה ידנית
  Numbers: font-syne text-3xl gradient text

## Pain.tsx
- id="pain"
- 2-col grid (reverse on mobile — SVG on top)
- RIGHT col (copy):
  Label: "כשהמידע מפוזר — העסק מאבד שליטה"
  H2: "הבעיה היא לא שאין לך מערכת. הבעיה היא שהעסק לא באמת מחובר."
  Body text (text-[#81899b])
  4 pain points with dot + border-b border-white/[0.06]:
    - מידע חשוב נמצא בשיחות ולא במערכת
    - משימות תלויות בזיכרון של אנשים
    - אין תמונת מצב אחת שמראה מה באמת קורה
    - קשה למדוד, לשפר ולהגדיל את העסק
- LEFT col (SVG network):
  9 floating nodes → central hub
  Nodes: לקוחות / WhatsApp / Excel / מיילים / טפסים / יומן / לידים / גבייה / משימות
  Hub: "מערכת ניהול חכמה"
  Colors: lines rgba(186,215,247,0.14), hub stroke rgba(102,58,243,0.6), nodes bg-[#2f343e]
  Floating animation with CSS keyframes (translateY)
  Dashed flowing lines with stroke-dasharray animation

## Solution.tsx
- id="solution"
- Single centered card max-w-3xl mx-auto
- bg-[#2f343e] border border-[#3f4959] rounded-2xl p-16 text-center
- Iris glow blob inside (absolute, top, radial-gradient)
- Label: "הפתרון"
- H2: "מערכות מידע, אוטומציות ודשבורדים שמכניסים סדר, שליטה ובהירות"
- Body text
- 5 pills (rounded-full bg-[#663af3]/12 border border-[#663af3]/25 text-[#b6d9fc]):
  סדר / שליטה / בהירות / מדידה / אוטומציה

## Services.tsx
- id="services"
- grid auto-fill minmax(300px,1fr) gap-4
- 6 cards (bg-[#2f343e] border border-[#3f4959] rounded-xl p-7)
- Each card: icon box + title (text-[#d8ecf8]) + desc (text-[#81899b])
- Icon box: bg-[#663af3]/12 border border-[#663af3]/22 rounded-lg w-11 h-11 text-[#b6d9fc]
- Hover: border-[#663af3]/40
- Cards:
  1. git-branch → אפיון תהליכים עסקיים
  2. database → בניית CRM ומערכות מידע
  3. zap → אוטומציות עסקיות
  4. bar-chart-2 → דשבורדים ודוחות ניהוליים
  5. settings-2 → שיפור מערכות קיימות
  6. link-2 → חיבור בין מערכות ותהליכים

## Process.tsx
- id="process"
- Section label + H2: "מ-0 למערכת פועלת בצעדים ברורים"
- Desktop: 5-col grid with horizontal line (border-t border-[#3f4959]) at top of numbers
- Mobile: vertical list, flex-row (number circle + text side by side)
- Number circle: bg-[#05060f] border border-[#3f4959] rounded-full w-14 h-14
  font-mono text-[#b6d9fc]
- Hover: border-[#663af3]/50 bg-[#663af3]/08
- 5 steps:
  01 שיחת אפיון — מבינים את העסק שלך, הבעיות, המטרות והתהליכים הקיימים
  02 מיפוי תהליכים — מתעדים ומנתחים את זרימת הנתונים והעבודה בעסק
  03 תכנון הפתרון — בונים ארכיטקטורה של המערכת ומציגים אותה לאישורך
  04 בנייה ויישום — מקימים, מחברים ומגדירים את כל רכיבי המערכת
  05 הדרכה ותמיכה — מדריכים את הצוות ונותנים תמיכה גם אחרי ההשקה

## Examples.tsx
- id="examples"
- grid auto-fill minmax(300px,1fr) gap-4
- 6 cards like Services
- Each: tag chip + title + desc
- Tag: bg-[#663af3]/12 border border-[#663af3]/22 text-[#b6d9fc] rounded text-xs px-2 py-1
- Top border line animates on hover: scaleX 0→1
  1. CRM → מערכת ניהול לידים ולקוחות
  2. אוטומציה → אוטומציה לגבייה ושליחת חשבוניות
  3. דשבורד → לוח ניהולי עם נתוני מכירות
  4. ניהול → מערכת ניהול פרויקטים ומשימות
  5. אינטגרציה → חיבור טפסים, CRM ואחסון בענן
  6. דוחות → דוחות שבועיים אוטומטיים למנהלים

## Why.tsx
- id="why"
- grid auto-fill minmax(300px,1fr) gap-4
- 6 items: flex-row gap-4 bg-[#2f343e] border border-[#3f4959] rounded-xl p-6
- Icon box same as services
- Hover: border-[#663af3]/38
  1. brain → מבינים עסקים, לא רק טכנולוגיה
  2. search → אפיון מעמיק לפני כל פתרון
  3. target → מערכות שמותאמות בדיוק לך
  4. graduation-cap → הדרכה עד שזה עובד
  5. shield-check → תמיכה גם אחרי ההשקה
  6. trending-up → תוצאות מדידות

## FAQ.tsx
- id="faq"
- max-w-3xl mx-auto
- useState for open index
- 5 items, border-b border-white/[0.06]
- Button: flex justify-between items-center w-full py-6 text-right
- Plus icon (lucide) rotates 45deg when open: transition-transform
- AnimatePresence + motion.div for answer height
- Answer text: text-[#81899b] pb-6
- Questions:
  1. מה ההבדל בין Amitech לבין ייעוץ ארגוני רגיל?
  2. כמה זמן לוקח לבנות מערכת?
  3. האם צריך ידע טכני כדי לעבוד עם המערכת?
  4. עם אילו פלטפורמות אתם עובדים?
  5. מה קורה אחרי ההשקה?

## CTA.tsx
- id="cta"
- Centered card max-w-2xl mx-auto
- bg-[#2f343e] border border-[#3f4959] rounded-2xl p-20 text-center
- Iris blob glow behind/inside
- Label: "מוכן להתחיל?"
- H2: "מוכן להכניס סדר לעסק שלך?"
- Sub: "שיחת אפיון ראשונה — ללא עלות וללא התחייבות."
- 2 buttons: Primary + Ghost (same as hero)

## Footer.tsx
- border-t border-white/[0.06] py-9 px-12
- flex justify-between items-center flex-wrap gap-4
- Logo img (same as nav)
- Copyright: text-[#81899b] text-sm "© 2025 Amitech. מערכות מידע ואוטומציות לעסקים."

## Responsive Rules
- All grids → grid-cols-1 on mobile
- Pain: flex-col, SVG on top
- Process: grid-cols-1, each step flex-row (number + text)
- Nav links: hidden md:flex
- Hero title: text-[2.2rem] → md:text-6xl
- Section padding: px-5 md:px-6, py-16 md:py-24