import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Pen, Zap } from 'lucide-react'

const phases = [
  {
    color: '#4D66FF',
    icon: Search,
    label: { es: 'Diagnóstico', en: 'Diagnosis' },
    title: { es: 'Analizar', en: 'Analyze' },
    output: { es: 'Contexto + forma', en: 'Context + form' },
    badge: { es: 'Diagnóstico estratégico', en: 'Strategic diagnosis' },
    desc: {
      es: 'Analizamos tu producto o marca — su forma, contexto y cómo se percibe, en lo digital y en lo físico.',
      en: 'We analyze your product or brand — its form, context and how it is perceived, digitally and physically.',
    },
  },
  {
    color: '#FF6D4D',
    icon: Pen,
    label: { es: 'Diseño', en: 'Design' },
    title: { es: 'Crear', en: 'Create' },
    output: { es: 'Sistema + narrativa', en: 'System + narrative' },
    badge: { es: 'Diseño de sistema', en: 'System design' },
    desc: {
      es: 'Lo convertimos en forma, narrativa y sistema — identidad, piezas digitales o contenido coherente.',
      en: 'We turn it into form, narrative and system — identity, digital pieces or coherent content.',
    },
  },
  {
    color: '#828AFF',
    icon: Zap,
    label: { es: 'Activación', en: 'Activation' },
    title: { es: 'Lanzar', en: 'Launch' },
    output: { es: 'Producir + publicar', en: 'Produce + publish' },
    badge: { es: 'Activación y entrega', en: 'Activation & delivery' },
    desc: {
      es: 'Piezas listas para comunicar y posicionar — para publicar, implementar o producir.',
      en: 'Pieces ready to communicate and position — to publish, implement or produce.',
    },
  },
]

