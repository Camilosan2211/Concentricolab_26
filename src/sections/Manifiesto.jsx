import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const principles = [
  { num: '01', color: '#5170FF',
    es: { title: 'Del núcleo hacia afuera', body: 'Las mejores soluciones parten del centro: del usuario al sistema, del problema a la solución.' },
    en: { title: 'From the core outward',   body: 'The best solutions start from the center: from the user to the system, from the problem to the solution.' },
  },
  { num: '02', color: '#FF6D4D',
    es: { title: 'Criterio sobre velocidad', body: 'Mover rápido sin pensar solo acumula deuda. El criterio convierte ideas en sistemas con sentido.' },
    en: { title: 'Criterion over speed',     body: 'Moving fast without thinking accumulates debt. Criterion turns ideas into meaningful systems.' },
  },
  { num: '03', color: '#828AFF',
    es: { title: 'Convergencia, no fragmentación', body: 'Diseño, IA y automatización convergen bajo una misma lógica — los resultados se multiplican.' },
    en: { title: 'Convergence, not fragmentation', body: 'Design, AI and automation converge under the same logic — results multiply.' },
  },
  { num: '04', color: '#41EAFF',
    es: { title: 'Sistemas sobre piezas', body: 'Una pieza gráfica impresiona. Un sistema que funciona transforma. El lab construye lo segundo.' },
    en: { title: 'Systems over pieces',   body: 'A great piece can impress. A system that works transforms. The lab builds the second.' },
  },
]

const stats = [
  { num: '+40h', color: '#5170FF', es: 'Ahorradas por automatización en un proyecto típico',   en: 'Saved through automation in a typical project' },
  { num: '6+',   color: '#FF6D4D', es: 'Disciplinas convergiendo en cada entrega',               en: 'Disciplines converging in every delivery' },
  { num: '3×',   color: '#41EAFF', es: 'Más rápido que un flujo de trabajo tradicional',         en: 'Faster than a traditional workflow' },
]

function Card({ p, lang, index }) {
  const c = lang === 'es' ? p.es : p.en
  return (
    <motion.div
      className="rounded-2xl p-5 flex flex-col gap-2.5 relative overflow-hidden group cursor-default border dark:border-white/[0.07] border-black/[0.07] dark:bg-white/[0.04] bg-white/60 backdrop-blur-sm"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: .75, ease: [.16, 1, .3, 1], delay: index * .08 }}
      whileHover={{ y: -4, transition: { duration: .22, ease: 'easeOut' } }}
    >
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none opacity-30 group-hover:opacity-70 group-hover:scale-150 transition-all duration-500"
        style={{ background: `radial-gradient(circle,${p.color}30 0%,transparent 70%)`, filter: 'blur(12px)' }}
      />
      <span className="font-cal text-3xl" style={{ color: p.color, opacity: .18 }}>{p.num}</span>
      <h3 className="font-cal text-[17px] dark:text-white text-b-dark leading-snug">{c.title}</h3>
      <p className="dark:text-white/45 text-black/55 leading-[1.65] text-[13px]">{c.body}</p>
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ background: `linear-gradient(to right,${p.color},transparent)` }}
      />
    </motion.div>
  )
}

export default function Manifiesto({ lang }) {
  const sec  = useRef()
  const statsRef = useRef()
  const { scrollYProgress } = useScroll({ target: sec, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })
  const t = (es, en) => lang === 'es' ? es : en

  return (
    <section
      id="manifiesto"
      ref={sec}
      className="py-12 md:py-16 px-6 relative overflow-hidden"
      style={{
        /* Fondo semi-transparente → los elementos flotantes del hero se ven detrás */
        background: 'var(--manifiesto-bg)',
      }}
    >
      {/* Orbe parallax */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(81,112,255,.12) 0%,transparent 68%)', filter: 'blur(55px)' }} />
      </motion.div>

      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 md:gap-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <motion.p
            className="text-[11px] font-bold tracking-[.12em] uppercase dark:text-white/30 text-black/40"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            {t('Principios del lab', 'Lab principles')}
          </motion.p>
          <motion.h2
            className="font-cal text-3xl md:text-4xl xl:text-[42px] dark:text-white text-b-dark leading-tight tracking-[-0.5px] max-w-[520px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8, ease: [.16, 1, .3, 1], delay: .06 }}
          >
            {t('El ', 'The ')}
            <span className="text-grad">{t('manifiesto', 'manifesto')}</span>
            {t(' que nos guía', ' that guides us')}
          </motion.h2>
          <motion.p
            className="dark:text-white/40 text-black/45 text-sm max-w-[400px] leading-[1.7]"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: .12, duration: .7 }}
          >
            {t(
              'No son valores de cartelera. Son restricciones que usamos para tomar mejores decisiones.',
              'Not poster values. These are constraints we use to make better decisions.'
            )}
          </motion.p>
        </div>

        {/* Grid de principios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {principles.map((p, i) => <Card key={p.num} p={p} lang={lang} index={i} />)}
        </div>

        {/* ── Métricas integradas ───────────────────────────────── */}
        <motion.div
          ref={statsRef}
          className="relative overflow-hidden rounded-2xl border dark:border-white/[0.07] border-black/[0.07] dark:bg-[rgba(5,8,40,0.55)] bg-white/55 backdrop-blur-xl"
          initial={{ opacity: 0, y: 32 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .9, ease: [.16, 1, .3, 1] }}
        >
          {/* línea decorativa superior */}
          <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-b-blue/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x dark:divide-white/[0.06] divide-black/[0.06] px-2 py-7">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center gap-1.5 px-6 py-4 md:py-2"
                initial={{ opacity: 0, y: 14 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * .14, duration: .7, ease: [.16, 1, .3, 1] }}
              >
                <motion.span
                  className="font-cal text-4xl md:text-5xl"
                  style={{ color: s.color, textShadow: `0 0 28px ${s.color}50` }}
                  initial={{ scale: .82, opacity: 0 }}
                  animate={statsInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: .22 + i * .14, type: 'spring', stiffness: 130 }}
                >
                  {s.num}
                </motion.span>
                <p className="dark:text-white/45 text-black/50 text-[12px] leading-[1.55] max-w-[155px]">
                  {lang === 'es' ? s.es : s.en}
                </p>
              </motion.div>
            ))}
          </div>

          {/* línea decorativa inferior */}
          <div className="absolute bottom-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-b-coral/25 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
