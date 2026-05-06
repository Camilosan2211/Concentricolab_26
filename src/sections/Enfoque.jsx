/**
 * Enfoque.jsx — Sección de enfoque rediseñada con ScrollExpandMedia
 *
 * Narrativa en 3 momentos:
 * ─────────────────────────────────────────────────────────────────
 * [1] LLEGADA — Imagen de fondo (imagen_dinamico.webp) + título poético
 *     centrado + 8 palabras flotantes con parallax al mouse.
 *     El usuario siente curiosidad antes de leer.
 *
 * [2] SCROLL — El video (video_dinamico.MP4) se expande dramáticamente
 *     mientras el título se abre hacia los lados y las palabras
 *     flotantes se disuelven. El gesto comunica apertura y profundidad.
 *
 * [3] REVELADO — Una vez expandido, aparece el párrafo original del lab
 *     con animación palabra por palabra en Cal Sans, seguido de los
 *     tags de disciplina y un CTA suave.
 *
 * Assets que debes colocar en /public/assets/images/:
 * ────────────────────────────────────────────────────
 *   imagen_dinamico.webp  → fondo panorámico (ver MEDIA_GUIDE abajo)
 *   video_dinamico.MP4    → video central 16:9, sujeto en 40% central
 *
 * MEDIA_GUIDE (especificaciones de los assets):
 *   Background (bgImageSrc):
 *     - Formato: WebP (o JPEG fallback), mínimo 1920×1080 px
 *     - Contenido: flat lay de herramientas de diseño / workspace
 *       cenital con fondo oscuro. Tonos: navy + coral + neutros cálidos.
 *     - Términos de búsqueda: "dark flatlay design tools overhead"
 *       "creative workspace top view dark background" (Pexels/Unsplash)
 *
 *   Video (mediaSrc):
 *     - Formato: MP4 (H.264) + WebM (VP9)  |  Res: 1920×1080 mínimo
 *     - Loop: 6-12 s sin corte visible
 *     - Sujeto: centrado en el 40% horizontal del frame (survives 3:4 crop)
 *     - Contenido ideal: manos en torno de alfarería, tinta en agua,
 *       arcilla siendo trabajada, linocut artesanal, resin art
 *     - Términos de búsqueda: "pottery wheel hands close up dark"
 *       "clay throwing slow motion loop" (Pexels/Mixkit/Coverr — gratis)
 *     - Comprimir con HandBrake, CRF 28, <6 MB para web
 */

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import ScrollExpandMedia from '../components/ScrollExpandMedia'

/* ── Assets ──────────────────────────────────────────────────────────
   Coloca tus archivos en /public/assets/images/ y actualiza estas rutas.
   En Vite, /public/ se sirve directamente en la raíz.              */
const BG_SRC    = '/assets/images/imagen_dinamico.webp'
const VIDEO_SRC = '/assets/images/video_dinamico.MP4'

/* ── Tags de disciplina ──────────────────────────────────────────── */
const TAGS_ES = ['Diseño', 'Producto & forma', 'Experiencia digital', 'Video', 'Branding', 'Automatización', 'Sistemas visuales']
const TAGS_EN = ['Design', 'Product & form', 'Digital experience', 'Video', 'Branding', 'Automation', 'Visual systems']

/* ── Palabras clave en coral (animación de revelado) ─────────────── */
const CORAL_ES = new Set(['núcleo', 'forma', 'pantalla', 'diseño,', 'producto,'])
const CORAL_EN = new Set(['core', 'form', 'screen', 'design,', 'product,'])