/* ── Floating background per phase ──────────────────────── */
function FloatingBg({ phase }) {
  switch (phase) {
    case 0: {
      const cl = '#4D66FF'
      return (
        <>
          <svg className="absolute top-6 right-8 w-40 h-40" viewBox="0 0 160 160">
            <motion.g style={{ transformOrigin: '80px 80px' }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <circle cx="80" cy="80" r="30" fill="none" stroke={cl} strokeWidth="0.5" opacity={0.22} />
              <circle cx="80" cy="80" r="50" fill="none" stroke={cl} strokeWidth="0.5" opacity={0.15} />
              <circle cx="80" cy="80" r="70" fill="none" stroke={cl} strokeWidth="0.5" opacity={0.10} />
            </motion.g>
          </svg>
          <svg className="absolute bottom-8 left-8 w-10 h-10" viewBox="0 0 40 40">
            <motion.g style={{ transformOrigin: '20px 20px' }}
              animate={{ rotate: [0, 90] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <line x1="20" y1="0" x2="20" y2="40" stroke={cl} strokeWidth="0.5" opacity={0.22} />
              <line x1="0" y1="20" x2="40" y2="20" stroke={cl} strokeWidth="0.5" opacity={0.22} />
            </motion.g>
          </svg>
          <div className="absolute top-1/2 right-12 -translate-y-1/2 flex flex-col gap-2">
            {[24, 16, 20].map((w, i) => (
              <motion.div key={i}
                className="h-px" style={{ width: w, background: `${cl}44` }}
                animate={{ x: [-4, 4, -4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
              />
            ))}
          </div>
        </>
      )
    }
    case 1: {
      const cl = '#FF6D4D'
      return (
        <>
          <svg className="absolute top-8 left-8 w-16 h-16" viewBox="0 0 60 60">
            <motion.g style={{ transformOrigin: '30px 35px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            >
              <polygon points="30,5 55,55 5,55" fill="none" stroke={cl} strokeWidth="0.5" opacity={0.22} />
            </motion.g>
          </svg>
          <div className="absolute bottom-8 right-8">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <rect x="10" y="10" width="50" height="50" rx="8" fill="none" stroke={cl} strokeWidth="0.5" opacity={0.15} />
              <motion.rect
                x="20" y="20" width="50" height="50" rx="8" fill="none" stroke={cl} strokeWidth="0.5" opacity={0.10}
                animate={{ rotate: [0, 8, 0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '45px 45px' }}
              />
            </svg>
          </div>
          <svg className="absolute top-1/3 right-1/3 w-24 h-24" viewBox="0 0 100 100">
            <motion.path
              d="M10,80 C30,20 60,60 90,10"
              fill="none" stroke={cl} strokeWidth="0.5" opacity={0.18}
              strokeDasharray="200"
              animate={{ strokeDashoffset: [200, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </>
      )
    }
    case 2: {
      const cl = '#828AFF'
      return (
        <>
          <motion.div className="absolute top-10 right-16 w-1 h-1 rounded-full"
            style={{ background: cl }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
          />
          <motion.div className="absolute top-1/2 right-8 w-1 h-1 rounded-full"
            style={{ background: '#41EAFF' }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />
          <motion.div className="absolute bottom-20 left-1/2 w-1 h-1 rounded-full"
            style={{ background: cl }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          />
          <svg className="absolute bottom-8 left-8 w-12 h-12" viewBox="0 0 40 40">
            <motion.g
              animate={{ y: [-6, 0, -6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <polyline points="5,35 15,15 25,25 35,5" fill="none" stroke={cl} strokeWidth="0.5" opacity={0.25} />
            </motion.g>
          </svg>
          <svg className="absolute top-1/3 left-1/4 w-16 h-16" viewBox="0 0 50 50">
            <motion.path
              d="M25,5 A20,20 0 1,1 24.99,5"
              fill="none" stroke="#41EAFF" strokeWidth="0.5" opacity={0.22}
              strokeDasharray="126"
              animate={{ rotate: 360, strokeDashoffset: [126, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '25px 25px' }}
            />
          </svg>
        </>
      )
    }
    default: return null
  }
}

/* ── Mini floating icons per phase ──────────────────────── */
function MiniIcons({ color, Icon }) {
  return (
    <>
      <motion.div
        className="absolute top-[15%] right-[8%] pointer-events-none"
        style={{ color, filter: `drop-shadow(0 0 4px ${color}99)`, opacity: 0.20 }}
        animate={{ y: [-5, 5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon size={14} strokeWidth={1} />
      </motion.div>
      <motion.div
        className="absolute bottom-[20%] left-[12%] pointer-events-none"
        style={{ color, filter: `drop-shadow(0 0 4px ${color}99)`, opacity: 0.14 }}
        animate={{ y: [4, -4], rotate: [-8, 8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon size={14} strokeWidth={1} />
      </motion.div>
      <motion.div
        className="absolute top-[60%] right-[18%] pointer-events-none"
        style={{ color, filter: `drop-shadow(0 0 4px ${color}99)` }}
        animate={{ opacity: [0.10, 0.20, 0.10] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon size={14} strokeWidth={1} />
      </motion.div>
    </>
  )
}

export default function Proceso({ lang }) {
  const t = (es, en) => lang === 'es' ? es : en
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive(p => (p + 1) % 3)
    }, 4000)
  }, [])

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [resetTimer])

  const handleSetPhase = (i) => {
    setActive(i)
    resetTimer()
  }

  const phase = phases[active]
  const IconComponent = phase.icon

  return (
    <section id="proceso" className="relative overflow-hidden py-20 md:py-24">

      <style>{`@keyframes timerFill{from{width:0%}to{width:100%}}`}</style>

      {/* ── Header ──────────────────────────────────────── */}
      <div className="text-center mb-10 px-4">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/30 mb-2">
          {t('Cómo trabajamos', 'How we work')}
        </p>
        <h2 className="font-cal text-[clamp(1.6rem,3.5vw,2.8rem)] text-white leading-tight">
          {t('Un proceso que ', 'A process that ')}
          <span style={{ color: '#FF6D4D' }}>{t('itera', 'iterates')}</span>
        </h2>
      </div>

      {/* ── Panel content ───────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto px-6">

        <div className="relative">

          {/* ── Floating layer (desktop only) ────────────── */}
          <div className="hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0 pointer-events-none z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, exit: { duration: 0.3 } }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%, ${phase.color} 0%, transparent 70%)`,
                    filter: 'blur(90px)',
                    opacity: 0.28,
                  }}
                />
                <FloatingBg phase={active} />
                <MiniIcons color={phase.color} Icon={IconComponent} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Content layer ───────────────────────────── */}
          <div className="relative z-10">

            {/* ── Desktop grid ──────────────────────────── */}
            <div className="hidden md:grid grid-cols-[180px_1fr_200px] min-h-[360px]">

              {/* Left column — phase list */}
              <div className="flex flex-col gap-6 self-center">
                {phases.map((p, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => handleSetPhase(i)}
                    animate={{ opacity: i === active ? 1 : 0.3, x: i === active ? 6 : 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    <span
                      className="text-[12px] font-inter tabular-nums transition-all duration-300"
                      style={{
                        color: i === active ? p.color : '#ffffff',
                        fontWeight: i === active ? 700 : 400,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="text-[12px] font-inter transition-all duration-300"
                      style={{
                        color: '#ffffff',
                        fontWeight: i === active ? 700 : 400,
                      }}
                    >
                      {t(p.label.es, p.label.en)}
                    </span>
                    {i === active && (
                      <motion.div
                        className="w-1 h-1 rounded-full"
                        style={{
                          background: p.color,
                          boxShadow: `0 0 6px ${p.color}`,
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Center column — icon + text side by side */}
              <div className="flex items-center gap-8 md:gap-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="flex items-center gap-8 md:gap-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className="flex-shrink-0 flex items-center justify-center"
                      style={{
                        width: 88,
                        height: 88,
                        borderRadius: 20,
                        background: `${phase.color}1A`,
                        border: `1px solid ${phase.color}4D`,
                        boxShadow: `0 0 0 1px ${phase.color}33, 0 0 20px ${phase.color}59, 0 0 60px ${phase.color}27`,
                      }}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <IconComponent
                        size={44}
                        strokeWidth={1.25}
                        style={{
                          color: phase.color,
                          filter: `drop-shadow(0 0 8px ${phase.color}CC)`,
                        }}
                      />
                    </motion.div>

                    {/* Title + description */}
                    <div>
                      <h3
                        className="font-cal text-[clamp(2rem,4.5vw,3.2rem)] text-white/[0.95] leading-[0.9]"
                      >
                        {t(phase.title.es, phase.title.en)}
                      </h3>
                      <p
                        className="text-[13.5px] leading-[1.7] max-w-[380px] font-inter"
                        style={{ color: 'rgba(245,245,240,0.52)', marginTop: 8 }}
                      >
                        {t(phase.desc.es, phase.desc.en)}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right column — output */}
              <div className="flex flex-col items-start self-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ x: 16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut', delay: 0.08 }}
                  >
                    <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-inter">
                      Output
                    </p>
                    <p className="text-[14px] font-semibold text-white/80 font-inter" style={{ marginTop: 10 }}>
                      {t(phase.output.es, phase.output.en)}
                    </p>
                    <div
                      className="inline-flex items-center px-[14px] py-[6px] rounded-full text-[11px] font-medium font-inter"
                      style={{
                        marginTop: 10,
                        background: `${phase.color}1A`,
                        border: `1px solid ${phase.color}40`,
                        color: phase.color,
                      }}
                    >
                      {t(phase.badge.es, phase.badge.en)}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* ── Mobile layout ─────────────────────────── */}
            <div className="md:hidden flex flex-col gap-8">

              <div className="flex flex-col gap-5">
                {phases.map((p, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => handleSetPhase(i)}
                    animate={{ opacity: i === active ? 1 : 0.3, x: i === active ? 6 : 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    <span
                      className="text-[12px] font-inter tabular-nums"
                      style={{
                        color: i === active ? p.color : '#ffffff',
                        fontWeight: i === active ? 700 : 400,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="text-[12px] font-inter"
                      style={{
                        color: '#ffffff',
                        fontWeight: i === active ? 700 : 400,
                      }}
                    >
                      {t(p.label.es, p.label.en)}
                    </span>
                    {i === active && (
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{
                          background: p.color,
                          boxShadow: `0 0 6px ${p.color}`,
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col items-center text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 20,
                        background: `${phase.color}1A`,
                        border: `1px solid ${phase.color}4D`,
                      }}
                    >
                      <IconComponent size={40} strokeWidth={1.25} style={{ color: phase.color }} />
                    </div>
                    <h3
                      className="font-cal text-[clamp(1.8rem,8vw,2.6rem)] text-white/[0.95] leading-[0.9]"
                      style={{ marginTop: 16 }}
                    >
                      {t(phase.title.es, phase.title.en)}
                    </h3>
                    <p
                      className="text-[13px] leading-[1.6] max-w-[320px] mx-auto"
                      style={{ color: 'rgba(245,245,240,0.55)', marginTop: 10 }}
                    >
                      {t(phase.desc.es, phase.desc.en)}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-inter">
                      Output
                    </p>
                    <p className="text-[14px] font-semibold text-white/80 font-inter" style={{ marginTop: 8 }}>
                      {t(phase.output.es, phase.output.en)}
                    </p>
                    <div
                      className="inline-flex items-center px-[12px] py-[5px] rounded-full text-[11px] font-medium font-inter"
                      style={{
                        marginTop: 8,
                        background: `${phase.color}1A`,
                        border: `1px solid ${phase.color}40`,
                        color: phase.color,
                      }}
                    >
                      {t(phase.badge.es, phase.badge.en)}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>

        {/* ── Timer bar ───────────────────────────────────── */}
        <div className="mt-4 h-[2px] w-full bg-white/8 rounded-full overflow-hidden">
          <div
            key={active}
            className="h-full rounded-full"
            style={{
              background: phase.color,
              animation: 'timerFill 4s linear forwards',
            }}
          />
        </div>

        {/* ── Dots ──────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {phases.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSetPhase(i)}
              className="transition-all duration-400 ease-in-out"
              style={{
                width: i === active ? 18 : 6,
                height: 6,
                borderRadius: i === active ? 3 : '50%',
                background: i === active ? p.color : 'rgba(255,255,255,0.15)',
                boxShadow: i === active ? `0 0 8px ${p.color}99` : 'none',
                transition: 'all 0.4s ease',
              }}
              aria-label={t(`Fase ${i + 1}`, `Phase ${i + 1}`)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
