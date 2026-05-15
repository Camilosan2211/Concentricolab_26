import { motion } from 'motion/react'
import ScrollExpandMedia from '../components/ScrollExpandMedia'

/* ── Assets ────────────────────────────────────────────────────────── */
const BG_SRC      = '/assets/images/imagen_dinamico.webp'
const LOTTIE_SRC  = '/assets/images/efectos.json'

/* ── Componente principal ─────────────────────────────────────────── */
export default function Enfoque({ lang }) {
  const t = (es, en) => lang === 'es' ? es : en

  return (
    <section
      id="enfoque"
      className="relative py-12 md:py-16 px-4 bg-transparent"
      style={{ overflow: 'visible' }}
      aria-label={t('Nuestro enfoque', 'Our approach')}
    >
      {/* Fade lateral izquierdo */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-20"
        style={{
          width: '26%',
          background: 'linear-gradient(to right, #0D0E1A 0%, #0D0E1A 10%, rgba(13,14,26,0.92) 30%, rgba(13,14,26,0.65) 55%, rgba(13,14,26,0.25) 78%, rgba(13,14,26,0.05) 92%, transparent 100%)',
        }}
      />

      {/* Fade lateral derecho */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-20"
        style={{
          width: '26%',
          background: 'linear-gradient(to left, #0D0E1A 0%, #0D0E1A 10%, rgba(13,14,26,0.92) 30%, rgba(13,14,26,0.65) 55%, rgba(13,14,26,0.25) 78%, rgba(13,14,26,0.05) 92%, transparent 100%)',
        }}
      />

      <div className="max-w-[1600px] mx-auto">
        <div className="relative w-full">

          {/* Layer 4 — Video (inside ScrollExpandMedia) */}
          <ScrollExpandMedia
            mediaType="lottie"
            mediaSrc={LOTTIE_SRC}
            bgImageSrc={BG_SRC}
            title={t('Del objeto a la pantalla.', 'From object to screen.')}
            subtitle={t('Diseño, automatización e inteligencia', 'Design, automation & intelligence')}
            bottomOverlay={
              <motion.div
                className="flex flex-wrap justify-center gap-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
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
                      hidden: { opacity: 0, scale: 0.8, y: 10 },
                      show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
                    }}
                  >
                    {lang === 'es' ? tag.es : tag.en}
                  </motion.span>
                ))}
              </motion.div>
            }
          >
          </ScrollExpandMedia>

          {/* Layer 2 — Glass pills over the video */}
          <div className="pointer-events-none absolute inset-0 z-50 hidden md:flex items-center justify-between px-0">

            {/* Left pill */}
            <motion.div
              initial={{ opacity: 0, x: -28, scale: 0.88, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="ml-8"
              style={{
                background: 'rgba(13,14,26,0.50)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px',
                padding: '20px 18px',
                maxWidth: '165px',
                zIndex: 50,
              }}
            >
              <span style={{
                display: 'block',
                fontSize: '0.62rem',
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.38)',
                marginBottom: '10px',
              }}>
                {lang === 'es' ? 'Enfoque' : 'Approach'}
              </span>
              <p style={{
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.92)',
                margin: 0,
              }}>
                {lang === 'es'
                  ? <>Construimos desde el <span style={{ color: '#FF6D4D', fontWeight: 700 }}>núcleo</span> hacia afuera — de la <span style={{ color: '#FF6D4D', fontWeight: 700 }}>forma</span> al sistema, del objeto a la <span style={{ color: '#FF6D4D', fontWeight: 700 }}>pantalla</span></>
                  : <>We build from the <span style={{ color: '#FF6D4D', fontWeight: 700 }}>core</span> outward — from <span style={{ color: '#FF6D4D', fontWeight: 700 }}>form</span> to system, from object to <span style={{ color: '#FF6D4D', fontWeight: 700 }}>screen</span></>
                }
              </p>
            </motion.div>

            {/* Right pill */}
            <motion.div
              initial={{ opacity: 0, x: 28, scale: 0.88, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="mr-8"
              style={{
                background: 'rgba(13,14,26,0.50)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px',
                padding: '20px 18px',
                maxWidth: '165px',
                textAlign: 'right',
                zIndex: 50,
              }}
            >
              <span style={{
                display: 'block',
                fontSize: '0.62rem',
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.38)',
                marginBottom: '10px',
              }}>
                {lang === 'es' ? 'Sistema' : 'System'}
              </span>
              <p style={{
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.92)',
                margin: 0,
              }}>
                {lang === 'es'
                  ? <>combinando <span style={{ color: '#828AFF', fontWeight: 700 }}>diseño</span>, <span style={{ color: '#828AFF', fontWeight: 700 }}>automatización</span> e <span style={{ color: '#828AFF', fontWeight: 700 }}>inteligencia</span> aplicada para crear marcas, productos y experiencias que funcionan y comunican.</>
                  : <>combining <span style={{ color: '#828AFF', fontWeight: 700 }}>design</span>, <span style={{ color: '#828AFF', fontWeight: 700 }}>automation</span> and applied <span style={{ color: '#828AFF', fontWeight: 700 }}>intelligence</span> to create brands, products and experiences that work and communicate.</>
                }
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