/* ── RevealedText — párrafo original animado palabra por palabra ──── */
function RevealedText({ lang }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  /* ★ Párrafo original extraído de la sección Enfoque anterior ★
     Preservado exactamente, solo se activa tras la expansión del video. */
  const text = lang === 'es'
    ? 'Construimos desde el núcleo hacia afuera — de la forma al sistema, del objeto a la pantalla — integrando diseño, producto, automatización e inteligencia artificial en piezas digitales que funcionan y comunican.'
    : 'We build from the core outward — from form to system, from object to screen — integrating design, product, automation and artificial intelligence into digital pieces that work and communicate.'

  const coralSet = lang === 'es' ? CORAL_ES : CORAL_EN
  const tags     = lang === 'es' ? TAGS_ES   : TAGS_EN
  const words    = text.split(' ')
  const t        = (es, en) => lang === 'es' ? es : en

  return (
    <div
      className="max-w-[900px] mx-auto flex flex-col items-center gap-10"
      aria-label={text}
    >

      {/* Divider editorial */}
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

      {/* ── Párrafo animado — Cal Sans como "anotación de autor" ──
           Cada palabra aparece individualmente con blur→clear.
           Las palabras clave pulsan en coral.
           Estilo: densidad alta, lectura meditada, no un bloque plano. */}
      <p
        ref={ref}
        className="font-cal text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.28] tracking-[-0.3px] text-center"
      >
        {words.map((word, i) => {
          const isCoral = coralSet.has(word)
          return (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={{
                opacity: 0, y: 14,
                filter: 'blur(5px)',
                color: 'rgba(140, 148, 180, 0.32)',
              }}
              animate={inView ? {
                opacity: 1, y: 0,
                filter: 'blur(0px)',
                color: isCoral ? '#FF6D4D' : 'var(--enfoque-text, #F5F5F0)',
                ...(isCoral ? {
                  textShadow: ['0 0 8px rgba(255,109,77,0)', '0 0 20px rgba(255,109,77,0.5)', '0 0 8px rgba(255,109,77,0)'],
                } : {}),
              } : { opacity: 0, y: 14, filter: 'blur(5px)', color: 'rgba(140,148,180,0.32)' }}
              transition={{
                delay:    i * 0.048,
                duration: 0.55,
                ease:     [0.16, 1, 0.3, 1],
                textShadow: isCoral
                  ? { duration: 2, delay: i * 0.048 + 0.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                  : undefined,
              }}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </motion.span>
          )
        })}
      </p>

      {/* ── Tags de disciplina — aparecen tras el texto ──────────── */}
      <motion.div
        className="flex flex-wrap justify-center gap-2.5"
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.065,
              delayChildren: words.length * 0.048 + 0.15,
            },
          },
        }}
      >
        {tags.map((tag, i) => (
          <motion.span
            key={i}
            className="inline-flex items-center glass-blue text-b-blue-lt text-[12px] font-semibold px-4 py-2 rounded-full border border-b-blue/18"
            variants={{
              hidden: { opacity: 0, scale: 0.84, rotate: -4 },
              show:   {
                opacity: 1, scale: 1, rotate: 0,
                transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
              },
            }}
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>

      {/* ── CTA suave — invita a seguir sin presionar ─────────────── */}
      <motion.div
        className="flex flex-col items-center gap-2 pb-8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: words.length * 0.048 + 0.9, duration: 0.6 }}
      >
        <a
          href="#capacidades"
          className="group inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.10em] uppercase dark:text-white/40 text-black/50 hover:dark:text-white hover:text-black transition-colors duration-250"
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
    /*
     * z-index: 20 — sobre el fondo (z-0) y film-grain (z-2),
     * por debajo del navbar fijo (z-50).
     *
     * Los gradientes superior e inferior crean una transición fluida
     * con las secciones adyacentes sin bordes bruscos.
     */
    <section
      id="enfoque"
      className="relative overflow-hidden"
      style={{ zIndex: 20 }}
      aria-label={t('Nuestro enfoque', 'Our approach')}
    >
      {/* Gradiente superior — funde con el fondo oscuro del Hero */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, #00031F 0%, transparent 100%)',
          zIndex: 30,
          pointerEvents: 'none',
        }}
      />

      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={VIDEO_SRC}
        bgImageSrc={BG_SRC}
        title={t('Del objeto a la pantalla.', 'From object to screen.')}
        date={t('Desde el núcleo', 'From the core')}
        scrollToExpand={t('Desplázate para descubrir ↓', 'Scroll to discover ↓')}
        textBlend={false}
      >
        <RevealedText lang={lang} />
      </ScrollExpandMedia>

      {/* Gradiente inferior — funde con la siguiente sección */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '100px',
          background: 'linear-gradient(to top, #00031F 0%, transparent 100%)',
          zIndex: 30,
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
