import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import ScrollExpandMedia from '../components/ScrollExpandMedia'

/* ── Assets ────────────────────────────────────────────────────────── */
const BG_SRC      = '/assets/images/imagen_dinamico.webp'
const LOTTIE_SRC  = '/assets/images/efectos.json'

const coralSet = new Set([
  'diseño',
  'forma',
  'sistema',
  'objeto',
  'pantalla',
  'automatización',
  'inteligencia',
  'marcas',
  'productos',
  'experiencias',
  'design',
  'form',
  'system',
  'object',
  'screen',
  'automation',
  'intelligence',
  'brands',
  'products',
  'experiences',
])

/* ── RevealedText ────────────────────────────────────────────────── */
function RevealedText({ lang }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const text = lang === 'es'
    ? 'Construimos desde el núcleo hacia afuera — de la forma al sistema, del objeto a la pantalla — combinando diseño, automatización e inteligencia aplicada para crear marcas, productos y experiencias que funcionan y comunican.'
    : 'We build from the core outward — from form to system, from object to screen — combining design, automation and applied intelligence to create brands, products and experiences that work and communicate.'

  const words = text.split(' ')

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 items-end w-full">

      {/* Columna izquierda — label + párrafo animado */}
      <div className="flex flex-col gap-3">
        <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/35 mb-1">
          {lang === 'es' ? 'Nuestro enfoque' : 'Our approach'}
        </p>
        <p
          ref={ref}
          className="font-cal text-base sm:text-lg leading-[1.4] tracking-[-0.15px] text-white/85"
          style={{ maxWidth: '42ch' }}
        >
          {words.map((word, i) => {
            const isCoral = coralSet.has(word.toLowerCase().replace(/[^a-záéíóúüñ]/gi, ''))
            return (
              <motion.span
                key={i}
                aria-hidden="true"
                initial={{ opacity: 0, y: 8, filter: 'blur(3px)', color: 'rgba(140,148,180,0.25)' }}
                animate={inView ? {
                  opacity: 1, y: 0, filter: 'blur(0px)',
                  color: isCoral ? '#FF6D4D' : 'rgba(245,245,240,0.85)',
                  ...(isCoral ? { textShadow: ['0 0 8px rgba(255,109,77,0)', '0 0 18px rgba(255,109,77,0.5)', '0 0 8px rgba(255,109,77,0)'] } : {}),
                } : { opacity: 0, y: 8, filter: 'blur(3px)', color: 'rgba(140,148,180,0.25)' }}
                transition={{
                  delay: i * 0.035,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                  ...(isCoral ? { textShadow: { duration: 2, delay: i * 0.035 + 0.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' } } : {}),
                }}
                style={{ display: 'inline-block', marginRight: '0.22em' }}
              >
                {word}
              </motion.span>
            )
          })}
        </p>
      </div>

      {/* Columna derecha — tags pills */}
      <div className="flex flex-col gap-3 md:items-end">
        <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/35 hidden md:block mb-1">
          {lang === 'es' ? 'Capacidades' : 'Capabilities'}
        </p>
        <motion.div
          className="flex flex-wrap gap-2 md:justify-end"
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.055, delayChildren: words.length * 0.035 + 0.1 } },
          }}
        >
          {[
            { es: 'Diseño', en: 'Design' },
            { es: 'Producto · forma', en: 'Product · form' },
            { es: 'Experiencia digital', en: 'Digital experience' },
            { es: 'Branding', en: 'Branding' },
            { es: 'Sistemas visuales', en: 'Visual systems' },
            { es: 'Video · contenido', en: 'Video · content' },
            { es: 'Automatización · IA', en: 'Automation · AI' },
          ].map((tag, i) => (
            <motion.span
              key={i}
              className="inline-flex items-center glass-blue text-b-blue-lt text-[11px] font-semibold px-3 py-1.5 rounded-full border border-b-blue/18"
              variants={{
                hidden: { opacity: 0, scale: 0.84, rotate: -3 },
                show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } },
              }}
            >
              {lang === 'es' ? tag.es : tag.en}
            </motion.span>
          ))}
        </motion.div>
      </div>

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
          mediaType="lottie"
          mediaSrc={LOTTIE_SRC}
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
