import { useState } from 'react'
import ScrollExpandMedia from '../components/ScrollExpandMedia'
import TypewriterText from '../components/TypewriterText'
import TagsRow from '../components/TagsRow'

/* ── Assets ────────────────────────────────────────────────────────── */
const BG_SRC      = '/assets/images/imagen_dinamico.webp'
const LOTTIE_SRC  = '/assets/images/efectos.json'

/* ── Componente principal ─────────────────────────────────────────── */
export default function Enfoque({ lang }) {
  const t = (es, en) => lang === 'es' ? es : en
  const [textDone, setTextDone] = useState(false)

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
          />

          {/* Text and tags below video */}
          <div className="relative z-40 flex flex-col items-center text-center px-6 pt-10 pb-8 gap-8">
            <TypewriterText lang={lang} onComplete={() => setTextDone(true)} />
            <TagsRow lang={lang} visible={textDone} />
          </div>
        </div>
      </div>
    </section>
  )
}
