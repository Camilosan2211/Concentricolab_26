/**
 * Productos.jsx — "Insights & Solutions" carousel
 *
 * Arquitectura:
 * - Contenedor overflow:hidden (wrapper visible)
 * - motion.div interior con drag="x" + dragConstraints
 * - onDragEnd → snap al índice más cercano
 * - Sin scrollbar nativo (no hay overflow scroll)
 * - Flechas en el encabezado, fuera del área de tarjetas
 * - 4ª tarjeta asoma ~20% al fondo (gap right en el wrapper)
 * - Dots clicables sincronizados con el índice activo
 */
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { ExternalLink, ShoppingBag, Zap, Layers, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useCallback, useEffect } from 'react'

const METRICS_NOTION_URL = 'https://concentriclabco.notion.site'

const products = [
  {
    icon: ShoppingBag, color: '#5170FF',
    tag_es: 'Disponible', tag_en: 'Available',
    es: { title: 'Kit de Métricas Digitales', desc: 'Templates en Notion para medir, analizar y presentar métricas de proyectos digitales. Listo para usar, adaptable a tu stack.', cta: 'Obtener en Gumroad', ctaNotion: 'Obtener en Notion' },
    en: { title: 'Digital Metrics Kit',       desc: 'Notion templates to measure, analyze and present digital project metrics. Ready to use, adaptable to your stack.',               cta: 'Get on Gumroad',   ctaNotion: 'Get on Notion' },
    href: 'https://concentriclab.gumroad.com/l/metricasdigitales',
    notionHref: METRICS_NOTION_URL, localThumb: 'assets/images/producto-1.avif', hasThumb: true,
  },
  {
    icon: Zap, color: '#FF6D4D',
    tag_es: 'Próximamente', tag_en: 'Coming soon',
    es: { title: 'Templates de Automatización', desc: 'Flujos pre-construidos para Make.com y n8n. Automatiza tareas repetitivas en minutos, sin configurar desde cero.', cta: 'Notificarme' },
    en: { title: 'Automation Templates',         desc: 'Pre-built flows for Make.com and n8n. Automate repetitive tasks in minutes.', cta: 'Notify me' },
    href: '#connect', hasThumb: false,
  },
  {
    icon: Layers, color: '#828AFF',
    tag_es: 'Próximamente', tag_en: 'Coming soon',
    es: { title: 'UI Kit para diseñadores LATAM', desc: 'Componentes, tokens de diseño y patrones listos para Figma. Pensados para el contexto y velocidad del mercado LATAM.', cta: 'Notificarme' },
    en: { title: 'UI Kit for LATAM Designers',    desc: 'Components, design tokens and patterns ready for Figma. Built for the LATAM market context and speed.',               cta: 'Notify me' },
    href: '#connect', hasThumb: false,
  },
]

