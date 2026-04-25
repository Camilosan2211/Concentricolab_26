import { motion } from 'framer-motion'
import { ExternalLink, ShoppingBag, Zap, Layers } from 'lucide-react'

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

  return (
    <section id="productos" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-14">

        {/* Header */}
        <div className="flex flex-col gap-4 max-w-xl">
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
            {t('Herramientas que ', 'Tools that ')}
            <span className="text-grad">{t('construimos', 'we built')}</span>
            {t(' para ti', ' for you')}
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((prod, i) => {
            const Icon = prod.icon
            const c    = lang === 'es' ? prod.es : prod.en
            return (
              <motion.div
                key={i}
                className="group relative glass rounded-3xl overflow-hidden flex flex-col cursor-pointer"
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
                />
                <div
                  className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right,transparent,${prod.color}55,transparent)` }}
                />

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
