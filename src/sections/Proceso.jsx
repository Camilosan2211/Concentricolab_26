import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { Search, Pen, Zap } from 'lucide-react'

const phases = [
  {
    Icon: Search, color: '#4D66FF',
    es: { leftLabel: 'Diagnóstico', title: 'Analizar',  output: 'Contexto + forma',  desc: 'Analizamos tu producto o marca — su forma, contexto y cómo se percibe, en lo digital y en lo físico.' },
    en: { leftLabel: 'Diagnosis',  title: 'Analyze',   output: 'Context + form',    desc: 'We analyze your product or brand — its shape, context and how it\'s perceived, digitally and physically.' },
  },
  {
    Icon: Pen, color: '#FF6D4D',
    es: { leftLabel: 'Diseño',     title: 'Crear',     output: 'Sistema + narrativa', desc: 'Lo convertimos en forma, narrativa y sistema — identidad, piezas digitales o contenido coherente.' },
    en: { leftLabel: 'Design',     title: 'Create',    output: 'System + narrative',  desc: 'We turn it into form, narrative and system — identity, digital pieces or coherent content.' },
  },
  {
    Icon: Zap, color: '#828AFF',
    es: { leftLabel: 'Activación', title: 'Lanzar',    output: 'Producir + publicar', desc: 'Piezas listas para comunicar y posicionar — para publicar, implementar o producir.' },
    en: { leftLabel: 'Activation', title: 'Launch',    output: 'Produce + publish',   desc: 'Pieces ready to communicate and position — to publish, implement or produce.' },
  },
]

