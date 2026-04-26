import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const tags_es = ['Diseño UX/UI', 'IA Generativa', 'Branding', 'Diseño Industrial', 'Métricas', 'Automatización', 'Data storytelling']
const tags_en = ['UX/UI Design', 'Generative AI', 'Branding', 'Industrial Design', 'Metrics', 'Automation', 'Data storytelling']

const CORAL_ES = new Set(['núcleo', 'sistema,', 'solución', 'diseño,', 'IA', 'automatización.'])
const CORAL_EN = new Set(['core', 'system,', 'solution', 'design,', 'AI', 'automation.'])

export default function Enfoque({ lang }) {
  const ref    = useRef()
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const text     = lang === 'es'
    ? 'Construimos desde el núcleo hacia afuera — del usuario al sistema, del problema a la solución — combinando diseño, IA y automatización.'
    : 'We build from the core outward — from the user to the system, from the problem to the solution — combining design, AI and automation.'

  const coralSet = lang === 'es' ? CORAL_ES : CORAL_EN
  const tags     = lang === 'es' ? tags_es : tags_en

  // Dividimos por PALABRA (no caracter) para mantener word-wrap correcto.
  // Dentro de cada palabra animamos caracter por caracter.
  const words = text.split(' ')

  // Índice global de caracter para calcular el delay
  let globalCharIdx = 0

  return (
    <section id="enfoque" className="py-20 px-6 relative overflow-hidden">
      <div
        className="absolute top-[-60px] right-[-40px] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(81,112,255,.07) 0%,transparent 70%)', filter: 'blur(40px)' }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-10">

        {/* Badge */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: .6 }}
        >
          <span className="glass-blue inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[.07em] uppercase text-b-blue-lt px-3 py-1.5 rounded-full border border-b-blue/20">
            👋 {lang === 'es' ? 'hola' : 'hello'}
          </span>
          <span className="text-[12px] dark:text-white/40 text-black/40 font-semibold tracking-[.1em] uppercase">
            {lang === 'es' ? 'Nuestro enfoque' : 'Our approach'}
          </span>
        </motion.div>

        {/* Texto carácter por carácter — centrado y con word-wrap correcto */}
        <p
          ref={ref}
          className="font-cal text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.22] tracking-[-0.5px] dark:text-white text-b-dark"
          aria-label={text}
          style={{
            textAlign: 'center',
            width: '100%',
            maxWidth: '820px',
            /* Permitir que el texto fluya y se centre correctamente */
            wordBreak: 'break-word',
          }}
        >
          {words.map((word, wi) => {
            const isCoral = coralSet.has(word)
            const chars   = word.split('')
            const wordStart = globalCharIdx
            globalCharIdx  += word.length + 1 // +1 por el espacio

            return (
              /* Cada palabra es un span que no rompe internamente pero sí entre palabras */
              <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {chars.map((ch, ci) => {
                  const charDelay = (wordStart + ci) * 0.016
                  return (
                    <motion.span
                      key={ci}
                      aria-hidden="true"
                      style={{ display: 'inline' }}
                      initial={{ color: 'rgba(130,138,170,0.22)' }}
                      animate={inView
                        ? { color: isCoral ? '#FF6D4D' : 'inherit' }
                        : { color: 'rgba(130,138,170,0.22)' }
                      }
                      transition={{ delay: charDelay, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {ch}
                    </motion.span>
                  )
                })}
                {/* Espacio entre palabras — visible y permite word-wrap */}
                {wi < words.length - 1 && (
                  <motion.span
                    aria-hidden="true"
                    style={{ display: 'inline' }}
                    initial={{ color: 'rgba(130,138,170,0.22)' }}
                    animate={inView
                      ? { color: 'inherit' }
                      : { color: 'rgba(130,138,170,0.22)' }
                    }
                    transition={{ delay: (wordStart + word.length) * 0.016, duration: 0.38 }}
                  >
                    {' '}
                  </motion.span>
                )}
              </span>
            )
          })}
        </p>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-2.5 mt-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: .07 } } }}
        >
          {tags.map((tag, i) => (
            <motion.span
              key={i}
              className="inline-flex items-center gap-1.5 glass-blue text-b-blue-lt text-[12px] font-semibold px-4 py-2 rounded-full border border-b-blue/18"
              variants={{
                hidden: { opacity: 0, scale: .88, rotate: -3 },
                show:   { opacity: 1, scale: 1,   rotate:  0, transition: { duration: .5, ease: [.34, 1.56, .64, 1] } },
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
