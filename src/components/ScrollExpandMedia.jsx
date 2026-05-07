import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

/* ── Palabras flotantes — glass blanco, cercanas al centro ───────── */
const FLOAT_WORDS = [
  { word: 'Diseño',         xPct: -32, yPct: -18, factor: 0.018 },
  { word: 'Forma',          xPct:  32, yPct: -20, factor: 0.026 },
  { word: 'Sistema',        xPct: -36, yPct:  22, factor: 0.013 },
  { word: 'UX/UI',          xPct:  36, yPct:  20, factor: 0.022 },
  { word: 'Branding',       xPct: -14, yPct: -34, factor: 0.015 },
  { word: 'Automatización', xPct:  14, yPct:  36, factor: 0.020 },
  { word: 'Motion',         xPct:  42, yPct:  -4, factor: 0.017 },
  { word: 'Producto',       xPct: -40, yPct:   6, factor: 0.021 },
]

function FloatingWord({ item, mouseX, mouseY }) {
  const tx = mouseX * item.factor * -1
  const ty = mouseY * item.factor * -1

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left:      `calc(50% + ${item.xPct}vw)`,
        top:       `calc(50% + ${item.yPct}vh)`,
        transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px)`,
        transition: 'transform 0.05s linear',
        fontFamily: "'Cal Sans', 'Inter', sans-serif",
        fontSize:   '16px',
        fontWeight: '500',
        color: 'rgba(245, 245, 240, 0.80)',
        letterSpacing: '0.03em',
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '10px',
        padding: '6px 14px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {item.word}
    </div>
  )
}

/* ── Componente principal ────────────────────────────────────────── */
const ScrollExpandMedia = ({
  mediaType   = 'video',
  mediaSrc,
  bgImageSrc,
  title,
  subtitle,
  children,
}) => {
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [bgError, setBgError] = useState(false)
  const [mediaError, setMediaError] = useState(false)

  /* ── Scroll: animation completes when section reaches center of viewport ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const wordsOpacity = useTransform(progress, [0, 0.35], [1, 0])
  const bgOpacity = useTransform(progress, [0.5, 0.9], [1, 0.3])

  /* ── Video sizing — bordes extra redondeados (flat/cute) ──────── */
  const mediaW = useTransform(progress, [0, 1], [300, isMobile ? 900 : 1500])
  const mediaH = useTransform(progress, [0, 1], [400, isMobile ? 560 : 800])
  const borderR = useTransform(progress, [0, 1], [32, 16])

  /* ── Opacidades ───────────────────────────────────────────────── */
  const titleOpacity = useTransform(progress, [0, 0.5], [1, 0.15])
  const subtitleOpacity = useTransform(progress, [0, 0.3], [1, 0])
  const paragraphOpacity = useTransform(progress, [0.55, 0.85], [0, 1])

  /* ── Responsive ────────────────────────────────────────────────── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* ── Mouse parallax ────────────────────────────────────────────── */
  useEffect(() => {
    const onMove = (e) => {
      setMouseX(e.clientX - window.innerWidth  / 2)
      setMouseY(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* ── Parse title: first word(s) + accent word(s) with text-grad ── */
  const words = title ? title.split(' ') : []
  /* Split: all but last → normal, last → accent/gradient */
  const normalPart = words.slice(0, -1).join(' ')
  const accentPart = words.slice(-1).join(' ')

  return (
    <div ref={sectionRef} className="relative overflow-hidden rounded-section border border-blue-900/20 dark:border-blue-400/15 bg-blue-950/30 dark:bg-blue-950/35 shadow-2xl backdrop-blur-xl">

      {/* ── Fondo de la tarjeta ──────────────────────────────────── */}
      <motion.div className="absolute inset-0 z-0 rounded-section overflow-hidden" style={{ opacity: bgOpacity }}>
        {bgImageSrc && !bgError ? (
          <img
            src={bgImageSrc}
            alt=""
            role="presentation"
            className="w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            onError={() => setBgError(true)}
          />
        ) : (
          <div className="w-full h-full" style={{ background: 'linear-gradient(160deg, #00031F 0%, #050828 40%, #0D0A22 70%, #0A0614 100%)' }} />
        )}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.10)' }} />
      </motion.div>

      {/* ── Palabras flotantes ───────────────────────────────────── */}
      <motion.div style={{ position: 'absolute', inset: 0, zIndex: 15, pointerEvents: 'none', opacity: wordsOpacity }}>
        {FLOAT_WORDS.map((item, i) => (
          <FloatingWord key={i} item={item} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </motion.div>

      {/* ── Contenido principal ──────────────────────────────────── */}
      <div className="relative z-10 px-4 md:px-6 py-6 md:py-8">

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="text-[11px] font-bold tracking-[0.12em] uppercase text-center dark:text-white/40 text-black/45 mb-4"
            style={{ opacity: subtitleOpacity }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* ── Video container (con overlays) ─────────────────────── */}
        <motion.div
          className="overflow-hidden relative mx-auto"
          style={{
            width: mediaW,
            height: mediaH,
            maxWidth: '95vw',
            maxHeight: '85vh',
            borderRadius: borderR,
            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Video */}
          {mediaType === 'video' ? (
            mediaSrc?.includes('youtube.com') ? (
              <div className="relative w-full h-full pointer-events-none">
                <iframe
                  title="Enfoque media"
                  width="100%" height="100%"
                  src={`${mediaSrc.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&controls=0`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <motion.div className="absolute inset-0 bg-black/30" style={{ opacity: useTransform(progress, [0, 1], [0.7, 0.2]) }} />
              </div>
            ) : (
              <div className="relative w-full h-full pointer-events-none">
                {mediaSrc && !mediaError ? (
                  <video
                    src={mediaSrc}
                    type="video/mp4"
                    autoPlay muted loop playsInline preload="auto"
                    className="w-full h-full object-cover"
                    controls={false}
                    disablePictureInPicture
                    disableRemotePlayback
                    onError={() => setMediaError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #050828, #0D1340, #1A0A28)' }}>
                    <span style={{ fontFamily: "'Cal Sans', sans-serif", fontSize: '48px', color: 'rgba(255,255,255,0.08)' }}>CL</span>
                  </div>
                )}
                {/* Gradiente oscuro global para legibilidad de overlays */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,3,31,0.45) 0%, rgba(0,3,31,0.05) 30%, rgba(0,3,31,0.05) 60%, rgba(0,3,31,0.65) 100%)',
                  }}
                />
              </div>
            )
          ) : (
            <div className="relative w-full h-full">
              {mediaSrc && !mediaError ? (
                <img src={mediaSrc} alt={title || ''} loading="lazy" className="w-full h-full object-cover" onError={() => setMediaError(true)} />
              ) : (
                <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #050828, #0D1340)' }} />
              )}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,3,31,0.45) 0%, rgba(0,3,31,0.05) 30%, rgba(0,3,31,0.05) 60%, rgba(0,3,31,0.65) 100%)',
                }}
              />
            </div>
          )}

          {/* ── Título superpuesto (tercio superior) ─────────────── */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center justify-center text-center px-6"
            style={{
              top: '8%',
              opacity: titleOpacity,
            }}
          >
            <h2 className="font-cal text-3xl md:text-4xl xl:text-[42px] leading-tight tracking-[-0.5px]" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}>
              <span className="dark:text-white text-white">{normalPart} </span>
              <span className="text-grad">{accentPart}</span>
            </h2>
          </motion.div>

          {/* ── Párrafo superpuesto (tercio inferior) ────────────── */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-12 pb-6 md:pb-8"
            style={{ opacity: paragraphOpacity }}
          >
            {/* Fade superior del párrafo para mezclar con el video */}
            <div
              className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, rgba(0,3,31,0.3) 50%, rgba(0,3,31,0.5) 100%)',
                borderRadius: '0 0 32px 32px',
              }}
            />
            {/* Contenido de children se renderiza aquí */}
            <div className="relative z-10">
              {children}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}

export default ScrollExpandMedia
