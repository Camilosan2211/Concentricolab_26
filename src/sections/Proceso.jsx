import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Search, PenTool, Boxes } from 'lucide-react'

const steps = [
  {
    Icon: Search,
    color: '#4D66FF',
    es: { title: 'Entendemos', desc: 'Analizamos el producto, espacio o marca — su forma, contexto y cómo se percibe en el mundo real.' },
    en: { title: 'We understand', desc: 'We analyze the product, space or brand — its form, context and how it is perceived in the real world.' },
  },
  {
    Icon: PenTool,
    color: '#FF6D4D',
    es: { title: 'Traducimos', desc: 'Lo convertimos en forma, narrativa y sistema — identidad, piezas digitales o contenido coherente.' },
    en: { title: 'We translate', desc: 'We turn it into form, narrative and system — identity, digital pieces or coherent content.' },
  },
  {
    Icon: Boxes,
    color: '#828AFF',
    es: { title: 'Entregamos', desc: 'Piezas listas para comunicar y posicionar — en los formatos acordados, listas para publicar o producir.' },
    en: { title: 'We deliver', desc: 'Pieces ready to communicate and position — in agreed formats, ready to publish or produce.' },
  },
]

/* ── Nodo con glow ──────────────────────────────────────────────── */
function StepNode({ color, index, inView }) {
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full z-10"
      style={{
        background: color,
        boxShadow: `0 0 12px ${color}, 0 0 24px ${color}44`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? {
        scale: [0, 1.3, 1],
        opacity: 1,
        boxShadow: [
          `0 0 0px ${color}`,
          `0 0 20px ${color}`,
          `0 0 12px ${color}`,
        ],
      } : {}}
      transition={{
        delay: 0.5 + index * 0.3,
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        boxShadow: {
          delay: 0.8 + index * 0.3,
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        },
      }}
    />
  )
}

/* ── Tarjeta de paso — mantiene el estilo actual ────────────────── */
function StepCard({ step, lang, index, inView }) {
  const Icon = step.Icon
  const c    = lang === 'es' ? step.es : step.en

  return (
    <motion.div
      className="relative rounded-card overflow-hidden group border dark:border-white/[0.07] border-black/[0.07] dark:bg-white/[0.03] bg-white/60 backdrop-blur-sm"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }} />

      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-20 group-hover:opacity-50 group-hover:scale-125 transition-all duration-500"
        style={{ background: `radial-gradient(circle, ${step.color}40 0%, transparent 70%)`, filter: 'blur(24px)' }} aria-hidden="true"
      />

      {/* Nodo con glow visible sobre la tarjeta */}
      <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 z-10">
        <StepNode color={step.color} index={index} inView={inView} />
      </div>

      <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center gap-4">
        <span className="font-cal text-[10px] font-bold tracking-[.12em] uppercase" style={{ color: step.color, opacity: .6 }}>
          0{index + 1}
        </span>

        <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `${step.color}18`, border: `1px solid ${step.color}30` }}>
          <Icon size={24} style={{ color: step.color }} strokeWidth={1.75} />
        </div>

        <div className="flex flex-col gap-2 max-w-[260px]">
          <h3 className="font-cal text-xl dark:text-white text-b-dark">{c.title}</h3>
          <p className="dark:text-white/50 text-black/50 text-sm leading-[1.65]">{c.desc}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }} />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SVG — Trayectoria triangular (desktop) / S-path (mobile)
   ═══════════════════════════════════════════════════════════════════ */
