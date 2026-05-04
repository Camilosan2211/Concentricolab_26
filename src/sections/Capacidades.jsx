import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, Box, Monitor, Play, Zap, MessageSquare } from 'lucide-react'

const items = [
  {
    id: '01',
    Icon: Layers,
    color: '#4D66FF',
    span: 1, // Cambiado de 2 a 1 para mantener el grid perfecto de 3x2
    es: {
      title: 'Diseño',
      body: 'Sistemas visuales, identidad y UI que conectan lo físico con lo digital — desde la pieza gráfica hasta la interfaz.',
    },
    en: {
      title: 'Design',
      body: 'Visual systems, identity and UI that connect the physical with the digital — from graphic piece to interface.',
    },
  },
  {
    id: '02',
    Icon: Box,
    color: '#FF6D4D',
    span: 1,
    es: {
      title: 'Producto & forma',
      body: 'Exploración de objeto, espacio, packaging y materialidad como base de la experiencia de marca.',
    },
    en: {
      title: 'Product & form',
      body: 'Exploration of object, space, packaging and materiality as the foundation of brand experience.',
    },
  },
  {
    id: '03',
    Icon: Monitor,
    color: '#41EAFF',
    span: 1,
    es: {
      title: 'UX/UI & experiencia digital',
      body: 'Interfaces y flujos que extienden la experiencia del producto en entornos digitales.',
    },
    en: {
      title: 'UX/UI & digital experience',
      body: 'Interfaces and flows that extend the product experience into digital environments.',
    },
  },
  {
    id: '04',
    Icon: Play,
    color: '#828AFF',
    span: 1,
    es: {
      title: 'Video & contenido',
      body: 'Narrativa visual para comunicar producto, espacio o marca — reels, animaciones y piezas en movimiento.',
    },
    en: {
      title: 'Video & content',
      body: 'Visual narrative to communicate product, space or brand — reels, animations and motion pieces.',
    },
  },
  {
    id: '05',
    Icon: Zap,
    color: '#9F6EFF',
    span: 1,
    es: {
      title: 'Automatización & IA',
      body: 'Sistemas que optimizan procesos creativos, escalan ejecución y reducen trabajo repetitivo.',
    },
    en: {
      title: 'Automation & AI',
      body: 'Systems that optimize creative processes, scale execution and reduce repetitive work.',
    },
  },
  {
    id: '06',
    Icon: MessageSquare,
    color: '#FF6D4D',
    span: 1,
    es: {
      title: 'Consultoría',
      body: 'Dirección estratégica para alinear producto, marca y experiencia — sprints enfocados, criterio aplicado.',
    },
    en: {
      title: 'Consulting',
      body: 'Strategic direction to align product, brand and experience — focused sprints, applied criteria.',
    },
  },
]

function CapCard({ item, lang, index }) {
  const c = lang === 'es' ? item.es : item.en
  const Icon = item.Icon

  return (
    <motion.div
      className="relative rounded-card overflow-hidden group cursor-default border dark:border-white/[0.07] border-black/[0.07] dark:bg-white/[0.03] bg-white/60 backdrop-blur-sm md:col-span-1"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
    >
      {/* Línea accent superior — siempre visible */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }}
      />

      {/* Glow de fondo — se intensifica en hover */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-20 group-hover:opacity-50 group-hover:scale-125 transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${item.color}40 0%, transparent 70%)`,
          filter: 'blur(24px)',
        }}
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col gap-4 h-full">
        {/* Icono */}
        <div className="flex-shrink-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: `${item.color}18`,
              border: `1px solid ${item.color}30`,
            }}
          >
            <Icon size={22} style={{ color: item.color }} strokeWidth={1.75} />
          </div>
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-2 flex-1">
          <div>
            <span
              className="text-[10px] font-bold tracking-[0.12em] uppercase block mb-1"
              style={{ color: item.color, opacity: 0.7 }}
            >
              {item.id}
            </span>
            <h3 className="font-cal text-xl md:text-2xl dark:text-white text-b-dark leading-snug">
              {c.title}
            </h3>
          </div>
          <p className="dark:text-white/50 text-black/55 text-sm leading-[1.7]">
            {c.body}
          </p>
        </div>
      </div>

      {/* Línea inferior animada en hover */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }}
      />
    </motion.div>
  )
}

export default function Capacidades({ lang }) {
  const ref    = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const t      = (es, en) => lang === 'es' ? es : en

  return (
    <section id="capacidades" className="py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Orbe de fondo */}
      <div
        className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(77,102,255,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <motion.p
            className="text-[11px] font-bold tracking-[0.12em] uppercase dark:text-white/30 text-black/35"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('Lo que producimos', 'What we produce')}
          </motion.p>
          <motion.h2
            className="font-cal text-3xl md:text-4xl xl:text-[42px] dark:text-white text-b-dark leading-tight tracking-[-0.5px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
          >
            {t('Capacidades ', 'Lab ')}
            <span className="text-grad">{t('del lab', 'capabilities')}</span>
          </motion.h2>
          <motion.p
            className="dark:text-white/40 text-black/45 text-sm max-w-[480px] leading-[1.7]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.7 }}
          >
            {t(
              'Transversalidad aplicada. Disciplinas que convergen para dar forma, posicionar y hacer escalable cualquier producto o marca.',
              'Applied transversality. Disciplines that converge to shape, position, and scale any product or brand.'
            )}
          </motion.p>
        </div>

        {/* Bento grid: 6 items simétricos (2 filas x 3 columnas) */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {items.map((item, i) => (
            <CapCard key={item.id} item={item} lang={lang} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}