// ── Tarjeta de producto ─────────────────────────────────────────
function ProductCard({ prod, lang, index, isDragging }) {
  const Icon = prod.icon
  const c    = lang === 'es' ? prod.es : prod.en
  return (
    <motion.div
      className="group relative glass rounded-3xl overflow-hidden flex flex-col flex-shrink-0"
      style={{ width: 'min(80vw, 340px)' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: .8, ease: [.16, 1, .3, 1], delay: index * .1 }}
      // Solo hover si no está siendo arrastrado
      whileHover={isDragging ? {} : { y: -6, scale: 1.012, transition: { duration: .24, ease: 'easeOut' } }}
    >
      {/* Thumbnail */}
      <div className="w-full relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {prod.localThumb ? (
          <>
            <img src={prod.localThumb} alt={c.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              onError={e => { e.target.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex' }}
            />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(160deg,rgba(81,112,255,.52) 0%,rgba(65,234,255,.22) 60%,rgba(0,3,31,.38) 100%)', mixBlendMode: 'multiply' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,3,31,0.55)] via-transparent to-transparent pointer-events-none" />
          </>
        ) : null}
        <div className="w-full h-full flex-col items-center justify-center gap-2 p-5 text-center"
          style={{ display: prod.localThumb ? 'none' : 'flex', background: `linear-gradient(135deg,${prod.color}18 0%,${prod.color}06 100%)` }}>
          <Icon size={32} style={{ color: prod.color, opacity: .5 }} />
          <span className="text-[13px] font-medium dark:text-white/40 text-black/40 leading-snug max-w-[160px]">
            {lang === 'es' ? 'Contenido que llega próximamente' : 'Content arriving soon'}
          </span>
        </div>
      </div>

      {/* Hover glows */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ background: `radial-gradient(circle at 50% 0%,${prod.color}10 0%,transparent 60%)` }} />
      <div className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(to right,transparent,${prod.color}55,transparent)` }} />

      {/* Content */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        <span className="inline-flex items-center gap-1.5 self-start text-[11px] font-bold tracking-[.07em] uppercase px-3 py-1 rounded-full"
          style={{ background: `${prod.color}18`, color: prod.color, border: `1px solid ${prod.color}25` }}>
          <span className="w-1 h-1 rounded-full" style={{ background: prod.color }} />
          {lang === 'es' ? prod.tag_es : prod.tag_en}
        </span>
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="font-cal text-xl dark:text-white text-b-dark leading-snug">{c.title}</h3>
          <p className="dark:text-white/45 text-black/50 text-sm leading-[1.65]">{c.desc}</p>
        </div>
        {prod.notionHref ? (
          <div className="flex flex-wrap gap-2">
            <a href={prod.href} target="_blank" rel="noopener noreferrer"
              className="inline-flex flex-1 min-w-[46%] items-center justify-center gap-1.5 text-[12px] font-semibold px-3 py-2 rounded-xl transition-all duration-200"
              style={{ background: `${prod.color}18`, color: prod.color, border: `1px solid ${prod.color}30` }}>
              <Icon size={13} />{c.cta}<ExternalLink size={11} className="opacity-50" />
            </a>
            <a href={prod.notionHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex flex-1 min-w-[46%] items-center justify-center gap-1.5 glass text-[12px] font-semibold px-3 py-2 rounded-xl dark:text-white/85 text-b-dark border dark:border-white/10 border-black/8 transition-all duration-200">
              {c.ctaNotion}<ExternalLink size={11} className="opacity-45" />
            </a>
          </div>
        ) : (
          <a href={prod.href}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
            style={{ color: prod.color }}>
            <Icon size={14} />{c.cta}
          </a>
        )}
      </div>
    </motion.div>
  )
}

// ── Tarjeta YouTube ─────────────────────────────────────────────
function YouTubeCard({ lang, isDragging }) {
  const t = (es, en) => lang === 'es' ? es : en
  return (
    <motion.div
      className="group relative glass rounded-3xl overflow-hidden flex flex-col flex-shrink-0"
      style={{ width: 'min(80vw, 340px)' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: .8, ease: [.16, 1, .3, 1], delay: products.length * .1 }}
      whileHover={isDragging ? {} : { y: -6, scale: 1.012, transition: { duration: .24, ease: 'easeOut' } }}
    >
      <div className="w-full relative overflow-hidden flex items-center justify-center"
        style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg,rgba(81,112,255,.15) 0%,rgba(65,234,255,.08) 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(160deg,rgba(81,112,255,.42) 0%,rgba(65,234,255,.12) 60%,rgba(0,3,31,.28) 100%)', mixBlendMode: 'multiply' }} />
        <motion.div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(81,112,255,.25)', border: '2px solid rgba(81,112,255,.5)' }}
          whileHover={{ scale: 1.1 }}>
          <Play size={28} className="text-b-blue fill-b-blue" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,3,31,0.55)] via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ background: 'radial-gradient(circle at 50% 0%,rgba(81,112,255,.10) 0%,transparent 60%)' }} />
      <div className="p-5 flex flex-col gap-4 flex-1">
        <span className="inline-flex items-center gap-1.5 self-start text-[11px] font-bold tracking-[.07em] uppercase px-3 py-1 rounded-full"
          style={{ background: 'rgba(81,112,255,.18)', color: '#5170FF', border: '1px solid rgba(81,112,255,.25)' }}>
          <span className="w-1 h-1 rounded-full bg-b-blue" />{t('Próximamente', 'COMING SOON')}
        </span>
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="font-cal text-xl dark:text-white text-b-dark leading-snug">
            {t('THE UX IS DEAD IN 2026?', 'THE UX IS DEAD IN 2026?')}
          </h3>
          <p className="dark:text-white/45 text-black/50 text-sm leading-[1.65]">
            {t('Estamos preparando una masterclass exclusiva sobre el futuro de las experiencias digitales. Suscríbete para el lanzamiento.',
               'We are preparing an exclusive masterclass on the future of digital experiences. Subscribe for the launch.')}
          </p>
        </div>
        <a href="#connect" className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
          style={{ color: '#5170FF' }}>
          <Play size={14} />{t('Suscríbete', 'Subscribe')}
        </a>
      </div>
    </motion.div>
  )
}

// ── Componente principal ────────────────────────────────────────
export default function Productos({ lang }) {
  const t        = (es, en) => lang === 'es' ? es : en
  const CARD_W   = 340                // ancho de cada tarjeta en px
  const GAP      = 24                 // gap entre tarjetas en px
  const STEP     = CARD_W + GAP       // paso de desplazamiento
  const TOTAL    = products.length + 1 // 3 + YouTube

  const containerRef  = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging,  setIsDragging]  = useState(false)
  const [maxDrag,     setMaxDrag]     = useState(-STEP * (TOTAL - 1))

  const x = useMotionValue(0)

  // Calcula el constraint máximo según el ancho real del contenedor
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const visible = containerRef.current.offsetWidth
      // Queremos que la 4ª tarjeta asome un 20%: la pista tiene TOTAL cards
      // y queremos mostrar visible px por vez.
      const trackWidth = TOTAL * STEP - GAP
      const maxLeft    = -(trackWidth - visible + GAP * 0.5)
      setMaxDrag(Math.min(0, maxLeft))
    }
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [TOTAL, STEP])

  // Snap al índice exacto
  const snapTo = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, TOTAL - 1))
    setActiveIndex(clamped)
    animate(x, -clamped * STEP, { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 })
  }, [x, STEP, TOTAL])

  const handleDragEnd = useCallback((_, info) => {
    setIsDragging(false)
    const vel       = info.velocity.x
    const offset    = info.offset.x
    const threshold = STEP / 3

    let next = activeIndex
    if (Math.abs(vel) > 500) {
      // Swipe rápido — seguir la dirección de la velocidad
      next = vel < 0 ? activeIndex + 1 : activeIndex - 1
    } else if (Math.abs(offset) > threshold) {
      next = offset < 0 ? activeIndex + 1 : activeIndex - 1
    }
    snapTo(next)
  }, [activeIndex, STEP, snapTo])

  const handleArrow = (dir) => snapTo(activeIndex + dir)

  return (
    <section id="productos" className="relative z-10 py-24 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10">

        {/* ── Encabezado con flechas a la derecha ──────────────── */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-3 max-w-2xl">
            <motion.p
              className="text-[12px] font-bold tracking-[.12em] uppercase dark:text-white/30 text-black/35"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              {t('Productos digitales', 'Digital products')}
            </motion.p>
            <motion.h2
              className="font-cal text-4xl md:text-5xl dark:text-white text-b-dark leading-tight tracking-[-0.5px]"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .8, ease: [.16, 1, .3, 1], delay: .08 }}
            >
              {t('Insights & ', 'Insights & ')}
              <span className="text-grad">{t('Solutions', 'Solutions')}</span>
            </motion.h2>
          </div>

          {/* Flechas — fuera del carrusel, en el encabezado */}
          <div className="flex items-center gap-2 shrink-0 pb-1">
            <button type="button" onClick={() => handleArrow(-1)}
              disabled={activeIndex === 0}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full glass border dark:border-white/10 border-black/10 dark:text-white/70 text-black/60 transition-all duration-200 hover:dark:text-white hover:text-black disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label={t('Anterior', 'Previous')}>
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => handleArrow(1)}
              disabled={activeIndex === TOTAL - 1}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full glass border dark:border-white/10 border-black/10 dark:text-white/70 text-black/60 transition-all duration-200 hover:dark:text-white hover:text-black disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label={t('Siguiente', 'Next')}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── Carrusel draggable ───────────────────────────────── */}
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          // Evita que los clicks en links se activen al soltar el drag
          style={{ touchAction: 'pan-y' }}
        >
          <motion.div
            className="flex gap-6 cursor-grab active:cursor-grabbing select-none"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: maxDrag, right: 0 }}
            dragElastic={0.08}           // rebote suave en los bordes
            dragMomentum={true}          // momentum natural post-drag
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            // Sincroniza el activeIndex mientras se arrastra
            onDrag={(_, info) => {
              const rawIndex = -info.point.x / STEP
              const clamped  = Math.round(Math.max(0, Math.min(rawIndex, TOTAL - 1)))
              if (clamped !== activeIndex) setActiveIndex(clamped)
            }}
          >
            {products.map((prod, i) => (
              <ProductCard key={i} prod={prod} lang={lang} index={i} isDragging={isDragging} />
            ))}
            <YouTubeCard lang={lang} isDragging={isDragging} />
          </motion.div>
        </div>

        {/* ── Dots clicables ────────────────────────────────────── */}
        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: TOTAL }, (_, i) => (
            <button
              key={i}
              onClick={() => snapTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-7 dark:bg-white/80 bg-black/60'
                  : 'w-2 dark:bg-white/25 bg-black/22 hover:dark:bg-white/45 hover:bg-black/40'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ── CTA ver todos ─────────────────────────────────────── */}
        <motion.div className="flex justify-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: .3 }}>
          <a href="https://concentriclab.gumroad.com" target="_blank" rel="noopener noreferrer"
            className="glass inline-flex items-center gap-2.5 dark:text-white/60 text-black/65 hover:dark:text-white hover:text-black text-sm font-semibold px-6 py-3 rounded-full border dark:border-white/8 border-black/10 hover:dark:border-white/16 hover:border-black/18 transition-all duration-300">
            {t('Ver todos los productos', 'View all products')}
            <ExternalLink size={13} />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
