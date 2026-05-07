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

  /* ── Video sizing — bordes redondeados flat/cute, menos altura ── */
  const mediaW = useTransform(progress, [0, 1], [300, isMobile ? 900 : 1500])
  const mediaH = useTransform(progress, [0, 1], [400, isMobile ? 500 : 700])
  const borderR = useTransform(progress, [0, 1], [32, 16])

  /* ── Opacidades ───────────────────────────────────────────────── */
  const textX = useTransform(progress, [0, 1], [0, isMobile ? -60 : -50])
  const contentOpacity = useTransform(progress, [0.65, 0.95], [0, 1])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      setMouseX(e.clientX - window.innerWidth  / 2)
      setMouseY(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const words = title ? title.split(' ') : []
  const lastWord = words.length > 0 ? words[words.length - 1] : ''
  const leadingWords = words.slice(0, -1).join(' ')

  return (
    <div ref={sectionRef} className="relative overflow-hidden rounded-section border border-blue-900/20 dark:border-blue-400/15 bg-blue-950/30 dark:bg-blue-950/35 shadow-2xl backdrop-blur-xl">

      {/* ── Fondo ────────────────────────────────────────────────── */}
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

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="relative z-10 pt-8 md:pt-10 px-6 md:px-8">
        <div className="flex flex-col items-center text-center gap-3">
          {subtitle && (
            <motion.p
              className="text-[11px] font-bold tracking-[0.12em] uppercase dark:text-white/40 text-black/45"
              style={{ opacity: useTransform(progress, [0, 0.3], [1, 0]) }}
            >
              {subtitle}
            </motion.p>
          )}
          <div className="flex items-center justify-center gap-4 flex-wrap mix-blend-normal">
            <motion.h2
              className="font-cal text-3xl md:text-4xl xl:text-[42px] dark:text-white text-b-dark leading-tight tracking-[-0.5px]"
              style={{ x: textX }}
            >
              {leadingWords}{leadingWords ? ' ' : ''}
              <span className="text-grad">{lastWord}</span>
            </motion.h2>
          </div>
        </div>
      </div>

      {/* ── Media ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-center w-full px-4 md:px-6 py-6 md:py-8" style={{ minHeight: '45vh' }}>
        <motion.div
          className="overflow-hidden relative"
          style={{
            width: mediaW,
            height: mediaH,
            maxWidth: '95vw',
            maxHeight: '80vh',
            borderRadius: borderR,
            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
          }}
        >
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
                <motion.div className="absolute inset-0 bg-black/30" style={{ opacity: useTransform(progress, [0, 1], [0.7, 0.2]) }} />
              </div>
            )
          ) : (
            <div className="relative w-full h-full">
              {mediaSrc && !mediaError ? (
                <img src={mediaSrc} alt={title || ''} loading="lazy" className="w-full h-full object-cover" onError={() => setMediaError(true)} />
              ) : (
                <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #050828, #0D1340)' }} />
              )}
              <motion.div className="absolute inset-0 bg-black/50" style={{ opacity: useTransform(progress, [0, 1], [0.7, 0.4]) }} />
            </div>
          )}

          {/* ── Fade inferior del video → se difumina con el fondo ── */}
          <motion.div
            className="pointer-events-none absolute bottom-0 left-0 right-0"
            style={{
              height: '140px',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0,3,31,0.15) 30%, rgba(0,3,31,0.35) 70%, rgba(0,3,31,0.55) 100%)',
              borderBottomLeftRadius: borderR,
              borderBottomRightRadius: borderR,
            }}
          />
        </motion.div>
      </div>

      {/* ── Contenido revelado ───────────────────────────────────── */}
      <motion.div
        className="relative z-10 px-6 md:px-8 pb-8 md:pb-10"
        style={{ opacity: contentOpacity }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default ScrollExpandMedia
