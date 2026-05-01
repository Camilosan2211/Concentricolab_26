/**
 * LabStats — "Dark glass island" section
 * Actúa como ruptura visual entre Principios y Productos.
 * En modo dark: panel oscuro con glass y glow interior.
 * En modo light: panel blanco con sombra y borde suave.
 */
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  {
    num: '+40h',
    color: '#5170FF',
    es: 'Ahorradas por automatización en un proyecto típico',
    en: 'Saved through automation in a typical project',
  },
  {
    num: '6+',
    color: '#FF6D4D',
    es: 'Disciplinas convergiendo en cada entrega',
    en: 'Disciplines converging in every delivery',
  },
  {
    num: '3×',
    color: '#41EAFF',
    es: 'Más rápido que un flujo de trabajo tradicional',
    en: 'Faster than a traditional workflow',
  },
]

export default function LabStats({ lang }) {
  const ref    = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    /* Sección con fondo propio — rompe visualmente el scroll */
    <section className="relative z-10 py-0 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          ref={ref}
          className="relative overflow-hidden rounded-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .9, ease: [.16, 1, .3, 1] }}
        >
          {/* Fondo del panel */}
          <div className="absolute inset-0 dark:bg-[rgba(5,8,40,0.72)] bg-white/80 dark:backdrop-blur-2xl backdrop-blur-xl dark:border dark:border-white/[0.07] border border-black/[0.07] rounded-3xl" />

          {/* Glow interior */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(81,112,255,.07) 0%, transparent 75%)' }}
          />

          {/* Línea superior de acento */}
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-b-blue/30 to-transparent" />

          {/* Contenido */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x dark:divide-white/[0.06] divide-black/[0.06] px-2 py-8 md:py-10">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center gap-2 px-6 py-5 md:py-2"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * .16, duration: .75, ease: [.16, 1, .3, 1] }}
              >
                <motion.span
                  className="font-cal text-5xl md:text-[3.2rem] font-bold"
                  style={{ color: s.color, textShadow: `0 0 32px ${s.color}50` }}
                  initial={{ scale: .82, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: .28 + i * .16, type: 'spring', stiffness: 130 }}
                >
                  {s.num}
                </motion.span>
                <p className="dark:text-white/45 text-black/50 text-[13px] leading-[1.6] max-w-[160px]">
                  {lang === 'es' ? s.es : s.en}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Línea inferior de acento */}
          <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-b-coral/25 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
