const GRAIN =
  "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

export function AmitechNebulaBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* ── Static deep nebula mass — always visible from load ── */}
      {/* Large left cloud */}
      <div
        className="absolute rounded-full mix-blend-screen animate-nebula-breathe"
        style={{
          width: '700px', height: '560px',
          top: '10%', left: '5%',
          background: 'radial-gradient(circle, rgba(40,100,230,0.55) 0%, rgba(25,65,195,0.28) 42%, transparent 70%)',
          filter: 'blur(75px)',
        }}
      />
      {/* Large right cloud */}
      <div
        className="absolute rounded-full mix-blend-screen animate-nebula-breathe-b"
        style={{
          width: '620px', height: '500px',
          top: '6%', right: '3%',
          background: 'radial-gradient(circle, rgba(55,115,240,0.50) 0%, rgba(35,80,205,0.24) 44%, transparent 70%)',
          filter: 'blur(68px)',
        }}
      />
      {/* Center-left mid cloud */}
      <div
        className="absolute rounded-full mix-blend-screen animate-nebula-breathe-c"
        style={{
          width: '760px', height: '580px',
          top: '26%', left: '20%',
          background: 'radial-gradient(circle, rgba(45,105,225,0.48) 0%, rgba(28,70,195,0.22) 40%, transparent 68%)',
          filter: 'blur(82px)',
        }}
      />
      {/* Right mid cloud */}
      <div
        className="absolute rounded-full mix-blend-screen animate-nebula-breathe"
        style={{
          width: '520px', height: '430px',
          top: '33%', right: '7%',
          background: 'radial-gradient(circle, rgba(65,128,235,0.44) 0%, rgba(38,88,205,0.20) 44%, transparent 70%)',
          filter: 'blur(60px)',
          animationDelay: '11s',
        }}
      />

      {/* ── Rising smoke layers ── */}
      <div
        className="absolute left-[18%] top-[48%] h-[520px] w-[520px] rounded-full mix-blend-screen animate-smoke-rise-one"
        style={{
          background: 'radial-gradient(circle, rgba(165,215,255,0.50) 0%, rgba(82,148,255,0.24) 42%, transparent 68%)',
          filter: 'blur(55px)',
        }}
      />
      <div
        className="absolute left-[42%] top-[54%] h-[440px] w-[440px] rounded-full mix-blend-screen animate-smoke-rise-two"
        style={{
          background: 'radial-gradient(circle, rgba(145,205,255,0.46) 0%, rgba(68,135,248,0.20) 45%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />
      <div
        className="absolute left-[8%] top-[62%] h-[680px] w-[680px] rounded-full mix-blend-screen animate-smoke-rise-three"
        style={{
          background: 'radial-gradient(circle, rgba(175,218,255,0.42) 0%, rgba(72,138,252,0.18) 42%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute right-[12%] top-[46%] h-[380px] w-[380px] rounded-full mix-blend-screen animate-smoke-rise-four"
        style={{
          background: 'radial-gradient(circle, rgba(185,222,255,0.50) 0%, rgba(102,162,255,0.22) 40%, transparent 65%)',
          filter: 'blur(42px)',
        }}
      />
      <div
        className="absolute right-[2%] top-[66%] h-[560px] w-[560px] rounded-full mix-blend-screen animate-smoke-rise-five"
        style={{
          background: 'radial-gradient(circle, rgba(150,205,255,0.44) 0%, rgba(55,118,238,0.18) 45%, transparent 70%)',
          filter: 'blur(72px)',
        }}
      />

      {/* ── Central energy orb ── */}
      <div className="absolute left-1/2 top-[42%] h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2">
        {/* Distant glow */}
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen animate-nebula-glow"
          style={{
            background: 'radial-gradient(circle, rgba(60,120,255,0.38) 0%, rgba(30,80,200,0.18) 38%, transparent 68%)',
            filter: 'blur(55px)',
          }}
        />
        {/* Inner halo */}
        <div
          className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen animate-nebula-inner"
          style={{
            background: 'radial-gradient(circle, rgba(185,225,255,0.68) 0%, rgba(105,168,255,0.34) 42%, transparent 72%)',
            filter: 'blur(18px)',
          }}
        />
      </div>

      {/* ── Soft vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,2,8,0.12) 62%, rgba(0,1,5,0.28) 100%)',
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: 0.035,
          backgroundImage: `url("${GRAIN}")`,
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  )
}
