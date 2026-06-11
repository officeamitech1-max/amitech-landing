export default function AtmosphericBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Primary — large top-center electric blue */}
      <div
        className="absolute left-1/2 top-[-20%] h-[760px] w-[980px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(27,102,248,0.22) 0%, rgba(14,35,80,0.18) 38%, rgba(0,0,0,0) 72%)',
          animation: 'nebula-drift 38s ease-in-out infinite alternate',
          willChange: 'transform, opacity',
        }}
      />

      {/* Upper-right — soft sky blue */}
      <div
        className="absolute right-[-8%] top-[12%] h-[620px] w-[760px] rounded-full blur-[140px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(96,165,250,0.12) 0%, rgba(27,102,248,0.08) 42%, rgba(0,0,0,0) 75%)',
          animation: 'nebula-drift-soft 46s ease-in-out infinite alternate',
          willChange: 'transform, opacity',
        }}
      />

      {/* Mid-left — blue-violet nuance */}
      <div
        className="absolute left-[-10%] top-[34%] h-[620px] w-[760px] rounded-full blur-[150px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(109,93,252,0.10) 0%, rgba(27,102,248,0.07) 44%, rgba(0,0,0,0) 78%)',
          animation: 'nebula-drift-reverse 52s ease-in-out infinite alternate',
          willChange: 'transform, opacity',
        }}
      />

      {/* Center-low — deep sky blue breath */}
      <div
        className="absolute left-[25%] top-[48%] h-[520px] w-[680px] rounded-full blur-[160px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(14,165,233,0.08) 0%, rgba(15,23,42,0.05) 50%, rgba(0,0,0,0) 80%)',
          animation: 'nebula-breathe 60s ease-in-out infinite alternate',
          willChange: 'transform, opacity',
        }}
      />

      {/* Vignette — fade edges to background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,6,23,0)_0%,#020617_82%)]" />
    </div>
  )
}
