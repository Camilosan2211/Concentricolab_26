import ScrollExpandMedia from '../components/ScrollExpandMedia'
import TagsRow from '../components/TagsRow'

const BG_SRC      = '/assets/images/imagen_dinamico.webp'
const LOTTIE_SRC  = '/assets/images/efectos.json'

const gradientStyle = {
  background: 'linear-gradient(135deg, #5170FF 0%, #828AFF 55%, #FF6D4D 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

function Paragraph({ lang }) {
  if (lang === 'es') {
    return (
      <>
        Construimos{' '}
        <span style={gradientStyle}>desde el núcleo hacia afuera</span>
        {' — de la forma al sistema, del objeto a la pantalla — combinando '}
        <span style={{ color: '#FF6D4D' }}>diseño</span>
        {', '}
        <span style={{ color: '#41EAFF' }}>automatización</span>
        {' e inteligencia aplicada para crear '}
        <span style={gradientStyle}>marcas, productos y experiencias</span>
        {' que funcionan y comunican.'}
      </>
    )
  }
  return (
    <>
      We build{' '}
      <span style={gradientStyle}>from the core outward</span>
      {' — from form to system, from object to screen — combining '}
      <span style={{ color: '#FF6D4D' }}>design</span>
      {', '}
      <span style={{ color: '#41EAFF' }}>automation</span>
      {' and applied intelligence to create '}
      <span style={gradientStyle}>brands, products and experiences</span>
      {' that work and communicate.'}
    </>
  )
}

export default function Enfoque({ lang }) {
  const t = (es, en) => lang === 'es' ? es : en

  return (
    <section
      id="enfoque"
      className="relative py-12 md:py-16 px-4 bg-transparent"
      style={{ overflow: 'visible' }}
      aria-label={t('Nuestro enfoque', 'Our approach')}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-20"
        style={{
          width: '26%',
          background: 'linear-gradient(to right, #0D0E1A 0%, #0D0E1A 10%, rgba(13,14,26,0.92) 30%, rgba(13,14,26,0.65) 55%, rgba(13,14,26,0.25) 78%, rgba(13,14,26,0.05) 92%, transparent 100%)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-20"
        style={{
          width: '26%',
          background: 'linear-gradient(to left, #0D0E1A 0%, #0D0E1A 10%, rgba(13,14,26,0.92) 30%, rgba(13,14,26,0.65) 55%, rgba(13,14,26,0.25) 78%, rgba(13,14,26,0.05) 92%, transparent 100%)',
        }}
      />

      <div className="max-w-[1600px] mx-auto">
        <div className="relative w-full">

          <ScrollExpandMedia
            mediaType="lottie"
            mediaSrc={LOTTIE_SRC}
            bgImageSrc={BG_SRC}
            title={t('Del objeto a la pantalla.', 'From object to screen.')}
            subtitle={t('Diseño, automatización e inteligencia', 'Design, automation & intelligence')}
          />

          <div className="relative z-40 flex flex-col items-center text-center px-6 pt-10 pb-8 gap-8">
            <p
              className="font-cal"
              style={{
                fontSize: 'clamp(1.45rem, 3.2vw, 2.1rem)',
                lineHeight: 1.35,
                letterSpacing: '-0.02em',
                color: 'rgba(255,255,255,0.90)',
                maxWidth: '780px',
              }}
            >
              <Paragraph lang={lang} />
            </p>

            <TagsRow />
          </div>
        </div>
      </div>
    </section>
  )
}
