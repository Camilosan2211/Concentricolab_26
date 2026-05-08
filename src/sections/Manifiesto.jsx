import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'

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

/* ── Divider gradient que fluye entre colores adyacentes ────────── */
function PrincipleDivider({ colorA, colorB }) {
  return (
    <div
      className="hidden md:block w-px self-stretch my-5"
      style={{
        background: `linear-gradient(to bottom, transparent 0%, ${colorA}66 25%, ${colorB}66 75%, transparent 100%)`,
      }}
    />
  )
}

/* ── Bloque individual de principio — compacto ──────────────────── */
function PrincipleBlock({ p, lang }) {
  const c = lang === 'es' ? p.es : p.en
  return (
    <div className="flex-1 p-4 md:p-5 flex flex-col gap-1.5">
      <span
        className="text-[10px] font-bold tracking-[0.12em] block"
        style={{ color: p.color, opacity: 0.7 }}
      >
        {p.num}
      </span>
      <h3 className="font-cal text-[15px] md:text-[17px] dark:text-white text-b-dark leading-snug">
        {c.title}
      </h3>
      <p className="dark:text-white/45 text-black/50 text-[13px] leading-[1.5] max-w-[240px]">
        {c.body}
      </p>
    </div>
  )
}

export default function Manifiesto({ lang }) {
  const sec      = useRef()
  const statsRef = useRef()
  const { scrollYProgress } = useScroll({ target: sec, offset: ['start end', 'end start'] })
  const y        = useTransform(scrollYProgress, [0, 1], [40, -40])
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })
  const t = (es, en) => lang === 'es' ? es : en

  const principleColors = principles.map(p => p.color)

  return (
    <section
      id="principios"
      ref={sec}
      className="py-12 md:py-16 px-4 relative overflow-hidden bg-transparent"
    >
      {/* Orbe parallax — más sutil */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none opacity-60"
        aria-hidden="true"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(77,102,255,.08) 0%,transparent 68%)', filter: 'blur(55px)' }} />
      </motion.div>

      <div className="section-premium">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6 md:gap-8 relative z-10">

          {/* ── Header compacto ─────────────────────────────────── */}
          <div className="flex flex-col items-center text-center gap-2">
            <motion.p
              className="text-[10px] font-bold tracking-[0.14em] uppercase dark:text-white/35 text-black/40"
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

          {/* ── Banda de principios (horizontal desktop, 2×2 mobile) ── */}
          <motion.div
            className="rounded-card border dark:border-white/[0.06] border-black/[0.06] dark:bg-white/[0.02] bg-white/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: .7, ease: [.16, 1, .3, 1] }}
          >
            <div className="grid grid-cols-2 md:flex">
              {principles.map((p, i) => (
                <div key={p.num} className="contents md:contents">
                  <div className="md:flex-1">
                    <PrincipleBlock p={p} lang={lang} />
                  </div>
                  {i < principles.length - 1 && (
                    <PrincipleDivider colorA={principleColors[i]} colorB={principleColors[i + 1]} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Métricas integradas — menos peso visual ──────────── */}
          <motion.div
            ref={statsRef}
            className="relative rounded-card border dark:border-white/[0.05] border-black/[0.05] dark:bg-white/[0.015] bg-white/40 backdrop-blur-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .7, ease: [.16, 1, .3, 1] }}
          >
            <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-b-blue/20 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x dark:divide-white/[0.04] divide-black/[0.04] px-2 py-4">
              {[
                { num: '+40h', color: '#4D66FF', es: 'Ahorradas por automatización en un proyecto típico',   en: 'Saved through automation in a typical project' },
                { num: '6+',   color: '#FF6D4D', es: 'Disciplinas convergiendo en cada entrega',               en: 'Disciplines converging in every delivery' },
                { num: '3×',   color: '#41EAFF', es: 'Más rápido que un flujo de trabajo tradicional',         en: 'Faster than a traditional workflow' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center gap-0.5 px-6 py-3 md:py-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * .1, duration: .6, ease: [.16, 1, .3, 1] }}
                >
                  <span
                    className="font-cal text-2xl md:text-3xl"
                    style={{ color: s.color }}
                  >
                    {s.num}
                  </span>
                  <p className="dark:text-white/40 text-black/45 text-[11px] leading-[1.5] max-w-[140px]">
                    {lang === 'es' ? s.es : s.en}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-b-coral/15 to-transparent" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
