import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Layers, Box, Monitor, Play, Zap, MessageSquare } from 'lucide-react'

const items = [
  {
    id: '01',
    Icon: MessageSquare,
    color: '#FF6D4D',
    span: 1,
    es: {
      title: 'Consultoría',
      body: 'Acompañamiento estratégico para alinear marca, producto y negocio — con foco, claridad y criterio en cada decisión.',
    },
    en: {
      title: 'Consulting',
      body: 'Strategic support to align brand, product and business — with focus, clarity and criteria in every decision.',
    },
  },
  {
    id: '02',
    Icon: Layers,
    color: '#4D66FF',
    span: 1,
    es: {
      title: 'Sistemas & marca',
      body: 'Identidad, estructura y lenguaje para construir marcas coherentes — desde lo visual hasta cómo funciona.',
    },
    en: {
      title: 'Systems & brand',
      body: 'Identity, structure and language to build coherent brands — from the visual to how it works.',
    },
  },
  {
    id: '03',
    Icon: Box,
    color: '#FF6D4D',
    span: 1,
    es: {
      title: 'Producto & forma',
      body: 'Exploración de forma, objeto y espacio como parte de una experiencia bien construida — cuando necesita existir más allá de la pantalla.',
    },
    en: {
      title: 'Product & form',
      body: 'Exploration of form, object and space as part of a well-built experience — when it needs to exist beyond the screen.',
    },
  },
  {
    id: '04',
    Icon: Zap,
    color: '#9F6EFF',
    span: 1,
    es: {
      title: 'Automatización & IA',
      body: 'Sistemas que conectan herramientas, escalan procesos y aplican inteligencia para liberar tiempo y capacidad operativa.',
    },
    en: {
      title: 'Automation & AI',
      body: 'Systems that connect tools, scale processes and apply intelligence to free up time and operational capacity.',
    },
  },
  {
    id: '05',
    Icon: Play,
    color: '#828AFF',
    span: 1,
    es: {
      title: 'Video & contenido',
      body: 'Edición y narrativa visual a partir de assets, plantillas y referencias — reels, animaciones y piezas de marca listas para publicar.',
    },
    en: {
      title: 'Video & content',
      body: 'Editing and visual narrative from assets, templates and references — reels, animations and brand pieces ready to publish.',
    },
  },
  {
    id: '06',
    Icon: Monitor,
    color: '#41EAFF',
    span: 1,
    es: {
      title: 'UX/UI & experiencia digital',
      body: 'Interfaces, flujos y experiencias digitales para apps, productos y entornos web — claras, útiles y coherentes con la marca.',
    },
    en: {
      title: 'UX/UI & digital experience',
      body: 'Interfaces, flows and digital experiences for apps, products and web environments — clear, useful and consistent with the brand.',
    },
  },
]

function CapCard({ item, lang, index, featured }) {
  const c = lang === 'es' ? item.es : item.en
  const Icon = item.Icon

  return (
    <motion.div
      className={`relative rounded-card overflow-hidden group cursor-default border dark:border-white/[0.07] border-black/[0.07] dark:bg-white/[0.03] bg-white/60 backdrop-blur-sm ${featured ? 'sm:col-span-2 lg:col-span-2' : 'lg:col-span-1'}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
    >
      {/* Línea accent superior */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }}
      />

      {/* Glow de fondo */}
      <div
        className={`absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none transition-all duration-500 ${featured ? 'opacity-40 group-hover:opacity-70' : 'opacity-20 group-hover:opacity-50 group-hover:scale-125'}`}
        style={{
          background: `radial-gradient(circle, ${item.color}40 0%, transparent 70%)`,
          filter: 'blur(24px)',
        }}
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className={`relative z-10 p-6 md:p-8 flex ${featured ? 'flex-col md:flex-row md:gap-8' : 'flex-col gap-4'} h-full`}>
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
            <h3 className={`font-cal ${featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} dark:text-white text-b-dark leading-snug`}>
              {c.title}
            </h3>
          </div>
          <p className={`dark:text-white/50 text-black/55 text-sm leading-[1.7] ${featured ? 'max-w-[400px]' : ''}`}>
            {c.body}
          </p>
        </div>
      </div>

      {/* Línea inferior animada */}
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
            className="dark:text-white/40 text-black/45 text-sm max-w-[500px] leading-[1.7]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.7 }}
          >
            {t(
              'Capacidades que convergen para construir, ordenar y escalar marcas, productos y sistemas.',
              'Capabilities that converge to build, organize and scale brands, products and systems.'
            )}
          </motion.p>
        </div>

        {/* Grid: 2 filas x 3 columnas */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {items.map((item, i) => (
            <CapCard key={item.id} item={item} lang={lang} index={i} featured={i === 0 || i === items.length - 1} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <a
            href="#connect"
            className="inline-flex items-center gap-2.5 bg-b-blue text-white text-sm font-semibold px-7 py-3.5 rounded-full glow-blue hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(77,102,255,.5)] transition-all duration-300"
          >
            {t('Iniciemos un proyecto', "Let's start a project")}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
