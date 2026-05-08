import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import ScrollExpandMedia from '../components/ScrollExpandMedia'

/* ── Assets ────────────────────────────────────────────────────────── */
const BG_SRC    = '/assets/images/imagen_dinamico.webp'
const VIDEO_SRC = '/assets/images/video_dinamico.mp4'

/* ── Tags ────────────────────────────────────────────────────────── */
const TAGS_ES = ['Diseño', 'Producto & forma', 'Experiencia digital', 'Branding', 'Sistemas visuales', 'Video & contenido', 'Automatización']
const TAGS_EN = ['Design', 'Product & form', 'Digital experience', 'Branding', 'Visual systems', 'Video & CONTENT', 'Automation']

const CORAL_ES = new Set(['núcleo', 'forma', 'sistema', 'objeto', 'pantalla', 'diseño,'])
const CORAL_EN = new Set(['core', 'form', 'system', 'object', 'screen', 'design,'])

/* ── RevealedText ────────────────────────────────────────────────── */
function RevealedText({ lang }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const text = lang === 'es'
    ? 'Construimos desde el núcleo hacia afuera — de la forma al sistema, del objeto a la pantalla — combinando diseño, automatización e inteligencia aplicada para crear marcas, productos y experiencias que funcionan y comunican.'
    : 'We build from the core outward — from form to system, from object to screen — combining design, automation and applied intelligence to create brands, products and experiences that work and communicate.'

  const coralSet = lang === 'es' ? CORAL_ES : CORAL_EN
  const tags     = lang === 'es' ? TAGS_ES   : TAGS_EN
  const words    = text.split(' ')

  return (
    <div className="flex flex-col items-center gap-8">

      {/* Párrafo */}
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
          subtitle={t('Diseño, automatización e inteligencia', 'Design, automation & intelligence')}
        >
          <RevealedText lang={lang} />
        </ScrollExpandMedia>
      </div>
    </section>
  )
}
