import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const principles = [
  { num: '01', color: '#4D66FF',
    es: { title: 'Del núcleo hacia afuera',      body: 'Del usuario al sistema, del problema a la solución.' },
    en: { title: 'From the core outward',         body: 'From the user to the system, from the problem to the solution.' },
  },
  { num: '02', color: '#FF6D4D',
    es: { title: 'Criterio sobre velocidad',      body: 'Avanzar con intención produce mejores sistemas.' },
    en: { title: 'Criterion over speed',          body: 'Moving with intention produces better systems.' },
  },
  { num: '03', color: '#828AFF',
    es: { title: 'Convergencia, no fragmentación',  body: 'Diseño, automatización e inteligencia bajo una misma lógica.' },
    en: { title: 'Convergence, not fragmentation',  body: 'Design, automation and intelligence under one logic.' },
  },
  { num: '04', color: '#41EAFF',
    es: { title: 'Sistemas sobre piezas',         body: 'Buscamos estructuras que sostienen y escalan, no solo piezas sueltas.' },
    en: { title: 'Systems over pieces',           body: 'We seek structures that sustain and scale, not just loose pieces.' },
  },
]

function PrincipleCard({ p, lang, index }) {
  const c = lang === 'es' ? p.es : p.en

  return (
    <motion.div
      className="relative rounded-card overflow-hidden group border dark:border-white/[0.07] border-black/[0.07] dark:bg-white/[0.03] bg-white/60 backdrop-blur-sm"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
    >
      {/* Línea accent superior */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(to right, ${p.color}, transparent)` }}
      />

      {/* Glow de fondo */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-20 group-hover:opacity-50 group-hover:scale-125 transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${p.color}40 0%, transparent 70%)`,
          filter: 'blur(24px)',
        }}
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col gap-4 min-h-[200px]">
        {/* Número en lugar del icono — misma caja visual */}
        <div className="flex-shrink-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-cal text-lg font-bold"
            style={{
              background: `${p.color}18`,
              border: `1px solid ${p.color}30`,
              color: p.color,
            }}
          >
            {p.num}
          </div>
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="font-cal text-xl md:text-2xl dark:text-white text-b-dark leading-snug">
            {c.title}
          </h3>
          <p className="dark:text-white/50 text-black/55 text-sm leading-[1.7]">
            {c.body}
          </p>
        </div>
      </div>

      {/* Línea inferior animada */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ background: `linear-gradient(to right, ${p.color}, transparent)` }}
      />
    </motion.div>
  )
}

export default function Manifiesto({ lang }) {
  const statsRef = useRef()
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })
  const t = (es, en) => lang === 'es' ? es : en

  const stats = [
    { num: '+40h', color: '#4D66FF', es: 'Ahorradas por automatización en un proyecto típico',   en: 'Saved through automation in a typical project' },
    { num: '6+',   color: '#FF6D4D', es: 'Disciplinas convergiendo en cada entrega',               en: 'Disciplines converging in every delivery' },
    { num: '3×',   color: '#41EAFF', es: 'Más rápido que un flujo de trabajo tradicional',         en: 'Faster than a traditional workflow' },
  ]

  return (
    <section id="principios" className="py-16 md:py-20 px-4 relative overflow-hidden bg-transparent">
      {/* Atmósfera de fondo sutil */}
      <div
        className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse, rgba(77,102,255,0.08) 0%, transparent 68%)',
          filter: 'blur(55px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 relative z-10">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-2">
          <motion.p
            className="text-[11px] font-bold tracking-[0.12em] uppercase dark:text-white/30 text-black/35"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            {t('Cómo pensamos', 'How we think')}
          </motion.p>
          <motion.h2
            className="font-cal text-2xl md:text-3xl dark:text-white text-b-dark leading-tight tracking-[-0.3px]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7, ease: [.16, 1, .3, 1], delay: .06 }}
          >
            {t('Principios y ', 'Principles & ')}
            <span className="text-grad">{t('métricas', 'metrics')}</span>
          </motion.h2>
          <motion.p
            className="dark:text-white/35 text-black/45 text-[13px] max-w-[420px] leading-[1.6]"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: .1, duration: .6 }}
          >
            {t(
              'La lógica con la que diseñamos, decidimos y ejecutamos.',
              'The logic behind how we design, decide, and execute.'
            )}
          </motion.p>
        </div>

        {/* ── 4 principios como cards individuales (estilo Capacidades) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {principles.map((p, i) => (
            <PrincipleCard key={p.num} p={p} lang={lang} index={i} />
          ))}
        </div>

        {/* ── Métricas — banda integrada con mismo lenguaje visual ── */}
        <motion.div
          ref={statsRef}
          className="relative rounded-card overflow-hidden group border dark:border-white/[0.07] border-black/[0.07] dark:bg-white/[0.03] bg-white/60 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .8, ease: [.16, 1, .3, 1] }}
        >
          {/* Línea accent superior */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(to right, #4D66FF, transparent)' }} />

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x dark:divide-white/[0.06] divide-black/[0.06]">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center gap-1.5 px-6 py-6 md:py-5"
                initial={{ opacity: 0, y: 10 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * .1, duration: .6, ease: [.16, 1, .3, 1] }}
              >
                <span
                  className="font-cal text-3xl md:text-4xl"
                  style={{ color: s.color }}
                >
                  {s.num}
                </span>
                <p className="dark:text-white/45 text-black/50 text-[12px] leading-[1.55] max-w-[150px]">
                  {lang === 'es' ? s.es : s.en}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Línea inferior animada */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ background: 'linear-gradient(to right, #4D66FF, #FF6D4D, #41EAFF, transparent)' }} />
        </motion.div>

      </div>
    </section>
  )
}
