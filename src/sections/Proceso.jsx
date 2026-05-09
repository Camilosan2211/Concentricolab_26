import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Search, PenTool, Boxes } from 'lucide-react'

const steps = [
  {
    Icon: Search,
    color: '#4D66FF',
    es: { title: 'Diagnóstico', desc: 'Analizamos el producto, espacio o marca — su forma, contexto y cómo se percibe en el mundo real.' },
    en: { title: 'Diagnosis', desc: 'We analyze the product, space or brand — its form, context and how it is perceived in the real world.' },
  },
  {
    Icon: PenTool,
    color: '#FF6D4D',
    es: { title: 'Diseño', desc: 'Lo convertimos en forma, narrativa y sistema — identidad, piezas digitales o contenido coherente.' },
    en: { title: 'Design', desc: 'We turn it into form, narrative and system — identity, digital pieces or coherent content.' },
  },
  {
    Icon: Boxes,
    color: '#828AFF',
    es: { title: 'Sistema', desc: 'Piezas listas para comunicar y posicionar — en los formatos acordados, listas para publicar o producir.' },
    en: { title: 'System', desc: 'Pieces ready to communicate and position — in agreed formats, ready to publish or produce.' },
  },
]

/* ── Hook responsive ───────────────────────────────────────────── */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const handler = (e) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])
  return matches
}

/* ── Tarjeta de etapa (misma skin visual del proyecto) ────────── */
function StepCard({ step, lang, isFocused, onClick }) {
  const Icon = step.Icon
  const c    = lang === 'es' ? step.es : step.en

  return (
    <div
      onClick={onClick}
      className="relative rounded-card overflow-hidden group border dark:border-white/[0.07] border-black/[0.07] dark:bg-white/[0.03] bg-white/60 backdrop-blur-sm cursor-pointer w-full"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }} />

      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-20 group-hover:opacity-50 transition-all duration-500"
        style={{ background: `radial-gradient(circle, ${step.color}40 0%, transparent 70%)`, filter: 'blur(24px)' }} aria-hidden="true"
      />

      <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center gap-4">
        <span className="font-cal text-[10px] font-bold tracking-[.12em] uppercase transition-opacity duration-500" style={{ color: step.color, opacity: isFocused ? 0.7 : 0.35 }}>
          {isFocused ? (lang === 'es' ? 'En foco' : 'In focus') : (lang === 'es' ? 'En órbita' : 'In orbit')}
        </span>

        <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500" style={{ background: `${step.color}18`, border: `1px solid ${step.color}30`, boxShadow: isFocused ? `0 0 20px ${step.color}22` : 'none' }}>
          <Icon size={24} style={{ color: step.color }} strokeWidth={1.75} />
        </div>

        <div className="flex flex-col gap-2 max-w-[260px]">
          <h3 className="font-cal text-xl dark:text-white text-b-dark">{c.title}</h3>
          <p className="dark:text-white/50 text-black/50 text-sm leading-[1.65]">{c.desc}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }} />
    </div>
  )
}

/* ── SVG de órbita + spark hex ────────────────────────────────── */
function OrbitSVG({ inView, path, isMobile }) {
  const gradId = 'orbitGrad'
  const viewBox = isMobile ? '0 0 400 500' : '0 0 1200 520'
  const cls = isMobile
    ? 'absolute inset-0 w-full h-full pointer-events-none z-0 md:hidden'
    : 'absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block'

  return (
    <svg className={cls} viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2={isMobile ? '0' : '1200'} y2={isMobile ? '500' : '520'} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4D66FF" />
          <stop offset="40%" stopColor="#FF6D4D" />
          <stop offset="100%" stopColor="#828AFF" />
        </linearGradient>
        <radialGradient id="centerGlow">
          <stop offset="0%" stopColor="#4D66FF" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#FF6D4D" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#828AFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow central */}
      <motion.circle
        cx={isMobile ? 200 : 600}
        cy={isMobile ? 250 : 260}
        r={isMobile ? 60 : 100}
        fill="url(#centerGlow)"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: [0, 0.7, 0], scale: [0.6, 1.3, 0.6] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Sombra del path */}
      <path d={path} stroke={`url(#${gradId})`} strokeWidth="12" fill="none" opacity="0.04" strokeLinecap="round" />

      {/* Path principal */}
      <motion.path
        d={path} stroke={`url(#${gradId})`} strokeWidth="2" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />

      {/* Flow dashes */}
      <motion.path
        d={path} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 14"
        initial={{ strokeDashoffset: 0 }} animate={inView ? { strokeDashoffset: -34 } : {}}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear', delay: 1 }}
      />

      {/* Hex spark dual */}
      {inView && (
        <g>
          <polygon points="0,-5 4.33,-2.5 4.33,2.5 0,5 -4.33,2.5 -4.33,-2.5" fill="#4D66FF">
            <animateMotion dur={isMobile ? '6s' : '5s'} repeatCount="indefinite" path={path} />
          </polygon>
          <polygon points="0,-3 2.6,-1.5 2.6,1.5 0,3 -2.6,1.5 -2.6,-1.5" fill="#FF6D4D" opacity="0.6">
            <animateMotion dur={isMobile ? '6s' : '5s'} repeatCount="indefinite" path={path} begin={isMobile ? '-1s' : '-0.8s'} />
          </polygon>
        </g>
      )}
    </svg>
  )
}

