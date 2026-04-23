import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, PenTool, Boxes } from 'lucide-react'

const steps = [
  {
    Icon: Search,
    color: '#5170FF',
    es: { title: 'Diagnóstico', desc: 'Mapeamos problema, contexto y métricas para alinear criterio antes de diseñar.' },
    en: { title: 'Diagnosis', desc: 'We map the problem, context and metrics to align criteria before designing.' },
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
    en: { title: 'System', desc: 'We deliver connected pieces: components, automation and living documentation.' },
  },
]

export default function Proceso({ lang }) {
  const t = (es, en) => (lang === 'es' ? es : en)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="proceso" className="relative z-10 py-16 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
          <motion.p
            className="text-[12px] font-bold tracking-[0.12em] uppercase dark:text-white/30 text-black/35"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('Cómo trabajamos', 'How we work')}
          </motion.p>
          <motion.h2
            className="font-cal text-3xl md:text-4xl dark:text-white text-b-dark leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('Proceso en ', 'Process in ')}
            <span className="text-grad">{t('3 pasos', '3 steps')}</span>
          </motion.h2>
        </div>

        <motion.div
          ref={ref}
          className="relative glass rounded-3xl px-6 py-10 md:px-12 md:py-12 overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              background:
                'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(81,112,255,.06) 0%, transparent 70%)',
            }}
          />

          {/* Animated connector (desktop) */}
          <div
            className="hidden md:block absolute top-[72px] left-[12%] right-[12%] h-[2px] pointer-events-none"
            aria-hidden
          >
            <motion.div
              className="h-full rounded-full origin-left"
              style={{
                background: 'linear-gradient(90deg, #5170FF, #FF6D4D, #828AFF)',
              }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
            <motion.div
              className="absolute inset-0 h-full rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent)',
                width: '28%',
              }}
              animate={inView ? { x: ['-10%', '120%'] } : {}}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', repeatDelay: 0.6 }}
            />
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {steps.map((step, i) => {
              const Icon = step.Icon
              const c = lang === 'es' ? step.es : step.en
              return (
                <motion.div
                  key={step.es.title}
                  className="flex flex-col items-center text-center gap-4"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="relative z-[1] w-14 h-14 rounded-2xl flex items-center justify-center glass border dark:border-white/10 border-black/8"
                    style={{ boxShadow: `0 8px 28px ${step.color}22` }}
                  >
                    <Icon size={26} style={{ color: step.color }} strokeWidth={1.75} />
                  </div>
                  <div className="flex flex-col gap-2 max-w-[280px]">
                    <h3 className="font-cal text-xl dark:text-white text-b-dark">{c.title}</h3>
                    <p className="dark:text-white/45 text-black/50 text-sm leading-[1.65]">{c.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="md:hidden w-px h-8 rounded-full my-1"
                      style={{
                        background: `linear-gradient(180deg, ${step.color}55, ${steps[i + 1].color}55)`,
                      }}
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
