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

/* ── Tarjeta de etapa ──────────────────────────────────────────── */
function StepCard({ step, lang, isFocused, onClick, compact }) {
  const Icon = step.Icon
  const c    = lang === 'es' ? step.es : step.en

  return (
    <div
      onClick={onClick}
      className={`relative rounded-card overflow-hidden group border cursor-pointer w-full transition-all duration-500 ease-out ${
        isFocused
          ? 'dark:bg-white/[0.08] bg-white/85 backdrop-blur-xl dark:border-white/[0.15] border-white/30 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.12)]'
          : 'dark:bg-white/[0.04] bg-white/70 backdrop-blur dark:border-white/[0.07] border-black/[0.07]'
      }`}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }} />

      {/* Glow circle */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-20 group-hover:opacity-50 transition-all duration-500"
        style={{ background: `radial-gradient(circle, ${step.color}40 0%, transparent 70%)`, filter: 'blur(24px)' }} aria-hidden="true"
      />

      {/* Inner depth layers (focused only) */}
      {isFocused && (
        <>
          <div className="absolute inset-0 rounded-card pointer-events-none opacity-[0.10]"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.18) 0%, transparent 70%)',
            }} aria-hidden="true"
          />
          <div className="absolute top-0 left-[12%] right-[12%] h-[1px] pointer-events-none z-20"
            style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.20), transparent)' }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center text-center gap-3 ${
        compact ? 'p-4 md:p-5' : 'py-5 md:py-7 px-5 md:px-8'
      }`}>
        <span className="font-cal text-[10px] font-bold tracking-[.12em] uppercase transition-all duration-500" style={{ color: step.color, opacity: isFocused ? 0.75 : 0.5 }}>
          {isFocused
            ? (lang === 'es' ? 'En foco' : 'In focus')
            : (lang === 'es' ? 'En órbita' : 'In orbit')}
        </span>

        <div className={`rounded-xl flex items-center justify-center transition-all duration-500 ${
          compact ? 'w-10 h-10 md:w-11 md:h-11' : 'w-12 h-12 md:w-14 md:h-14'
        }`}
          style={{
            background: `${step.color}18`,
            border: `1px solid ${step.color}30`,
            boxShadow: isFocused ? `0 0 24px ${step.color}33` : 'none',
          }}>
          <Icon size={compact ? 16 : 20} style={{ color: step.color }} strokeWidth={1.75} />
        </div>

        <div className="flex flex-col gap-1.5 max-w-[230px]">
          <h3 className={`font-cal dark:text-white text-b-dark ${compact ? 'text-base md:text-lg' : 'text-lg md:text-xl'}`}>{c.title}</h3>
          <p className={`dark:text-white/55 text-black/55 leading-[1.6] ${compact ? 'text-[11px] md:text-xs' : 'text-xs md:text-sm'}`}>{c.desc}</p>
        </div>
      </div>

      {/* Bottom hover line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }} />
    </div>
  )
}

/* ── SVG de órbita — glow trail atmosférico + partículas + spark ─ */
function OrbitSVG({ inView, isMobile, frontArc, backArc, sparkPath, particles }) {
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
          <stop offset="45%" stopColor="#FF6D4D" />
          <stop offset="100%" stopColor="#828AFF" />
        </linearGradient>
        <radialGradient id="centerGlow">
          <stop offset="0%" stopColor="#4D66FF" stopOpacity="0.08" />
          <stop offset="50%" stopColor="#FF6D4D" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#828AFF" stopOpacity="0" />
        </radialGradient>
        <filter id="glowOuter" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        <filter id="glowMid" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="glowInner" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* Center hub glow */}
      <motion.circle
        cx={isMobile ? 200 : 600}
        cy={isMobile ? 250 : 225}
        r={isMobile ? 50 : 80}
        fill="url(#centerGlow)"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: [0, 0.5, 0], scale: [0.6, 1.4, 0.6] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Back arc — lejano, tenue */}
      <path d={backArc} stroke={`url(#${gradId})`} strokeWidth="22" fill="none"
        opacity="0.015" filter="url(#glowOuter)" strokeLinecap="round" />
      <path d={backArc} stroke={`url(#${gradId})`} strokeWidth="8" fill="none"
        opacity="0.025" filter="url(#glowMid)" strokeLinecap="round" />

      {/* Front arc — cercano, más presente */}
      <path d={frontArc} stroke={`url(#${gradId})`} strokeWidth="44" fill="none"
        opacity="0.025" filter="url(#glowOuter)" strokeLinecap="round" />
      <path d={frontArc} stroke={`url(#${gradId})`} strokeWidth="22" fill="none"
        opacity="0.035" filter="url(#glowMid)" strokeLinecap="round" />
      <path d={frontArc} stroke={`url(#${gradId})`} strokeWidth="8" fill="none"
        opacity="0.045" filter="url(#glowInner)" strokeLinecap="round" />

      {/* Floating particles */}
      {inView && particles.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x} cy={p.y} r={p.r}
          fill={p.color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.06, 0.4, 0.06],
            scale: [0.5, 1.15, 0.5],
            cy: [p.y, p.y - p.floatY, p.y],
            cx: [p.x, p.x + p.floatX, p.x],
          }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      {/* Hex spark */}
      {inView && (
        <g>
          <polygon points="0,-4 3.46,-2 3.46,2 0,4 -3.46,2 -3.46,-2" fill="#4D66FF">
            <animateMotion dur={isMobile ? '8s' : '7s'} repeatCount="indefinite" path={sparkPath} />
          </polygon>
          <polygon points="0,-2.2 1.9,-1.1 1.9,1.1 0,2.2 -1.9,1.1 -1.9,-1.1" fill="#FF6D4D" opacity="0.5">
            <animateMotion dur={isMobile ? '8s' : '7s'} repeatCount="indefinite" path={sparkPath} begin={isMobile ? '-1.5s' : '-1.2s'} />
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
      { left: '50%', top: '54%', scale: 1.12, opacity: 1.0,  blur: 0,  z: 30, rotateX: 0,  width: '84%' },
      { left: '28%', top: '22%', scale: 0.72, opacity: 0.78, blur: 1.5, z: 10, rotateX: 5,  width: '64%' },
      { left: '72%', top: '84%', scale: 0.72, opacity: 0.78, blur: 1.5, z: 10, rotateX: -5, width: '64%' },
    ]
  }
  return [
    { left: '50%', top: '55%', scale: 1.18,   opacity: 1.0,  blur: 0,  z: 30, rotateX: 0,  width: '360px' },
    { left: '22%', top: '28%', scale: 0.78,   opacity: 0.82, blur: 1.5, z: 10, rotateX: 7,  width: '260px' },
    { left: '78%', top: '28%', scale: 0.78,   opacity: 0.82, blur: 1.5, z: 10, rotateX: 7,  width: '260px' },
  ]
}

