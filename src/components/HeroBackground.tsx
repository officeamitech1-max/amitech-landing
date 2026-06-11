import React from 'react'

const orbCenter: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: '50%',
  mixBlendMode: 'screen',
  willChange: 'transform, opacity',
}

const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

const particles: Array<{
  w: number; h: number; left: string; bottom: string
  blur: number; bg: string; anim: string
}> = [
  { w: 420, h: 420, left: '28%', bottom: '-10%', blur: 32,
    bg: 'radial-gradient(circle, rgba(200,225,255,0.14), rgba(80,140,255,0.06), transparent 65%)',
    anim: 'smoke-rise1 14s ease-in-out infinite' },
  { w: 320, h: 320, left: '48%', bottom: '-5%',  blur: 24,
    bg: 'radial-gradient(circle, rgba(160,205,255,0.12), rgba(60,120,240,0.05), transparent 65%)',
    anim: 'smoke-rise2 18s ease-in-out infinite 2s' },
  { w: 500, h: 500, left: '18%', bottom: '-15%', blur: 40,
    bg: 'radial-gradient(circle, rgba(180,215,255,0.09), rgba(70,130,255,0.04), transparent 65%)',
    anim: 'smoke-rise3 22s ease-in-out infinite 1s' },
  { w: 260, h: 260, left: '55%', bottom: '-5%',  blur: 20,
    bg: 'radial-gradient(circle, rgba(210,230,255,0.16), rgba(100,160,255,0.07), transparent 60%)',
    anim: 'smoke-rise4 16s ease-in-out infinite 3.5s' },
  { w: 380, h: 380, left: '35%', bottom: '-8%',  blur: 36,
    bg: 'radial-gradient(circle, rgba(170,210,255,0.11), rgba(50,110,220,0.05), transparent 65%)',
    anim: 'smoke-rise5 20s ease-in-out infinite 0.5s' },
  { w: 300, h: 300, left: '10%', bottom: '0%',   blur: 28,
    bg: 'radial-gradient(circle, rgba(190,220,255,0.13), rgba(90,150,255,0.06), transparent 65%)',
    anim: 'smoke-rise1 25s ease-in-out infinite 4s' },
  { w: 450, h: 450, left: '50%', bottom: '-12%', blur: 44,
    bg: 'radial-gradient(circle, rgba(150,200,255,0.08), rgba(40,100,200,0.04), transparent 65%)',
    anim: 'smoke-rise3 28s ease-in-out infinite 6s' },
]

export default function HeroBackground() {
  return (
    <>
      {/* Ambient halo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(40,90,200,0.12) 0%, rgba(20,50,150,0.05) 40%, transparent 65%)',
          mixBlendMode: 'screen',
          animation: 'halo-bg-pulse 6s ease-in-out infinite',
        }}
      />

      {/* Rising smoke */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      >
        {particles.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: p.w, height: p.h,
              left: p.left, bottom: p.bottom,
              borderRadius: '50%',
              background: p.bg,
              filter: `blur(${p.blur}px)`,
              animation: p.anim,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* Central light orb */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div style={{ position: 'relative', width: 160, height: 160 }}>
          {/* Distant radiation */}
          <div style={{
            ...orbCenter,
            width: 600, height: 600,
            background:
              'radial-gradient(circle, rgba(60,120,255,0.10) 0%, rgba(30,80,200,0.04) 40%, transparent 65%)',
            filter: 'blur(40px)',
            animation: 'orb-glow-pulse 7s ease-in-out infinite',
          }} />
          {/* Outer halo */}
          <div style={{
            ...orbCenter,
            width: 220, height: 220,
            background:
              'radial-gradient(circle, rgba(100,160,255,0.18) 0%, rgba(60,120,240,0.08) 45%, rgba(30,80,200,0.03) 70%, transparent 85%)',
            filter: 'blur(18px)',
            animation: 'orb-halo-pulse 5s ease-in-out infinite 0.6s',
          }} />
          {/* Inner ring */}
          <div style={{
            ...orbCenter,
            width: 80, height: 80,
            background:
              'radial-gradient(circle, rgba(180,220,255,0.55) 0%, rgba(100,165,255,0.25) 50%, transparent 75%)',
            filter: 'blur(8px)',
            animation: 'orb-inner-pulse 4s ease-in-out infinite 0.3s',
          }} />
          {/* Bright core */}
          <div style={{
            ...orbCenter,
            width: 28, height: 28,
            background:
              'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(200,230,255,0.9) 40%, rgba(140,190,255,0.5) 70%, transparent 100%)',
            filter: 'blur(3px)',
            animation: 'orb-core-pulse 4s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,2,8,0.5) 70%, rgba(0,1,5,0.85) 100%)',
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.03,
          mixBlendMode: 'overlay',
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: '256px 256px',
        }}
      />
    </>
  )
}