/* ── Posiciones orbitales ─────────────────────────────────────── */
function useOrbitPositions(isMobile) {
  if (isMobile) {
    return [
      { left: '50%', top: '56%', scale: 1,     opacity: 1,   blur: 0,  z: 30 },
      { left: '35%', top: '16%', scale: 0.7,   opacity: 0.3, blur: 3,  z: 10 },
      { left: '65%', top: '88%', scale: 0.7,   opacity: 0.3, blur: 3,  z: 10 },
    ]
  }
  return [
    { left: '50%', top: '72%', scale: 1,       opacity: 1,   blur: 0,  z: 30 },
    { left: '22%', top: '30%', scale: 0.76,    opacity: 0.35, blur: 3,  z: 10 },
    { left: '78%', top: '30%', scale: 0.76,    opacity: 0.35, blur: 3,  z: 10 },
  ]
}

/* ═══════════════════════════════════════════════════════════════════
   Componente principal
   ═══════════════════════════════════════════════════════════════════ */
export default function Proceso({ lang }) {
  const t        = (es, en) => lang === 'es' ? es : en
  const isMobile = useMediaQuery('(max-width: 767px)')
  const ref      = useRef(null)
  const inView   = useInView(ref, { once: true, margin: '-80px' })
  const [focus, setFocus] = useState(0)

  const positions = useOrbitPositions(isMobile)

  /* Rutas SVG según viewport */
  const desktopPath = 'M 600 390 Q 220 480 220 160 Q 600 40 980 160 Q 980 480 600 390'
  const mobilePath  = 'M 200 280 Q 80 140 160 90 Q 280 200 230 440 Q 320 360 200 280'

  const path = isMobile ? mobilePath : desktopPath

  /* Rotación de foco cada 5 s */
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setFocus(i => (i + 1) % 3), 5000)
    return () => clearInterval(id)
  }, [inView])

  const focusColors = ['#4D66FF', '#FF6D4D', '#828AFF']

  return (
    <section id="proceso" className="relative z-10 py-16 md:py-20 px-4 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(ellipse, rgba(77,102,255,.06) 0%, transparent 70%)', filter: 'blur(60px)' }} aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto flex flex-col gap-10">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
          <motion.p
            className="text-[12px] font-bold tracking-[0.12em] uppercase dark:text-white/30 text-black/35"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            {t('El proceso', 'The process')}
          </motion.p>
          <motion.h2
            className="font-cal text-3xl md:text-4xl dark:text-white text-b-dark leading-tight"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('Un proceso que ', 'A process that ')}
            <span className="text-grad">{t('itera', 'iterates')}</span>
          </motion.h2>
          <motion.p
            className="text-sm dark:text-white/40 text-black/40"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('Diagnóstico, diseño, sistema — tres etapas, ajuste constante.', 'Diagnosis, design, system — three stages, constant refinement.')}
          </motion.p>
        </div>

        {/* ── Órbita ────────────────────────────────────────────── */}
        <div ref={ref} className="relative w-full h-[500px] md:h-[520px]">
          <OrbitSVG inView={inView} path={path} isMobile={isMobile} />

          {steps.map((step, i) => {
            const offset = (focus - i + 3) % 3
            const pos = positions[offset]

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{ width: isMobile ? '75%' : '300px' }}
                animate={{
                  left: pos.left,
                  top: pos.top,
                  scale: pos.scale,
                  opacity: pos.opacity,
                  filter: `blur(${pos.blur}px)`,
                  zIndex: pos.z,
                  x: '-50%',
                  y: '-50%',
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <StepCard step={step} lang={lang} isFocused={i === focus} onClick={() => setFocus(i)} />
              </motion.div>
            )
          })}

          {/* Selector de foco */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            {steps.map((_, i) => (
              <button key={i} onClick={() => setFocus(i)}
                className="h-1.5 rounded-full transition-all duration-700"
                style={{
                  width: i === focus ? 24 : 8,
                  background: i === focus ? focusColors[i] : 'rgba(255,255,255,0.12)',
                  boxShadow: i === focus ? `0 0 8px ${focusColors[i]}` : 'none',
                }}
                aria-label={t(`Ir a etapa ${i + 1}`, `Go to step ${i + 1}`)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