export default function Proceso({ lang }) {
  const t           = (es, en) => lang === 'es' ? es : en
  const wrapperRef  = useRef(null)
  const sectionRef  = useRef(null)
  const progressRef = useRef(null)
  const activeRef   = useRef(0)
  const [active, setActive] = useState(0)

  const sectionInView = useInView(sectionRef, { once: true, margin: '-100px' })

  /* ── Lenis scroll listener ─────────────────────────────────── */
  useEffect(() => {
    const lenis = window.__lenis
    if (!lenis || !wrapperRef.current) return

    const update = () => {
      const el = wrapperRef.current
      if (!el) return

      const top        = el.getBoundingClientRect().top
      const height     = el.offsetHeight
      const vh         = window.innerHeight
      const scrollable = height - vh
      if (scrollable <= 0) return

      const p = Math.max(0, Math.min(1, (-top) / scrollable))

      if (progressRef.current) {
        progressRef.current.style.width = `${p * 100}%`
      }

      const i = Math.min(Math.floor(p * 3), 2)
      if (i !== activeRef.current) {
        activeRef.current = i
        setActive(i)
      }
    }

    lenis.on('scroll', update)
    update()

    return () => lenis.off('scroll', update)
  }, [])

  const scrollToPhase = (index) => {
    const lenis = window.__lenis
    if (!lenis || !wrapperRef.current) return

    const el     = wrapperRef.current
    const target = el.offsetTop + (index / 3) * (el.offsetHeight - window.innerHeight)

    lenis.scrollTo(target, { duration: 1.2 })
  }

  const current = phases[active]

  return (
    <section id="proceso" ref={sectionRef}>

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="text-center pb-[3vh] pt-16 md:pt-20 px-4">
        <motion.p
          className="text-[11px] font-bold tracking-[0.12em] uppercase dark:text-white/30 text-black/35 mb-2"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          {t('Cómo trabajamos', 'How we work')}
        </motion.p>
        <motion.h2
          className="font-cal text-[clamp(1.6rem,4vw,3rem)] dark:text-white text-b-dark leading-tight"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('Un proceso que ', 'A process that ')}
          <span style={{ color: '#FF6D4D' }}>{t('itera', 'iterates')}</span>
        </motion.h2>
      </div>

      {/* ── Desktop — sticky scroll panel ────────────────────── */}
      <div ref={wrapperRef} className="relative h-[240vh] hidden md:block">
        <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#00031F' }}>

          {/* Background glows */}
          {phases.map((p, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 50%, ${p.color} 0%, transparent 70%)`,
                filter: 'blur(90px)',
              }}
              animate={{ opacity: i === active ? 0.18 : 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
          ))}

          {/* Step number — top right */}
          <div className="absolute top-8 right-8 z-10">
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                className="text-[11px] tracking-[0.12em] dark:text-white/40 text-white/40 font-mono block"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 0.6 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {String(active + 1).padStart(2, '0')} / 03
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Three columns */}
          <div className="relative z-10 flex items-center h-full px-8 lg:px-16">

            {/* ── Left column (25%) ─────────────────────────── */}
            <div className="w-[25%] flex flex-col gap-6">
              {phases.map((p, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => scrollToPhase(i)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{
                    opacity: i === active ? 1 : 0.28,
                    x: i === active ? 8 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: sectionInView ? i * 0.08 : 0 }}
                >
                  <span
                    className="font-cal text-xl md:text-2xl tabular-nums transition-all duration-500"
                    style={{ color: p.color, opacity: i === active ? 0.8 : 0.35 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-cal text-base md:text-lg dark:text-white text-white">
                    {t(p.es.leftLabel, p.en.leftLabel)}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-500"
                    style={{
                      background: i === active ? p.color : 'transparent',
                      boxShadow: i === active ? `0 0 8px ${p.color}` : 'none',
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* ── Center column (50%) ───────────────────────── */}
            <div className="w-[50%] flex flex-col justify-center px-6 lg:px-12">
              <div className="relative min-h-[280px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ y: '60%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-60%', opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3
                      className="font-cal text-[clamp(3rem,9vw,8rem)] leading-[0.9] dark:text-white text-white mb-5"
                      style={{ color: 'rgba(245,245,240,0.92)' }}
                    >
                      {t(current.es.title, current.en.title)}
                    </h3>
                    <motion.p
                      className="text-sm md:text-base max-w-md leading-relaxed"
                      style={{ color: 'rgba(245,245,240,0.55)' }}
                      initial={{ y: '60%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                    >
                      {t(current.es.desc, current.en.desc)}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ── Right column (25%) ────────────────────────── */}
            <div className="w-[25%] flex flex-col justify-center">
              <div className="relative min-h-[80px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ y: '60%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-60%', opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="font-cal text-lg" style={{ color: 'rgba(245,245,240,0.65)' }}>
                      {t(current.es.output, current.en.output)}
                    </span>
                    <div
                      className="mt-4 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${current.color}15`, border: `1px solid ${current.color}25` }}
                    >
                      <current.Icon size={18} style={{ color: current.color }} strokeWidth={1.75} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* ── Progress bar ──────────────────────────────── */}
          <div
            ref={progressRef}
            className="absolute bottom-0 left-0 h-[2px] z-10 pointer-events-none"
            style={{
              width: '0%',
              background: 'linear-gradient(to right, #4D66FF, #FF6D4D)',
            }}
          />

          {/* ── Dots ──────────────────────────────────────── */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
            {phases.map((p, i) => (
              <button
                key={i}
                onClick={() => scrollToPhase(i)}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: i === active ? 20 : 6,
                  background: i === active ? p.color : 'rgba(255,255,255,0.12)',
                  boxShadow: i === active ? `0 0 8px ${p.color}` : 'none',
                }}
                aria-label={t(`Ir a fase ${i + 1}`, `Go to phase ${i + 1}`)}
              />
            ))}
          </div>

        </div>
      </div>

      {/* ── Mobile — cards en scroll normal ────────────────── */}
      <div className="md:hidden">
        {phases.map((p, i) => (
          <MobilePhase key={i} phase={p} index={i} lang={lang} />
        ))}
        <div className="flex justify-center items-center gap-3 pb-12">
          {phases.map((p, i) => (
            <button
              key={i}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: i === active ? 20 : 6,
                background: i === active ? p.color : 'rgba(255,255,255,0.12)',
              }}
            />
          ))}
        </div>
      </div>

    </section>
  )
}

/* ── Mobile phase card ───────────────────────────────────────── */
function MobilePhase({ phase, index, lang }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const t      = (es, en) => lang === 'es' ? es : en
  const Icon   = phase.Icon

  return (
    <div className="relative px-4 py-16 overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${phase.color} 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
        animate={{ opacity: inView ? 0.15 : 0 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        ref={ref}
        className="relative z-10 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-cal text-sm" style={{ color: phase.color }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-cal text-lg dark:text-white text-white mt-1">
          {t(phase.es.leftLabel, phase.en.leftLabel)}
        </h3>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center mt-4 mb-5"
          style={{ background: `${phase.color}15`, border: `1px solid ${phase.color}25` }}
        >
          <Icon size={18} style={{ color: phase.color }} strokeWidth={1.75} />
        </div>
        <h4 className="font-cal text-4xl dark:text-white text-white mb-4">
          {t(phase.es.title, phase.en.title)}
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,245,240,0.55)' }}>
          {t(phase.es.desc, phase.en.desc)}
        </p>
        <div className="mt-5 text-xs" style={{ color: 'rgba(245,245,240,0.40)' }}>
          {t(phase.es.output, phase.en.output)}
        </div>
      </motion.div>
    </div>
  )
}