/* ── Partículas ───────────────────────────────────────────────── */
const desktopParticles = [
  { x: 580,  y: 380, r: 2.5, color: '#4D66FF', dur: 4.5, floatY: 7,  floatX: 3,  delay: 0   },
  { x: 800,  y: 310, r: 2,   color: '#FF6D4D', dur: 3.8, floatY: 5,  floatX: 4,  delay: 0.4 },
  { x: 930,  y: 225, r: 1.8, color: '#828AFF', dur: 5.2, floatY: 4,  floatX: -3, delay: 0.8 },
  { x: 800,  y: 140, r: 1.8, color: '#41EAFF', dur: 4,   floatY: -5, floatX: 3,  delay: 1.2 },
  { x: 600,  y: 90,  r: 2.2, color: '#4D66FF', dur: 4.8, floatY: 4,  floatX: -2, delay: 0.3 },
  { x: 400,  y: 140, r: 1.8, color: '#FF6D4D', dur: 3.6, floatY: -4, floatX: -3, delay: 0.9 },
  { x: 270,  y: 225, r: 2,   color: '#828AFF', dur: 4.3, floatY: 5,  floatX: 2,  delay: 1.5 },
  { x: 400,  y: 310, r: 2.2, color: '#41EAFF', dur: 5,   floatY: 6,  floatX: -4, delay: 0.6 },
  { x: 600,  y: 225, r: 1.2, color: '#4D66FF', dur: 3.5, floatY: 8,  floatX: 5,  delay: 2   },
  { x: 730,  y: 225, r: 1.5, color: '#FF6D4D', dur: 4.2, floatY: -6, floatX: 4,  delay: 1.8 },
  { x: 480,  y: 225, r: 1.2, color: '#828AFF', dur: 4.6, floatY: 5,  floatX: -3, delay: 0.2 },
  { x: 150,  y: 225, r: 1.2, color: '#41EAFF', dur: 3.9, floatY: -4, floatX: 2,  delay: 1.4 },
]

