import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import ScrollExpandMedia from '../components/ScrollExpandMedia'

/* ── Assets ────────────────────────────────────────────────────────── */
const BG_SRC    = '/assets/images/imagen_dinamico.webp'
const VIDEO_SRC = '/assets/images/video_dinamico.mp4'

/* ── Tags ────────────────────────────────────────────────────────── */
const TAGS_ES = ['Diseño', 'Producto & forma', 'Experiencia digital', 'Video', 'Branding', 'Automatización', 'Sistemas visuales']
const TAGS_EN = ['Design', 'Product & form', 'Digital experience', 'Video', 'Branding', 'Automation', 'Visual systems']

const CORAL_ES = new Set(['núcleo', 'forma', 'pantalla', 'diseño,', 'producto,'])
const CORAL_EN = new Set(['core', 'form', 'screen', 'design,', 'product,'])

/* ── RevealedText ────────────────────────────────────────────────── */
function RevealedText({ lang }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const text = lang === 'es'
    ? 'Construimos desde el núcleo hacia afuera — de la forma al sistema, del objeto a la pantalla — integrando diseño, producto, automatización e inteligencia artificial en piezas digitales que funcionan y comunican.'
    : 'We build from the core outward — from form to system, from object to screen — integrating design, product, automation and artificial intelligence into digital pieces that work and communicate.'

  const coralSet = lang === 'es' ? CORAL_ES : CORAL_EN
  const tags     = lang === 'es' ? TAGS_ES   : TAGS_EN
  const words    = text.split(' ')
  const t        = (es, en) => lang === 'es' ? es : en

  return (
    <div className="flex flex-col items-center gap-8">

      {/* Divider */}
      <motion.div
        className="flex items-center gap-4 w-full max-w-sm"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1 h-px dark:bg-white/10 bg-black/12" />
        <span className="text-[10px] font-bold tracking-[0.14em] uppercase dark:text-white/30 text-black/40">
          {t('El enfoque', 'The approach')}
        </span>
        <div className="flex-1 h-px dark:bg-white/10 bg-black/12" />
      </motion.div>

      {/* Párrafo — tipografía más pequeña */}
      <p
        ref={ref}
        className="font-cal text-lg sm:text-xl md:text-2xl leading-[1.35] tracking-[-0.2px] text-center max-w-[720px] dark:text-white/80 text-black/60"
      >
        {words.map((word, i) => {
          const isCoral = coralSet.has(word)
          return (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)', color: 'rgba(140,148,180,0.30)' }}
              animate={inView ? {
                opacity: 1, y: 0, filter: 'blur(0px)',
                color: isCoral ? '#FF6D4D' : 'var(--enfoque-text, #F5F5F0)',
                ...(isCoral ? { textShadow: ['0 0 8px rgba(255,109,77,0)', '0 0 20px rgba(255,109,77,0.5)', '0 0 8px rgba(255,109,77,0)'] } : {}),
              } : { opacity: 0, y: 10, filter: 'blur(4px)', color: 'rgba(140,148,180,0.30)' }}
              transition={{
                delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1],
                textShadow: isCoral ? { duration: 2, delay: i * 0.04 + 0.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' } : undefined,
              }}
              style={{ display: 'inline-block', marginRight: '0.22em' }}
            >
              {word}
            </motion.span>
          )
        })}
      </p>

      {/* Tags */}
      <motion.div
        className="flex flex-wrap justify-center gap-2.5"
        initial="hidden" animate={inView ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: words.length * 0.04 + 0.12 } } }}
      >
        {tags.map((tag, i) => (
          <motion.span
            key={i}
            className="inline-flex items-center glass-blue text-b-blue-lt text-[11px] font-semibold px-3.5 py-1.5 rounded-full border border-b-blue/18"
            variants={{ hidden: { opacity: 0, scale: 0.84, rotate: -4 }, show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } } }}
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: words.length * 0.04 + 0.7, duration: 0.6 }}
      >
        <a
          href="#capacidades"
          className="group inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.10em] uppercase dark:text-white/40 text-black/50 hover:dark:text-white hover:text-black transition-colors duration-250"
        >
          <span className="h-px w-6 dark:bg-white/25 bg-black/25 group-hover:w-10 transition-all duration-300" aria-hidden="true" />
          {t('Descubrir capacidades', 'Discover capabilities')}
          <span className="h-px w-6 dark:bg-white/25 bg-black/25 group-hover:w-10 transition-all duration-300" aria-hidden="true" />
        </a>
      </motion.div>

    </div>
  )
}

/* ── Componente principal ─────────────────────────────────────────── */
export default function Enfoque({ lang }) {
  const t = (es, en) => lang === 'es' ? es : en

  return (
    <section
      id="enfoque"
      className="relative py-12 md:py-16 px-4 overflow-hidden bg-transparent"
      aria-label={t('Nuestro enfoque', 'Our approach')}
    >
      <div className="max-w-[1400px] mx-auto">
        <ScrollExpandMedia
          mediaType="video"
          mediaSrc={VIDEO_SRC}
          bgImageSrc={BG_SRC}
          title={t('Del objeto a la pantalla.', 'From object to screen.')}
          subtitle={t('Diseño, sistemas y criterio', 'From the core')}
          textBlend={false}
        >
          <RevealedText lang={lang} />
        </ScrollExpandMedia>
      </div>
    </section>
  )
}
