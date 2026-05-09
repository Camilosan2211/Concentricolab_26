import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Search, PenTool, Boxes } from 'lucide-react'

const steps = [
  {
    Icon: Search,
    color: '#4D66FF',
    es: { title: 'Entendemos', desc: 'Analizamos el producto, espacio o marca — su forma, contexto y cómo se percibe en el mundo real.' },
    en: { title: 'We understand', desc: 'We analyze the product, space or brand — its form, context and how it is perceived in the real world.' },
  },
  {
    Icon: PenTool,
    color: '#FF6D4D',
    es: { title: 'Traducimos', desc: 'Lo convertimos en forma, narrativa y sistema — identidad, piezas digitales o contenido coherente.' },
    en: { title: 'We translate', desc: 'We turn it into form, narrative and system — identity, digital pieces or coherent content.' },
  },
  {
    Icon: Boxes,
    color: '#828AFF',
    es: { title: 'Entregamos', desc: 'Piezas listas para comunicar y posicionar — en los formatos acordados, listas para publicar o producir.' },
    en: { title: 'We deliver', desc: 'Pieces ready to communicate and position — in agreed formats, ready to publish or produce.' },
  },
]

export default function Proceso({ lang }) {
  const t      = (es, en) => lang === 'es' ? es : en
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="proceso" className="relative z-10 py-16 md:py-20 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
          <motion.p
            className="text-[12px] font-bold tracking-[0.12em] uppercase dark:text-white/30 text-black/35"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            {t('Así funciona', 'How it works')}
          </motion.p>
          <motion.h2
            className="font-cal text-3xl md:text-4xl dark:text-white text-b-dark leading-tight"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('Simple como ', 'As simple as ')}
            <span className="text-grad">{t('3 pasos', '3 steps')}</span>
          </motion.h2>
        </div>

        {/* Steps as individual cards */}
        <div ref={ref} className="relative">

          {/* ── Desktop: conector horizontal ────────────────────── */}
          <div className="hidden md:block absolute inset-x-0 pointer-events-none" style={{ top: '88px', height: '2px', zIndex: 0 }} aria-hidden>
            <motion.div
              className="absolute inset-0 rounded-full origin-left"
              style={{ background: 'linear-gradient(90deg, #4D66FF, #FF6D4D, #828AFF)' }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.8, duration: 0.3 }}
            >
              <motion.div
                className="absolute top-0 h-full w-[20%] rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.4), transparent)' }}
                animate={inView ? { x: ['-100%', '500%'] } : {}}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'linear', repeatDelay: 1.0, delay: 1.8 }}
              />
            </motion.div>
            {/* Nodos */}
            {[16.67, 50, 83.33].map((pct, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 w-2.5 h-2.5 rounded-full"
                style={{
                  left: `${pct}%`,
                  transform: 'translate(-50%, -50%)',
                  background: steps[i].color,
                  boxShadow: `0 0 8px ${steps[i].color}`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.35, type: 'spring', stiffness: 200 }}
              />
            ))}
          </div>

          {/* ── Mobile: conector vertical ────────────────────────── */}
          <div className="md:hidden absolute inset-y-0 pointer-events-none" style={{ left: '50%', width: '2px', transform: 'translateX(-50%)', zIndex: 0 }} aria-hidden>
            <motion.div
              className="absolute inset-0 rounded-full origin-top"
              style={{ background: 'linear-gradient(180deg, #4D66FF, #FF6D4D, #828AFF)' }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.8, duration: 0.3 }}
            >
              <motion.div
                className="absolute left-0 w-full h-[20%] rounded-full"
                style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,.4), transparent)' }}
                animate={inView ? { y: ['-100%', '500%'] } : {}}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'linear', repeatDelay: 1.0, delay: 1.8 }}
              />
            </motion.div>
          </div>

          {/* ── Grid de tarjetas ─────────────────────────────────── */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 z-10">
          {steps.map((step, i) => {
            const Icon = step.Icon
            const c    = lang === 'es' ? step.es : step.en
            return (
              <motion.div
                key={step.es.title}
                className="relative rounded-card overflow-hidden group border dark:border-white/[0.07] border-black/[0.07] dark:bg-white/[0.03] bg-white/60 backdrop-blur-sm"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
              >
                {/* Línea accent superior */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }}
                />

                {/* Glow de fondo */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-20 group-hover:opacity-50 group-hover:scale-125 transition-all duration-500"
                  style={{
                    background: `radial-gradient(circle, ${step.color}40 0%, transparent 70%)`,
                    filter: 'blur(24px)',
                  }}
                  aria-hidden="true"
                />

                {/* Contenido centrado */}
                <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center gap-4">
                  {/* Número de paso */}
                  <span
                    className="font-cal text-[10px] font-bold tracking-[.12em] uppercase"
                    style={{ color: step.color, opacity: .6 }}
                  >
                    0{i + 1}
                  </span>

                  {/* Icono */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${step.color}18`,
                      border: `1px solid ${step.color}30`,
                    }}
                  >
                    <Icon size={24} style={{ color: step.color }} strokeWidth={1.75} />
                  </div>

                  {/* Texto */}
                  <div className="flex flex-col gap-2 max-w-[260px]">
                    <h3 className="font-cal text-xl dark:text-white text-b-dark">{c.title}</h3>
                    <p className="dark:text-white/50 text-black/50 text-sm leading-[1.65]">{c.desc}</p>
                  </div>
                </div>

                {/* Línea inferior animada */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                  style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }}
                />
              </motion.div>
            )
          })}
          </div>
        </div>
      </div>
    </section>
  )
}
