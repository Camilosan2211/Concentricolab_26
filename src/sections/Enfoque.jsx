import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import ScrollExpandMedia from '../components/ScrollExpandMedia'

/* ── Assets ────────────────────────────────────────────────────────── */
const BG_SRC    = '/assets/images/imagen_dinamico.webp'
const VIDEO_SRC = '/assets/images/video_dinamico.mp4'

const COLOR_MAP = new Map([
  ['diseño',          '#FF6D4D'],
  ['forma',           '#4D66FF'],
  ['sistema',         '#828AFF'],
  ['objeto',          '#41EAFF'],
  ['pantalla',        '#FF6D4D'],
  ['automatización',  '#4D66FF'],
  ['inteligencia',    '#828AFF'],
  ['marcas',          '#FF6D4D'],
  ['productos',       '#41EAFF'],
  ['experiencias',    '#828AFF'],
  ['design',          '#FF6D4D'],
  ['form',            '#4D66FF'],
  ['system',          '#828AFF'],
  ['object',          '#41EAFF'],
  ['screen',          '#FF6D4D'],
  ['automation',      '#4D66FF'],
  ['intelligence',    '#828AFF'],
  ['brands',          '#FF6D4D'],
  ['products',        '#41EAFF'],
  ['experiences',     '#828AFF'],
])

/* ── RevealedText ────────────────────────────────────────────────── */
function RevealedText({ lang }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const text = lang === 'es'
    ? 'Construimos desde el núcleo hacia afuera — de la forma al sistema, del objeto a la pantalla — combinando diseño, automatización e inteligencia aplicada para crear marcas, productos y experiencias que funcionan y comunican.'
    : 'We build from the core outward — from form to system, from object to screen — combining design, automation and applied intelligence to create brands, products and experiences that work and communicate.'

  const words = text.split(' ')

  const tags = [
    { es: 'Diseño',               en: 'Design'           },
    { es: 'Producto & forma',     en: 'Product & form'   },
    { es: 'Experiencia digital',  en: 'Digital experience'},
    { es: 'Branding',             en: 'Branding'         },
    { es: 'Sistemas visuales',    en: 'Visual systems'   },
    { es: 'Video & contenido',    en: 'Video & content'  },
    { es: 'Automatización & IA',  en: 'Automation & AI'  },
  ]

  return (
    <div className="flex flex-col items-center gap-8">

      {/* Párrafo */}
      <p
        ref={ref}
        className="font-cal text-lg sm:text-xl md:text-2xl leading-[1.35] tracking-[-0.2px] text-center max-w-[720px] dark:text-white/80 text-black/60"
      >
        {words.map((word, i) => {
          const accentColor = COLOR_MAP.get(word.toLowerCase().replace(/[^a-záéíóúñü]/gi, ''))
          return (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)', color: 'rgba(140,148,180,0.30)' }}
              animate={inView ? {
                opacity: 1, y: 0, filter: 'blur(0px)',
                color: accentColor ?? 'var(--enfoque-text, #F5F5F0)',
                ...(accentColor ? { textShadow: [`0 0 8px ${accentColor}00`, `0 0 20px ${accentColor}80`, `0 0 8px ${accentColor}00`] } : {}),
              } : { opacity: 0, y: 10, filter: 'blur(4px)', color: 'rgba(140,148,180,0.30)' }}
              transition={{
                delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1],
                textShadow: accentColor ? { duration: 2, delay: i * 0.04 + 0.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' } : undefined,
              }}
              style={{ display: 'inline-block', marginRight: '0.22em' }}
            >
              {word}
            </motion.span>
          )
        })}
      </p>

      <motion.div
        className="flex flex-wrap justify-center gap-2.5 mt-6"
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.055,
              delayChildren: words.length * 0.04 + 0.12,
            },
          },
        }}
      >
        {tags.map((tag, i) => (
          <motion.span
            key={i}
            className="inline-flex items-center glass-blue text-b-blue-lt text-[11px] font-semibold px-3.5 py-1.5 rounded-full border border-b-blue/18"
            variants={{
              hidden: { opacity: 0, scale: 0.84, rotate: -4 },
              show: {
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                },
              },
            }}
          >
            {lang === 'es' ? tag.es : tag.en}
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
