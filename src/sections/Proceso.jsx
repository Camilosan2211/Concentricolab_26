import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { Search, Pen, Zap } from 'lucide-react'

const steps = [
  {
    Icon: Search, color: '#4D66FF',
    es: { title: 'Diagnóstico', desc: 'Analizamos tu producto o marca — su forma, contexto y cómo se percibe, en lo digital y en lo físico.' },
    en: { title: 'Diagnosis', desc: 'We analyze your product or brand — its shape, context and how it\'s perceived, digitally and physically.' },
  },
  {
    Icon: Pen, color: '#FF6D4D',
    es: { title: 'Diseño', desc: 'Lo convertimos en forma, narrativa y sistema — identidad, piezas digitales o contenido coherente.' },
    en: { title: 'Design', desc: 'We turn it into form, narrative and system — identity, digital pieces or coherent content.' },
  },
  {
    Icon: Zap, color: '#828AFF',
    es: { title: 'Activación', desc: 'Piezas listas para comunicar y posicionar — para publicar, implementar o producir.' },
    en: { title: 'Activation', desc: 'Pieces ready to communicate and position — to publish, implement or produce.' },
  },
]

/* ── useMediaQuery ─────────────────────────────────────────────── */
function useMediaQuery(q) {
  const [m, setM] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(q)
    setM(mql.matches)
    const h = (e) => setM(e.matches)
    mql.addEventListener('change', h)
    return () => mql.removeEventListener('change', h)
  }, [q])
  return m
}

/* ── SVG línea conectora + partícula ──────────────────────────── */
function TimelineLine({ inView, isMobile }) {
  const [forwardDrawn, setForwardDrawn] = useState(false)

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setForwardDrawn(true), 900)
      return () => clearTimeout(t)
    }
  }, [inView])

  if (isMobile) {
    return (
      <svg className="absolute left-[18px] top-0 h-full w-[40px] pointer-events-none z-0"
        viewBox="0 0 40 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="lineGradMob" x1="0" y1="0" x2="0" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4D66FF" />
            <stop offset="50%" stopColor="#FF6D4D" />
            <stop offset="100%" stopColor="#828AFF" />
          </linearGradient>
        </defs>
        <motion.path d="M 20 30 L 20 150 L 20 270"
          stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
        <path d="M 20 30 L 20 150 L 20 270 Q 30 150 20 30"
          stroke="url(#lineGradMob)" strokeWidth="1" fill="none" opacity="0.15" strokeLinecap="round"
        />
        {forwardDrawn && (
          <>
            <circle r="3" fill="#4D66FF">
              <animateMotion dur="7.5s" repeatCount="indefinite" path="M 20 30 L 20 150 L 20 270 Q 30 150 20 30" />
            </circle>
            <circle r="1.5" fill="#FF6D4D" opacity="0.6">
              <animateMotion dur="7.5s" repeatCount="indefinite" path="M 20 30 L 20 150 L 20 270 Q 30 150 20 30" begin="-1.5s" />
            </circle>
          </>
        )}
      </svg>
    )
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 1000 100" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4D66FF" />
          <stop offset="40%" stopColor="#41EAFF" />
          <stop offset="100%" stopColor="#FF6D4D" />
        </linearGradient>
      </defs>
      <motion.path d="M 165 50 L 500 50 L 835 50"
        stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
      <path d="M 165 50 L 500 50 L 835 50 Q 500 80 165 50"
        stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" opacity="0.12" strokeLinecap="round"
      />
      {forwardDrawn && (
        <>
          <circle r="4" fill="#4D66FF" filter="url(#particleGlow)">
            <animateMotion dur="7.5s" repeatCount="indefinite" path="M 165 50 L 500 50 L 835 50 Q 500 80 165 50" />
          </circle>
          <circle r="2" fill="#FF6D4D" opacity="0.5">
            <animateMotion dur="7.5s" repeatCount="indefinite" path="M 165 50 L 500 50 L 835 50 Q 500 80 165 50" begin="-1.2s" />
          </circle>
        </>
      )}
      <defs>
        <filter id="particleGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
    </svg>
  )
}