const mobileParticles = [
  { x: 200, y: 300, r: 2,   color: '#4D66FF', dur: 4,   floatY: 5,  floatX: 3,  delay: 0   },
  { x: 280, y: 350, r: 1.8, color: '#FF6D4D', dur: 3.5, floatY: 4,  floatX: -3, delay: 0.5 },
  { x: 320, y: 250, r: 1.5, color: '#828AFF', dur: 4.5, floatY: -3, floatX: 2,  delay: 1   },
  { x: 280, y: 150, r: 1.2, color: '#41EAFF', dur: 5,   floatY: 3,  floatX: 2,  delay: 1.4 },
  { x: 200, y: 100, r: 1.8, color: '#4D66FF', dur: 3.8, floatY: -4, floatX: -2, delay: 0.3 },
  { x: 120, y: 150, r: 1.5, color: '#FF6D4D', dur: 4.2, floatY: 3,  floatX: -3, delay: 0.8 },
  { x: 80,  y: 250, r: 1.2, color: '#828AFF', dur: 4.7, floatY: -3, floatX: 2,  delay: 1.6 },
  { x: 120, y: 350, r: 1.8, color: '#41EAFF', dur: 3.6, floatY: 4,  floatX: 2,  delay: 0.2 },
  { x: 200, y: 210, r: 1,   color: '#4D66FF', dur: 5.2, floatY: 6,  floatX: -4, delay: 2.2 },
]

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
  const particles = isMobile ? mobileParticles : desktopParticles

  /* Elipse en perspectiva */
  const desktopFrontArc = 'M 230 225 A 370 160 0 0 0 970 225'
  const desktopBackArc  = 'M 970 225 A 370 160 0 0 0 230 225'
  const desktopSpark    = 'M 230 225 A 370 160 0 0 0 970 225 A 370 160 0 0 0 230 225'

  const mobileFrontArc = 'M 80 250 A 120 180 0 0 0 320 250'
  const mobileBackArc  = 'M 320 250 A 120 180 0 0 0 80 250'
  const mobileSpark    = 'M 80 250 A 120 180 0 0 0 320 250 A 120 180 0 0 0 80 250'

  const frontArc  = isMobile ? mobileFrontArc : desktopFrontArc
  const backArc   = isMobile ? mobileBackArc  : desktopBackArc
  const sparkPath = isMobile ? mobileSpark    : desktopSpark

  /* Rotación de foco */
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setFocus(i => (i + 1) % 3), 5000)
    return () => clearInterval(id)
  }, [inView])

  const focusColors = ['#4D66FF', '#FF6D4D', '#828AFF']

  return (
    <section id="proceso" className="relative z-10 py-16 md:py-20 px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(ellipse, rgba(77,102,255,.06) 0%, transparent 70%)', filter: 'blur(60px)' }} aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto flex flex-col gap-10">

        {/* Header */}
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

        {/* Órbita */}
        <div ref={ref} className="relative w-full h-[500px] md:h-[520px]">
          <OrbitSVG
            inView={inView}
            isMobile={isMobile}
            frontArc={frontArc}
            backArc={backArc}
            sparkPath={sparkPath}
            particles={particles}
          />

          {steps.map((step, i) => {
            const offset = (focus - i + 3) % 3
            const pos = positions[offset]

            return (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  left: pos.left,
                  top: pos.top,
                  scale: pos.scale,
                  width: pos.width,
                  opacity: pos.opacity,
                  filter: `blur(${pos.blur}px)`,
                  zIndex: pos.z,
                  x: '-50%',
                  y: '-50%',
                  rotateX: pos.rotateX,
                  transformPerspective: 900,
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <StepCard step={step} lang={lang} isFocused={i === focus} onClick={() => setFocus(i)} compact={offset !== 0} />
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
