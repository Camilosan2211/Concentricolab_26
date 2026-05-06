import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'motion/react'

/* ── Palabras flotantes — estilo glass blanco unificado ──────────────
   Más grandes que antes, todas con el mismo estilo glass white.       */
const FLOAT_WORDS = [
  { word: 'Diseño',         xPct: -35, yPct: -25, factor: 0.018 },
  { word: 'Forma',          xPct:  35, yPct: -30, factor: 0.026 },
  { word: 'Sistema',        xPct: -40, yPct:  28, factor: 0.013 },
  { word: 'UX/UI',          xPct:  40, yPct:  25, factor: 0.022 },
  { word: 'Branding',       xPct: -16, yPct: -42, factor: 0.015 },
  { word: 'Automatización', xPct:  16, yPct:  44, factor: 0.020 },
  { word: 'Motion',         xPct:  46, yPct:  -6, factor: 0.017 },
  { word: 'Producto',       xPct: -44, yPct:   5, factor: 0.021 },
]

/* ── FloatingWord — palabra con efecto glass uniforme ──────────────── */
function FloatingWord({ item, mouseX, mouseY, scrollProgress }) {
  const opacity = Math.max(0, 1 - scrollProgress * 2.8)
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
        opacity,
        transition: 'opacity 0.3s ease, transform 0.05s linear',
        fontFamily: "'Cal Sans', 'Inter', sans-serif",
        fontSize:   '18px',
        fontWeight: '500',
        color: 'rgba(245, 245, 240, 0.85)',
        letterSpacing: '0.04em',
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        willChange: 'transform, opacity',
        background: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: '8px',
        padding: '6px 14px',
        border: '1px solid rgba(255, 255, 255, 0.10)',
      }}
    >
      {item.word}
    </div>
  )
}

