import { motion } from 'framer-motion'
import { ExternalLink, ShoppingBag, Zap, Layers, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

const METRICS_NOTION_URL = 'https://concentriclabco.notion.site'

const products = [
  {
    icon: ShoppingBag,
    color: '#5170FF',
    tag_es: 'Disponible', tag_en: 'Available',
    es: { title: 'Kit de Métricas Digitales', desc: 'Templates en Notion para medir, analizar y presentar métricas de proyectos digitales. Listo para usar, adaptable a tu stack.', cta: 'Obtener en Gumroad', ctaNotion: 'Obtener en Notion' },
    en: { title: 'Digital Metrics Kit',       desc: 'Notion templates to measure, analyze and present digital project metrics. Ready to use, adaptable to your stack.',               cta: 'Get on Gumroad',   ctaNotion: 'Get on Notion' },
    href: 'https://concentriclab.gumroad.com/l/metricasdigitales',
    notionHref: METRICS_NOTION_URL,
    // Imagen local con overlay azul
    localThumb: 'assets/images/producto-1.avif',
    hasThumb: true,
  },
  {
    icon: Zap,
    color: '#FF6D4D',
    tag_es: 'Próximamente', tag_en: 'Coming soon',
    es: { title: 'Templates de Automatización', desc: 'Flujos pre-construidos para Make.com y n8n. Automatiza tareas repetitivas en minutos, sin configurar desde cero.', cta: 'Notificarme' },
    en: { title: 'Automation Templates',         desc: 'Pre-built flows for Make.com and n8n. Automate repetitive tasks in minutes.',                                        cta: 'Notify me' },
    href: '#connect',
    hasThumb: false,
  },
  {
    icon: Layers,
    color: '#828AFF',
    tag_es: 'Próximamente', tag_en: 'Coming soon',
    es: { title: 'UI Kit para diseñadores LATAM', desc: 'Componentes, tokens de diseño y patrones listos para Figma. Pensados para el contexto y velocidad del mercado LATAM.', cta: 'Notificarme' },
    en: { title: 'UI Kit for LATAM Designers',    desc: 'Components, design tokens and patterns ready for Figma. Built for the LATAM market context and speed.',               cta: 'Notify me' },
    href: '#connect',
    hasThumb: false,
  },
]

export default function Productos({ lang }) {
  const t = (es, en) => lang === 'es' ? es : en
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const totalCards = products.length + 1 // 3 productos + 1 YouTube

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current
      const cardWidth = 350 + 32 // 350px width + 32px gap
      const newIndex = Math.round(scrollLeft / cardWidth)
      setActiveIndex(Math.min(Math.max(newIndex, 0), totalCards - 1))
    }
  }

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const cardWidth = 350 + 32
      scrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
    }
  }

  const scrollBy = (direction) => {
    const newIndex = Math.min(Math.max(activeIndex + direction, 0), totalCards - 1)
    scrollToIndex(newIndex)
  }

  const handleDragEnd = (event, info) => {
    const cardWidth = 350 + 32
    const threshold = cardWidth / 4 // Threshold for snapping
    const offset = info.offset.x
    let newIndex = activeIndex

    if (Math.abs(offset) > threshold) {
      newIndex = offset > 0 ? Math.max(activeIndex - 1, 0) : Math.min(activeIndex + 1, totalCards - 1)
    }

    setActiveIndex(newIndex)
    scrollToIndex(newIndex)
  }

  useEffect(() => {
    handleScroll()
  }, [])

  return (
    <section id="productos" className="relative z-10 py-24 container mx-auto px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-14">

        {/* Cards Scroll Horizontal */}
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-4 max-w-2xl">
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
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                className="glass inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 shadow-sm transition-opacity duration-200 hover:opacity-100"
                aria-label={t('Scroll left', 'Scroll left')}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                className="glass inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 shadow-sm transition-opacity duration-200 hover:opacity-100"
                aria-label={t('Scroll right', 'Scroll right')}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-8 pb-10 pr-10 scrollbar-hide cursor-grab active:cursor-grabbing"
              style={{
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {/* Tarjetas de productos */}
              {products.map((prod, i) => {
                const Icon = prod.icon
                const c    = lang === 'es' ? prod.es : prod.en
                return (
                  <motion.div
                    key={`prod-${i}`}
                    className="group relative glass rounded-3xl overflow-hidden flex flex-col cursor-pointer flex-shrink-0 snap-start"
                    style={{ width: 'min(90vw, 350px)' }}
                    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: .8, ease: [.16, 1, .3, 1], delay: i * .1 }}
                    whileHover={{ y: -8, scale: 1.015, transition: { duration: .28, ease: 'easeOut' } }}
                  >
                  {/* ── Thumbnail area ─────────────────────────────── */}
                  <div className="w-full relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    {prod.localThumb ? (
                      <>
                        {/* Imagen real con tinte azul encima */}
                        <img
                          src={prod.localThumb}
                          alt={c.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          onError={e => { e.target.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'block' }}
                        />
                        {/* Overlay azul semitransparente — el "filtro de color" */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'linear-gradient(160deg, rgba(81,112,255,0.52) 0%, rgba(65,234,255,0.22) 60%, rgba(0,3,31,0.38) 100%)',
                            mixBlendMode: 'multiply',
                          }}
                        />
                        {/* Gradiente de fade hacia abajo para que se integre con la card */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,3,31,0.55)] via-transparent to-transparent pointer-events-none" />
                      </>
                    ) : null}

                    {/* Placeholder (productos sin imagen) */}
                    <div
                      className="w-full h-full flex-col items-center justify-center gap-2 p-5 text-center"
                      style={{
                        display: prod.localThumb ? 'none' : 'flex',
                        background: `linear-gradient(135deg,${prod.color}18 0%,${prod.color}06 100%)`,
                      }}
                    >
                      <Icon size={32} style={{ color: prod.color, opacity: .5 }} />
                      <span className="text-[13px] font-medium dark:text-white/40 text-black/40 leading-snug max-w-[160px]">
                        {t('Contenido que llega próximamente', 'Content arriving soon')}
                      </span>
                    </div>
                  </div>

                  {/* Glow hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                    style={{ background: `radial-gradient(circle at 50% 0%,${prod.color}10 0%,transparent 60%)` }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right,transparent,${prod.color}55,transparent)` }}
                  ></div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-4 flex-1">
                    <span
                      className="inline-flex items-center gap-1.5 self-start text-[11px] font-bold tracking-[.07em] uppercase px-3 py-1 rounded-full"
                      style={{ background: `${prod.color}18`, color: prod.color, border: `1px solid ${prod.color}25` }}
                    >
                      <span className="w-1 h-1 rounded-full" style={{ background: prod.color }} />
                      {t(prod.tag_es, prod.tag_en)}
                    </span>

                    <div className="flex flex-col gap-2 flex-1">
                      <h3 className="font-cal text-xl dark:text-white text-b-dark leading-snug">{c.title}</h3>
                      <p className="dark:text-white/45 text-black/50 text-sm leading-[1.65]">{c.desc}</p>
                    </div>

                    {prod.notionHref ? (
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={prod.href} target="_blank" rel="noopener noreferrer"
                          className="inline-flex flex-1 min-w-[46%] items-center justify-center gap-1.5 text-[12px] font-semibold px-3 py-2 rounded-xl transition-all duration-200"
                          style={{ background: `${prod.color}18`, color: prod.color, border: `1px solid ${prod.color}30` }}
                        >
                          <Icon size={13} />{c.cta}<ExternalLink size={11} className="opacity-50" />
                        </a>
                        <a
                          href={prod.notionHref} target="_blank" rel="noopener noreferrer"
                          className="inline-flex flex-1 min-w-[46%] items-center justify-center gap-1.5 glass text-[12px] font-semibold px-3 py-2 rounded-xl dark:text-white/85 text-b-dark border dark:border-white/10 border-black/8 transition-all duration-200"
                        >
                          {c.ctaNotion}<ExternalLink size={11} className="opacity-45" />
                        </a>
                      </div>
                    ) : (
                      <a
                        href={prod.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                        style={{ color: prod.color }}
                      >
                        <Icon size={14} />{c.cta}
                      </a>
                    )}
                  </div>
                </motion.div>
              )
            })}

            {/* YouTube Tarjeta */}
            <motion.div
              key="youtube-card"
              className="group relative glass rounded-3xl overflow-hidden flex flex-col cursor-pointer flex-shrink-0 snap-start"
              style={{ width: 'min(90vw, 350px)' }}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: .8, ease: [.16, 1, .3, 1], delay: products.length * .1 }}
              whileHover={{ y: -8, scale: 1.015, transition: { duration: .28, ease: 'easeOut' } }}
            >
              {/* Thumbnail area — Play icon elegante */}
              <div className="w-full relative overflow-hidden flex items-center justify-center" style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, rgba(81,112,255,0.15) 0%, rgba(65,234,255,0.08) 100%)' }}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(160deg, rgba(81,112,255,0.42) 0%, rgba(65,234,255,0.12) 60%, rgba(0,3,31,0.28) 100%)', mixBlendMode: 'multiply' }} />
                <motion.div
                  className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(81,112,255,0.25)', border: '2px solid rgba(81,112,255,0.5)' }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Play size={28} className="text-b-blue fill-b-blue" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,3,31,0.55)] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Glow hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(81,112,255,0.1) 0%, transparent 60%)' }}
              />
              <div
                className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(to right, transparent, rgba(81,112,255,0.55), transparent)' }}
              />

              {/* Content */}
              <div className="p-5 flex flex-col gap-4 flex-1">
                <span
                  className="inline-flex items-center gap-1.5 self-start text-[11px] font-bold tracking-[.07em] uppercase px-3 py-1 rounded-full"
                  style={{ background: 'rgba(81,112,255,0.18)', color: '#5170FF', border: '1px solid rgba(81,112,255,0.25)' }}
                >
                  <span className="w-1 h-1 rounded-full" style={{ background: '#5170FF' }} />
                  {t('Próximamente', 'COMING SOON')}
                </span>

                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-cal text-xl dark:text-white text-b-dark leading-snug">{t('THE UX IS DEAD IN 2026?', 'THE UX IS DEAD IN 2026?')}</h3>
                  <p className="dark:text-white/45 text-black/50 text-sm leading-[1.65]">
                    {t('Estamos preparando una masterclass exclusiva sobre el futuro de las experiencias digitales. Suscríbete para el lanzamiento.', 'We are preparing an exclusive masterclass on the future of digital experiences. Subscribe for the launch.')}
                  </p>
                </div>

                <a
                  href="#connect"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                  style={{ color: '#5170FF' }}
                >
                  <Play size={14} />{t('Suscríbete', 'Subscribe')}
                </a>
              </div>
            </motion.div>
            </div>

          {/* Navigation Buttons - Removed from here, now in header */}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalCards }, (_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-8 bg-white/80'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA ver todos */}
        <motion.div className="flex justify-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: .3 }}>
          <a
            href="https://concentriclab.gumroad.com" target="_blank" rel="noopener noreferrer"
            className="glass inline-flex items-center gap-2.5 dark:text-white/60 text-black/55 hover:dark:text-white hover:text-black text-sm font-semibold px-6 py-3 rounded-full border dark:border-white/8 border-black/8 hover:dark:border-white/16 hover:border-black/16 transition-all duration-300"
          >
            {t('Ver todos los productos', 'View all products')}
            <ExternalLink size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
