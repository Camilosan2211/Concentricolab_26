import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, PenTool, Boxes } from 'lucide-react'

const steps = [
  {
    Icon: Search,
    color: '#5170FF',
    es: { title: 'Diagnóstico', desc: 'Mapeamos problema, contexto y métricas para alinear criterio antes de diseñar.' },
    en: { title: 'Diagnosis',   desc: 'We map the problem, context and metrics to align criteria before designing.' },
  },
  {
    Icon: PenTool,
    color: '#FF6D4D',
    es: { title: 'Diseño', desc: 'UX, marca y prototipos con iteración corta — siempre anclados al usuario.' },
    en: { title: 'Design', desc: 'UX, brand and prototypes with tight iteration — always user-anchored.' },
  },
  {
    Icon: Boxes,
    color: '#828AFF',
    es: { title: 'Sistema', desc: 'Entregamos piezas conectadas: componentes, automatización y documentación viva.' },
    en: { title: 'System',  desc: 'We deliver connected pieces: components, automation and living documentation.' },
  },
]

export default function Proceso({ lang }) {
  const t      = (es, en) => lang === 'es' ? es : en
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="proceso" className="relative z-10 py-16 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
          <motion.p
            className="text-[12px] font-bold tracking-[0.12em] uppercase dark:text-white/30 text-black/35"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            {t('Cómo trabajamos', 'How we work')}
          </motion.p>
          <motion.h2
            className="font-cal text-3xl md:text-4xl dark:text-white text-b-dark leading-tight"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('Proceso en ', 'Process in ')}
            <span className="text-grad">{t('3 pasos', '3 steps')}</span>
          </motion.h2>
        </div>

        {/* Panel */}
        <motion.div
          ref={ref}
          className="relative glass rounded-3xl px-6 py-12 md:px-14 md:py-14 overflow-hidden"
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Glow interior sutil */}
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(81,112,255,.06) 0%, transparent 70%)' }}
          />

          {/* ── Conector animado (desktop) ──
              Se dibuja DEBAJO de los iconos — z-0.
              Los iconos tienen z-10.
              La línea va de nodo a nodo, entre el borde
              izquierdo del icono 1 y el borde derecho del icono 3.
          ── */}
          <div
            className="hidden md:block absolute pointer-events-none"
            style={{
              /* Centrada verticalmente con los iconos: iconos son w-14 h-14 (56px).
                 El panel tiene pt-12 (48px). Centro = 48+28 = 76px desde el top del panel */
              top: 'calc(48px + 28px)',   /* pt-14 (56px) + la mitad del icono (28px) */
              left:  'calc(33.33% / 2)',  /* centro de la primera columna de 3 */
              right: 'calc(33.33% / 2)',  /* centro de la tercera columna */
              height: '2px',
              zIndex: 0,
            }}
            aria-hidden
          >
            {/* Línea base */}
            <motion.div
              className="absolute inset-0 rounded-full origin-left"
              style={{ background: 'linear-gradient(90deg, #5170FF, #FF6D4D, #828AFF)' }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
            {/* Shimmer que recorre la línea */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.8, duration: 0.3 }}
            >
              <motion.div
                className="absolute top-0 h-full w-[30%] rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent)' }}
                animate={inView ? { x: ['-100%', '400%'] } : {}}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'linear', repeatDelay: 1.0, delay: 1.8 }}
              />
            </motion.div>

            {/* Puntos en los nodos de conexión */}
            {[0, 50, 100].map((pct, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{
                  left: `${pct}%`,
                  transform: 'translate(-50%, -50%)',
                  background: [steps[0].color, steps[1].color, steps[2].color][i],
                  boxShadow: `0 0 8px ${[steps[0].color, steps[1].color, steps[2].color][i]}`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.35, type: 'spring', stiffness: 200 }}
              />
            ))}
          </div>

          {/* Steps grid — z-10 para estar por encima de la línea */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {steps.map((step, i) => {
              const Icon = step.Icon
              const c    = lang === 'es' ? step.es : step.en
              return (
                <motion.div
                  key={step.es.title}
                  className="flex flex-col items-center text-center gap-4"
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.14, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Número de paso */}
                  <span
                    className="font-cal text-[11px] font-bold tracking-[.12em] uppercase mb-[-6px]"
                    style={{ color: step.color, opacity: .6 }}
                  >
                    0{i + 1}
                  </span>

                  {/* Icono — con fondo glass y sin z-index relativo para no cortar la línea */}
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border dark:border-white/10 border-black/8 dark:bg-[rgba(5,8,40,0.70)] bg-white/80 backdrop-blur-sm"
                    style={{ boxShadow: `0 8px 28px ${step.color}28` }}
                    whileHover={{ scale: 1.08, transition: { duration: .2, ease: 'easeOut' } }}
                    animate={inView ? {
                      boxShadow: [
                        `0 8px 28px ${step.color}28`,
                        `0 8px 40px ${step.color}55`,
                        `0 8px 28px ${step.color}28`,
                      ]
                    } : {}}
                    transition={{ delay: 1.2 + i * .25, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Icon size={24} style={{ color: step.color }} strokeWidth={1.75} />
                  </motion.div>

                  {/* Texto */}
                  <div className="flex flex-col gap-2 max-w-[260px]">
                    <h3 className="font-cal text-xl dark:text-white text-b-dark">{c.title}</h3>
                    <p className="dark:text-white/45 text-black/50 text-sm leading-[1.65]">{c.desc}</p>
                  </div>

                  {/* Conector vertical mobile */}
                  {i < steps.length - 1 && (
                    <div
                      className="md:hidden w-px h-8 rounded-full mt-1"
                      style={{ background: `linear-gradient(180deg, ${step.color}55, ${steps[i + 1].color}55)` }}
                      aria-hidden
                    />
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
