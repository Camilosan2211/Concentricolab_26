import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const principles = [
  {
    num: '01', color: '#5170FF',
    es: { title: 'Del núcleo hacia afuera', body: 'Las mejores soluciones parten del centro: del usuario al sistema, del problema a la solución.' },
    en: { title: 'From the core outward',   body: 'The best solutions start from the center: from the user to the system, from the problem to the solution.' },
  },
  {
    num: '02', color: '#FF6D4D',
    es: { title: 'Criterio sobre velocidad', body: 'Mover rápido sin pensar solo acumula deuda. El criterio es el filtro que convierte ideas en sistemas con sentido.' },
    en: { title: 'Criterion over speed',     body: 'Moving fast without thinking only accumulates debt. Criterion turns ideas into meaningful systems.' },
  },
  {
    num: '03', color: '#828AFF',
    es: { title: 'Convergencia, no fragmentación', body: 'Diseño, IA, datos y automatización convergen bajo una misma lógica — los resultados se multiplican.' },
    en: { title: 'Convergence, not fragmentation', body: 'Design, AI, data and automation converge under the same logic — results multiply.' },
  },
  {
    num: '04', color: '#41EAFF',
    es: { title: 'Sistemas sobre piezas', body: 'Una pieza gráfica impresiona. Un sistema que funciona transforma. El lab construye lo segundo.' },
    en: { title: 'Systems over pieces',   body: 'A great piece can impress. A system that works transforms. The lab builds the second.' },
  },
]

function Card({ p, lang, index }) {
  const c = lang === 'es' ? p.es : p.en
  return (
    <motion.div
      className="glass rounded-2xl p-5 flex flex-col gap-2.5 relative overflow-hidden group cursor-default"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: .75, ease: [.16, 1, .3, 1], delay: index * .08 }}
      whileHover={{ y: -4, transition: { duration: .22, ease: 'easeOut' } }}
    >
      {/* Glow de color en hover */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none opacity-30 group-hover:opacity-70 group-hover:scale-150 transition-all duration-500"
        style={{ background: `radial-gradient(circle,${p.color}28 0%,transparent 70%)`, filter: 'blur(14px)' }}
      />
      {/* Número */}
      <span className="font-cal text-3xl" style={{ color: p.color, opacity: .15 }}>{p.num}</span>
      {/* Título */}
      <h3 className="font-cal text-[17px] md:text-[18px] dark:text-white text-b-dark leading-snug">{c.title}</h3>
      {/* Cuerpo */}
      <p className="dark:text-white/45 text-black/50 leading-[1.65] text-[13px]">{c.body}</p>
      {/* Línea inferior en hover */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ background: `linear-gradient(to right,${p.color},transparent)` }}
      />
    </motion.div>
  )
}

export default function Manifiesto({ lang }) {
  const sec = useRef()
  const { scrollYProgress } = useScroll({ target: sec, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  const t = (es, en) => lang === 'es' ? es : en

  return (
    <section
      id="manifiesto"
      ref={sec}
      className="py-12 md:py-16 px-6 relative overflow-hidden dark:bg-[linear-gradient(180deg,#00031F_0%,#020425_50%,#00031F_100%)] bg-[linear-gradient(180deg,#F8F7F4_0%,#EEF1FF_50%,#F8F7F4_100%)]"
    >
      {/* Orbe parallax */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(ellipse,rgba(81,112,255,.07) 0%,transparent 70%)', filter: 'blur(60px)' }} />
      </motion.div>

      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 md:gap-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <motion.p
            className="text-[11px] font-bold tracking-[.12em] uppercase dark:text-white/30 text-black/35"
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

        {/* Grid de cards — 2×2 comprimido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {principles.map((p, i) => (
            <Card key={p.num} p={p} lang={lang} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