/* ── Componente principal — alineado con el template de referencia ─── */
const ScrollExpandMedia = ({
  mediaType   = 'video',
  mediaSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend   = false,
  children,
}) => {
  const [scrollProgress,     setScrollProgress]     = useState(0)
  const [showContent,        setShowContent]        = useState(false)
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false)
  const [touchStartY,        setTouchStartY]        = useState(0)
  const [isMobile,           setIsMobile]           = useState(false)
  const [mouseX,             setMouseX]             = useState(0)
  const [mouseY,             setMouseY]             = useState(0)
  const [bgError,            setBgError]            = useState(false)
  const [mediaError,         setMediaError]         = useState(false)

  const sectionRef = useRef(null)

  /* ── Reset al cambiar mediaType ────────────────────────────────── */
  useEffect(() => {
    setScrollProgress(0)
    setShowContent(false)
    setMediaFullyExpanded(false)
  }, [mediaType])

  /* ── Mouse parallax ────────────────────────────────────────────── */
  useEffect(() => {
    const onMove = (e) => {
      setMouseX(e.clientX - window.innerWidth  / 2)
      setMouseY(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* ── Scroll capture — exact match con referencia ───────────────── */
  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        const delta = e.deltaY * 0.0009
        const newProgress = Math.min(Math.max(scrollProgress + delta, 0), 1)
        setScrollProgress(newProgress)

        if (newProgress >= 1) {
          setMediaFullyExpanded(true)
          setShowContent(true)
        } else if (newProgress < 0.75) {
          setShowContent(false)
        }
      }
    }

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY)
    }

    const handleTouchMove = (e) => {
      if (!touchStartY) return

      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        const factor = deltaY < 0 ? 0.008 : 0.005
        const newProgress = Math.min(Math.max(scrollProgress + deltaY * factor, 0), 1)
        setScrollProgress(newProgress)

        if (newProgress >= 1) {
          setMediaFullyExpanded(true)
          setShowContent(true)
        } else if (newProgress < 0.75) {
          setShowContent(false)
        }

        setTouchStartY(touchY)
      }
    }

    const handleTouchEnd = () => {
      setTouchStartY(0)
    }

    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('wheel',      handleWheel,      { passive: false })
    window.addEventListener('scroll',     handleScroll)
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove',  handleTouchMove,  { passive: false })
    window.addEventListener('touchend',   handleTouchEnd)

    return () => {
      window.removeEventListener('wheel',      handleWheel)
      window.removeEventListener('scroll',     handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove',  handleTouchMove)
      window.removeEventListener('touchend',   handleTouchEnd)
    }
  }, [scrollProgress, mediaFullyExpanded, touchStartY])

  /* ── Responsive ────────────────────────────────────────────────── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* ── Sizing math — valores exactos del referente ───────────────── */
  const mediaW = 300 + scrollProgress * (isMobile ? 650 : 1250)
  const mediaH = 400 + scrollProgress * (isMobile ? 200 : 400)
  const textTX = scrollProgress * (isMobile ? 180 : 150)

  const firstWord  = title ? title.split(' ')[0] : ''
  const restTitle  = title ? title.split(' ').slice(1).join(' ') : ''

  return (
    <div
      ref={sectionRef}
      className="overflow-x-hidden"
      style={{ background: 'transparent' }}
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* ── Fondo panorámico (bgImageSrc) — overlay ligero como referencia ── */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            {bgImageSrc && !bgError ? (
              <img
                src={bgImageSrc}
                alt=""
                role="presentation"
                loading="eager"
                className="w-screen h-screen"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                onError={() => setBgError(true)}
              />
            ) : (
              <div
                className="w-screen h-screen"
                style={{
                  background: 'linear-gradient(160deg, #00031F 0%, #050828 40%, #0D0A22 70%, #0A0614 100%)',
                }}
              />
            )}
            {/* Overlay sutil como referencia (bg-black/10) */}
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.10)' }} />
          </motion.div>

          {/* ── Palabras flotantes (glass blanco unificado) ─────────────────── */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 15, pointerEvents: 'none' }}>
            {FLOAT_WORDS.map((item, i) => (
              <FloatingWord
                key={i}
                item={item}
                mouseX={mouseX}
                mouseY={mouseY}
                scrollProgress={scrollProgress}
              />
            ))}
          </div>

          {/* ── Contenedor principal — estructura exacta del referente ──────── */}
          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* ── Media expandible ─────────────────────────────────────────── */}
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl"
                style={{
                  width:     `${mediaW}px`,
                  height:    `${mediaH}px`,
                  maxWidth:  '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                  overflow:  'hidden',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc?.includes('youtube.com') ? (
                    <div className="relative w-full h-full pointer-events-none">
                      <iframe
                        title="Enfoque media"
                        width="100%" height="100%"
                        src={
                          mediaSrc.includes('embed')
                            ? `${mediaSrc}${mediaSrc.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1`
                            : `${mediaSrc.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=${mediaSrc.split('v=')[1]}`
                        }
                        className="w-full h-full rounded-xl"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div className="absolute inset-0 z-10" style={{ pointerEvents: 'none' }} />
                      <motion.div
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full pointer-events-none">
                      {mediaSrc && !mediaError ? (
                        <video
                          src={mediaSrc}
                          type="video/mp4"
                          autoPlay muted loop playsInline preload="auto"
                          className="w-full h-full object-cover rounded-xl"
                          controls={false}
                          disablePictureInPicture
                          disableRemotePlayback
                          onError={() => setMediaError(true)}
                        />
                      ) : (
                        <div
                          className="w-full h-full rounded-xl"
                          style={{
                            background: 'linear-gradient(135deg, #050828 0%, #0D1340 50%, #1A0A28 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Cal Sans', sans-serif",
                              fontSize: '48px', color: 'rgba(255,255,255,0.08)',
                            }}
                          >
                            CL
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 z-10" style={{ pointerEvents: 'none' }} />
                      <motion.div
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className="relative w-full h-full">
                    {mediaSrc && !mediaError ? (
                      <img
                        src={mediaSrc}
                        alt={title || 'Concéntrico Lab'}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-xl"
                        onError={() => setMediaError(true)}
                      />
                    ) : (
                      <div className="w-full h-full rounded-xl" style={{ background: 'linear-gradient(135deg, #050828, #0D1340)' }} />
                    )}
                    <motion.div
                      className="absolute inset-0 bg-black/50 rounded-xl"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                {/* ── Date / scroll hint ───────────────────────────────────── */}
                <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-none">
                  {date && (
                    <p
                      className="text-2xl text-blue-200"
                      style={{ transform: `translateX(-${textTX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="text-blue-200 font-medium text-center"
                      style={{ transform: `translateX(${textTX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* ── Título que se abre hacia los lados ───────────────────────── */}
              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200 transition-none"
                  style={{ transform: `translateX(-${textTX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-blue-200 transition-none"
                  style={{ transform: `translateX(${textTX}vw)` }}
                >
                  {restTitle}
                </motion.h2>
              </div>

            </div>{/* end viewport-height div */}

            {/* ── Contenido revelado tras expansión completa ────────────────── */}
            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>

          </div>{/* end container */}
        </div>
      </section>
    </div>
  )
}

export default ScrollExpandMedia
