import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import ScrollExpandMedia from '../components/ScrollExpandMedia'

/* ── Assets ────────────────────────────────────────────────────────── */
const BG_SRC      = '/assets/images/imagen_dinamico.webp'
const LOTTIE_SRC  = '/assets/images/efectos.json'

const coralSet = new Set([
  'núcleo', 'nucleo', 'forma', 'pantalla',
  'core', 'form', 'screen',
])

/* ── RevealedText ────────────────────────────────────────────────── */
function RevealedText({ lang }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const text = lang === 'es'
    ? 'Construimos desde el núcleo hacia afuera — de la forma al sistema, del objeto a la pantalla — combinando diseño, automatización e inteligencia aplicada para crear marcas, productos y experiencias que funcionan y comunican.'
    : 'We build from the core outward — from form to system, from object to screen — combining design, automation and applied intelligence to create brands, products and experiences that work and communicate.'

  const words = text.split(' ')
  const half = Math.ceil(words.length / 2)
  const wordsLeft = words.slice(0, half)
  const wordsRight = words.slice(half)

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex items-center">

      {/* LEFT zone — first half of paragraph */}
      <div className="hidden md:flex w-[28%] h-full flex-col justify-center items-start px-6 gap-2">
        <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/30 mb-1">
          {lang === 'es' ? 'Enfoque' : 'Approach'}
        </p>
        <p
          ref={ref}
          className="font-cal text-xs md:text-sm leading-[1.5] text-white/90"
          style={{ maxWidth: '180px', wordBreak: 'break-word' }}
        >
          {wordsLeft.map((word, i) => {
            const isCoral = coralSet.has(word.toLowerCase().replace(/[^a-záéíóúüñ]/gi, ''))
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -8, filter: 'blur(4px)' }}
                animate={inView ? {
                  opacity: 1, x: 0, filter: 'blur(0px)',
                  color: isCoral ? '#FF6D4D' : 'rgba(245,245,240,0.90)',
                } : { opacity: 0, x: -8, filter: 'blur(4px)' }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', marginRight: '0.22em' }}
              >
                {word}
              </motion.span>
            )
          })}
        </p>
      </div>

      {/* CENTER — empty, video shows through */}
      <div className="flex-1" />

      {/* RIGHT zone — second half of paragraph */}
      <div className="hidden md:flex w-[28%] h-full flex-col justify-center items-end px-6 gap-2 text-right">
        <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/30 mb-1">
          {lang === 'es' ? 'Sistema' : 'System'}
        </p>
        <p
          className="font-cal text-xs md:text-sm leading-[1.5] text-white/90"
          style={{ maxWidth: '180px', wordBreak: 'break-word' }}
        >
          {wordsRight.map((word, i) => {
            const isCoral = coralSet.has(word.toLowerCase().replace(/[^a-záéíóúüñ]/gi, ''))
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: 8, filter: 'blur(4px)' }}
                animate={inView ? {
                  opacity: 1, x: 0, filter: 'blur(0px)',
                  color: isCoral ? '#FF6D4D' : 'rgba(245,245,240,0.90)',
                } : { opacity: 0, x: 8, filter: 'blur(4px)' }}
                transition={{ delay: (half + i) * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', marginRight: '0.22em' }}
              >
                {word}
              </motion.span>
            )
          })}
        </p>
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

        {/* Disciplinas — debajo del video */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mt-6 px-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
          }}
        >
          {[
            { es: 'Diseño de producto', en: 'Product design' },
            { es: 'Experiencia digital', en: 'Digital experience' },
            { es: 'Branding', en: 'Branding' },
            { es: 'Sistemas visuales', en: 'Visual systems' },
            { es: 'Video · contenido', en: 'Video · content' },
            { es: 'Automatización · IA', en: 'Automation · AI' },
          ].map((tag, i) => (
            <motion.span
              key={i}
              className="glass-blue text-b-blue-lt text-[11px] font-semibold px-3 py-1.5 rounded-full border border-b-blue/18"
              variants={{
                hidden: { opacity: 0, scale: 0.8, rotate: -4 },
                show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
              }}
            >
              {lang === 'es' ? tag.es : tag.en}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