function FlowPaths({ inView, isMobile }) {
  const gradId = isMobile ? 'flowGradMob' : 'flowGrad'
  const revId  = isMobile ? 'revGradMob'  : 'revGrad'

  if (isMobile) {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 300 700" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="700" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4D66FF" />
            <stop offset="50%" stopColor="#FF6D4D" />
            <stop offset="100%" stopColor="#828AFF" />
          </linearGradient>
          <linearGradient id={revId} x1="0" y1="700" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#828AFF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FF6D4D" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4D66FF" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Glow base */}
        <path d="M 150 100 Q 270 200 150 310 Q 30 420 150 530 Q 270 310 150 100"
          stroke={`url(#${gradId})`} strokeWidth="6" fill="none" opacity="0.06" strokeLinecap="round" />
        {/* Main path */}
        <motion.path d="M 150 100 Q 270 200 150 310 Q 30 420 150 530 Q 270 310 150 100"
          stroke={`url(#${gradId})`} strokeWidth="2" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} />
        {/* Feedback path — reversa */}
        <motion.path d="M 150 100 Q 30 310 150 530 Q 270 310 150 100"
          stroke={`url(#${revId})`} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="6 8"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }} />
        {/* Flow dashes */}
        <motion.path d="M 150 100 Q 270 200 150 310 Q 30 420 150 530 Q 270 310 150 100"
          stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round"
          strokeDasharray="3 12"
          initial={{ strokeDashoffset: 0 }} animate={inView ? { strokeDashoffset: -30 } : {}}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear', delay: 1.2 }} />
        {/* Reverse dashes */}
        <motion.path d="M 150 100 Q 30 310 150 530 Q 270 310 150 100"
          stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" strokeLinecap="round"
          strokeDasharray="2 10"
          initial={{ strokeDashoffset: 0 }} animate={inView ? { strokeDashoffset: 24 } : {}}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', delay: 1.8 }} />
      </svg>
    )
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1000" y2="500" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4D66FF" />
          <stop offset="40%" stopColor="#FF6D4D" />
          <stop offset="100%" stopColor="#828AFF" />
        </linearGradient>
        <linearGradient id={revId} x1="1000" y1="500" x2="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#828AFF" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#FF6D4D" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4D66FF" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="hubGlow">
          <stop offset="0%" stopColor="#4D66FF" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#FF6D4D" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#828AFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Hub central — pulso en el centro del triángulo */}
      <motion.circle cx="500" cy="250" r="80" fill="url(#hubGlow)"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? {
          opacity: [0, 0.8, 0],
          scale: [0.6, 1.3, 0.6],
        } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
      <motion.circle cx="500" cy="250" r="40" fill="url(#hubGlow)"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={inView ? {
          opacity: [0, 0.5, 0],
          scale: [0.4, 1.6, 0.4],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      />

      {/* Trayectoria principal — triángulo curvo (loop horario) */}
      {/* Card 1 (centro arriba) → Card 2 (izquierda abajo) → Card 3 (derecha abajo) → Card 1 */}
      {/* M 500 80 Q 200 -60 167 280 Q 500 520 833 280 Q 800 -60 500 80 */}
      <path d="M 500 80 Q 200 -60 167 280 Q 500 520 833 280 Q 800 -60 500 80"
        stroke={`url(#${gradId})`} strokeWidth="8" fill="none" opacity="0.05" strokeLinecap="round" />

      <motion.path d="M 500 80 Q 200 -60 167 280 Q 500 520 833 280 Q 800 -60 500 80"
        stroke={`url(#${gradId})`} strokeWidth="2" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} />

      {/* Trayectoria reversa — feedback (antihorario, más sutil) */}
      <motion.path d="M 500 80 Q 800 -60 833 280 Q 500 520 167 280 Q 200 -60 500 80"
        stroke={`url(#${revId})`} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="4 10"
        initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }} />

      {/* Flow dashes — horario */}
      <motion.path d="M 500 80 Q 200 -60 167 280 Q 500 520 833 280 Q 800 -60 500 80"
        stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round"
        strokeDasharray="3 14"
        initial={{ strokeDashoffset: 0 }} animate={inView ? { strokeDashoffset: -34 } : {}}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear', delay: 1.2 }} />

      {/* Flow dashes — antihorario (feedback) */}
      <motion.path d="M 500 80 Q 800 -60 833 280 Q 500 520 167 280 Q 200 -60 500 80"
        stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" strokeLinecap="round"
        strokeDasharray="2 12"
        initial={{ strokeDashoffset: 0 }} animate={inView ? { strokeDashoffset: 28 } : {}}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: 1.8 }} />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Componente principal
   ═══════════════════════════════════════════════════════════════════ */
export default function Proceso({ lang }) {
  const t      = (es, en) => lang === 'es' ? es : en
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="proceso" className="relative z-10 py-16 md:py-20 px-4 overflow-hidden">
      {/* Glow de fondo general */}
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
            {t('Así funciona', 'How it works')}
          </motion.p>
          <motion.h2
            className="font-cal text-3xl md:text-4xl dark:text-white text-b-dark leading-tight"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('Simple como ', 'As simple as ')}
            <span className="text-grad">{t('3 pasos', '3 steps')}</span>
          </motion.h2>
        </div>

        {/* ── Visualización del proceso iterativo ─────────────────── */}
        <div ref={ref} className="relative">

          {/* Desktop: paths triangulares */}
          <FlowPaths inView={inView} isMobile={false} />

          {/* Mobile: paths en S */}
          <FlowPaths inView={inView} isMobile={true} />

          {/* Grid — desktop: triángulo, mobile: apilado */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Spacers para crear el triángulo en desktop */}
            <div className="hidden md:block" />
            <div className="md:-mt-10">
              <StepCard step={steps[0]} lang={lang} index={0} inView={inView} />
            </div>
            <div className="hidden md:block" />

            <div>
              <StepCard step={steps[1]} lang={lang} index={1} inView={inView} />
            </div>
            <div className="hidden md:block" />
            <div>
              <StepCard step={steps[2]} lang={lang} index={2} inView={inView} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