/* ── Indicador de paso individual ──────────────────────────────── */
function StepDot({ step, index, isActive, lang, onClick, entryDelay }) {
  const Icon = step.Icon
  const c    = lang === 'es' ? step.es : step.en

  return (
    <motion.button
      onClick={() => onClick(index)}
      className="relative flex flex-col items-center gap-2 md:gap-3 group cursor-pointer outline-none"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: entryDelay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="font-cal text-[11px] font-bold tracking-[0.15em] transition-all duration-500"
        style={{ color: step.color, opacity: isActive ? 0.7 : 0.3 }}>
        0{index + 1}
      </span>

      <div className="relative flex items-center justify-center transition-all duration-500"
        style={{
          width: isActive ? 56 : 42,
          height: isActive ? 56 : 42,
        }}>
        {isActive && (
          <motion.div className="absolute inset-0 rounded-xl"
            style={{ background: `radial-gradient(circle, ${step.color}25 0%, transparent 70%)` }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.8, 0.4], scale: [0.6, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <div className="relative rounded-xl flex items-center justify-center transition-all duration-500"
          style={{
            width: isActive ? 56 : 42,
            height: isActive ? 56 : 42,
            background: `${step.color}12`,
            border: `1px solid ${step.color}25`,
            boxShadow: isActive ? `0 0 20px ${step.color}22` : 'none',
          }}>
          <Icon size={isActive ? 22 : 17} style={{ color: step.color }} strokeWidth={1.75} />
        </div>
      </div>

      <span className="font-cal text-sm md:text-base dark:text-white text-b-dark transition-all duration-500"
        style={{ opacity: isActive ? 1 : 0.5 }}>
        {c.title}
      </span>
    </motion.button>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Componente principal
   ═══════════════════════════════════════════════════════════════════ */
export default function Proceso({ lang }) {
  const t        = (es, en) => lang === 'es' ? es : en
  const isMobile = useMediaQuery('(max-width: 767px)')
  const ref      = useRef(null)
  const inView   = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setActive(i => (i + 1) % 3), 2500)
    return () => clearInterval(id)
  }, [inView])

  const step         = steps[active]
  const c            = lang === 'es' ? step.es : step.en
  const Icon         = step.Icon
  const focusColors  = ['#4D66FF', '#FF6D4D', '#828AFF']
  const entryDelays  = [0.15, 0.3, 0.45]

  return (
    <section id="proceso" className="relative z-10 py-14 md:py-16 px-4 overflow-hidden">
      {/* Fondo atmosférico */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(77,102,255,.05) 0%, transparent 70%)', filter: 'blur(60px)' }} aria-hidden="true"
      />
      <div className="absolute bottom-0 right-0 w-[400px] h-[200px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,109,77,.03) 0%, transparent 70%)', filter: 'blur(50px)' }} aria-hidden="true"
      />

      <div ref={ref} className="max-w-[900px] lg:max-w-[1000px] mx-auto flex flex-col gap-8 md:gap-10">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className={`text-center flex flex-col gap-1 ${isMobile ? '' : 'max-w-lg mx-auto'}`}>
          <motion.p className="text-[11px] font-bold tracking-[0.12em] uppercase dark:text-white/30 text-black/35"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {t('Cómo trabajamos', 'How we work')}
          </motion.p>
          <motion.h2 className="font-cal text-2xl md:text-3xl dark:text-white text-b-dark leading-tight"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}>
            {t('Un proceso que ', 'A process that ')}
            <span className="text-grad">{t('itera', 'iterates')}</span>
          </motion.h2>
          <motion.p className="text-xs md:text-sm dark:text-white/40 text-black/40"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            {t('Diagnóstico, diseño y activación — en ciclo constante.', 'Diagnosis, design and activation — in constant cycle.')}
          </motion.p>
        </div>

        {/* ── Timeline ──────────────────────────────────────────── */}
        <div className={`relative ${isMobile ? 'pl-[50px] flex flex-col gap-6' : 'pt-2'}`}>
          {!isMobile && <TimelineLine inView={inView} isMobile={false} />}

          {/* Desktop: grid row */}
          {!isMobile && (
            <div className="relative grid grid-cols-3 gap-4 z-10">
              {steps.map((s, i) => (
                <StepDot key={i} step={s} index={i} isActive={i === active} lang={lang}
                  onClick={setActive} entryDelay={entryDelays[i]} />
              ))}
            </div>
          )}

          {/* Mobile: vertical stacked */}
          {isMobile && (
            <div className="relative z-10 flex flex-col gap-6">
              <TimelineLine inView={inView} isMobile={true} />
              {steps.map((s, i) => (
                <StepDot key={i} step={s} index={i} isActive={i === active} lang={lang}
                  onClick={setActive} entryDelay={entryDelays[i]} />
              ))}
            </div>
          )}

          {/* ── Card de detalle ─────────────────────────────────── */}
          <div className={`${isMobile ? 'mt-2' : 'mt-8 md:mt-10'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="rounded-card overflow-hidden border dark:border-white/[0.07] border-black/[0.07] dark:bg-white/[0.04] bg-white/70 backdrop-blur-md shadow-[0_4px_20px_-6px_rgba(0,0,0,0.08)] max-w-lg mx-auto"
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="h-[3px] w-full" style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }} />
                <div className="p-5 md:p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}20` }}>
                    <Icon size={18} style={{ color: step.color }} strokeWidth={1.75} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="font-cal text-base md:text-lg dark:text-white text-b-dark">{c.title}</h4>
                    <p className="text-xs md:text-sm dark:text-white/60 text-black/60 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center items-center gap-3 mt-6 md:mt-8 z-10 relative">
            {steps.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all duration-700"
                style={{
                  width: i === active ? 24 : 8,
                  background: i === active ? focusColors[i] : 'rgba(255,255,255,0.12)',
                  boxShadow: i === active ? `0 0 8px ${focusColors[i]}` : 'none',
                }}
                aria-label={t(`Ir a paso ${i + 1}`, `Go to step ${i + 1}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
