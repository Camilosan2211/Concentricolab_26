import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'motion/react'

/* ── Palabras flotantes — disciplinas del lab ─────────────────────
   Posicionadas en el espacio negativo alrededor del video inicial
   (que mide 300×400 px centrado). Desaparecen al expandir.
   xPct / yPct: offset desde el centro, en porcentaje del viewport.
   factor: intensidad del parallax (mayor = más movimiento).        */
const FLOAT_WORDS = [
  { word: 'Diseño',         xPct: -38, yPct: -28, factor: 0.018, color: 'rgba(130,138,255,0.72)', size: '13px', weight: '500' },
  { word: 'Forma',          xPct:  36, yPct: -32, factor: 0.026, color: 'rgba(255,109,77,0.65)',  size: '12px', weight: '400' },
  { word: 'Sistema',        xPct: -44, yPct:  30, factor: 0.013, color: 'rgba(245,245,240,0.28)', size: '14px', weight: '400' },
  { word: 'UX/UI',          xPct:  42, yPct:  28, factor: 0.022, color: 'rgba(77,102,255,0.65)',  size: '12px', weight: '600' },
  { word: 'Branding',       xPct: -18, yPct: -46, factor: 0.015, color: 'rgba(245,245,240,0.20)', size: '11px', weight: '400' },
  { word: 'Automatización', xPct:  16, yPct:  48, factor: 0.020, color: 'rgba(65,234,255,0.50)',  size: '11px', weight: '400' },
  { word: 'Motion',         xPct:  48, yPct:  -8, factor: 0.017, color: 'rgba(130,138,255,0.45)', size: '12px', weight: '400' },
  { word: 'Producto',       xPct: -46, yPct:   6, factor: 0.021, color: 'rgba(255,109,77,0.45)',  size: '13px', weight: '400' },
]

/* ── FloatingWord — palabra individual con parallax ──────────────── */
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
        fontSize:   item.size,
        fontWeight: item.weight,
        color:      item.color,
        letterSpacing: '0.04em',
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        willChange: 'transform, opacity',
      }}
    >
      {item.word}
    </div>
  )
}

/* ── Componente principal ─────────────────────────────────────────── */
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
  /* State for render-driven values */
  const [scrollProgress,     setScrollProgress]     = useState(0)
  const [showContent,        setShowContent]        = useState(false)
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false)
  const [isMobile,           setIsMobile]           = useState(false)
  const [mouseX,             setMouseX]             = useState(0)
  const [mouseY,             setMouseY]             = useState(0)
  const [bgError,            setBgError]            = useState(false)
  const [mediaError,         setMediaError]         = useState(false)

  const sectionRef = useRef(null)

  /* ── Refs for event handlers (avoids stale closures) ───────────── */
  const progressRef     = useRef(0)
  const expandedRef     = useRef(false)
  const touchStartYRef  = useRef(0)

  /* Keep refs in sync with state */
  useEffect(() => { progressRef.current = scrollProgress }, [scrollProgress])
  useEffect(() => { expandedRef.current = mediaFullyExpanded }, [mediaFullyExpanded])

  /* ── Lenis helpers ─────────────────────────────────────────────── */
  const pauseLenis  = useCallback(() => { try { window.__lenis?.stop()  } catch(e) {} }, [])
  const resumeLenis = useCallback(() => { try { window.__lenis?.start() } catch(e) {} }, [])

  /* ── Reset al cambiar mediaType ────────────────────────────────── */
  useEffect(() => {
    setScrollProgress(0)
    setShowContent(false)
    setMediaFullyExpanded(false)
    progressRef.current = 0
    expandedRef.current = false
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

  /* ── Scroll capture (wheel + touch) — single mount effect ─────── */
  useEffect(() => {
    /* Advance progress and check thresholds */
    const advance = (newProgress) => {
      setScrollProgress(newProgress)

      if (newProgress >= 1) {
        setMediaFullyExpanded(true)
        setShowContent(true)
        expandedRef.current = true
        resumeLenis()
      } else if (newProgress < 0.75) {
        setShowContent(false)
      }
    }

    const handleWheel = (e) => {
      if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        expandedRef.current = false
        setMediaFullyExpanded(false)
        resumeLenis()
        e.preventDefault()
        return
      }

      if (!expandedRef.current) {
        e.preventDefault()
        pauseLenis()

        const delta = e.deltaY * 0.0009
        const newProgress = Math.min(Math.max(progressRef.current + delta, 0), 1)
        advance(newProgress)
      }
    }

    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      if (!touchStartYRef.current) return
      const touchY = e.touches[0].clientY
      const deltaY = touchStartYRef.current - touchY

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        expandedRef.current = false
        setMediaFullyExpanded(false)
        resumeLenis()
        e.preventDefault()
        return
      }

      if (!expandedRef.current) {
        e.preventDefault()
        pauseLenis()

        const factor = deltaY < 0 ? 0.008 : 0.005
        const newProgress = Math.min(Math.max(progressRef.current + deltaY * factor, 0), 1)
        advance(newProgress)
      }
      touchStartYRef.current = touchY
    }

    const handleTouchEnd = () => { touchStartYRef.current = 0 }

    const handleScroll = () => {
      if (!expandedRef.current) window.scrollTo(0, 0)
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
      resumeLenis()
    }
  }, [pauseLenis, resumeLenis])

  /* ── Responsive ────────────────────────────────────────────────── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* ── Sizing math ───────────────────────────────────────────────── */
  const mediaW = 300 + scrollProgress * (isMobile ? 650 : 1250)
  const mediaH = 400 + scrollProgress * (isMobile ? 200 : 400)
  const textTX = scrollProgress * (isMobile ? 160 : 140)

  const firstWord  = title ? title.split(' ')[0] : ''
  const restTitle  = title ? title.split(' ').slice(1).join(' ') : ''
  const borderR    = 24 - scrollProgress * 20
  const glowBlue   = `0 0 ${40 + scrollProgress * 80}px rgba(77,102,255,${0.12 + scrollProgress * 0.18})`
  const glowCorpo  = `0 ${20 + scrollProgress * 30}px ${60 + scrollProgress * 80}px rgba(0,0,0,${0.3 + scrollProgress * 0.25})`

  return (
    <div
      ref={sectionRef}
      className="overflow-x-hidden"
      style={{ background: 'transparent' }}
    >
      <section
        className="relative flex flex-col items-center justify-start min-h-[100dvh]"
        style={{ overflow: 'hidden' }}
      >
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* ── Fondo panorámico ─────────────────────────────────── */}
          <motion.div
            className="absolute inset-0 h-full"
            style={{ zIndex: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.08 }}
          >
            {bgImageSrc && !bgError ? (
              <img
                src={bgImageSrc}
                alt=""
                role="presentation"
                loading="eager"
                className="w-screen h-screen object-cover object-center"
                onError={() => setBgError(true)}
                style={{ filter: 'brightness(0.82) contrast(1.05)' }}
              />
            ) : (
              <div
                className="w-screen h-screen"
                style={{
                  background: 'linear-gradient(160deg, #00031F 0%, #050828 40%, #0D0A22 70%, #0A0614 100%)',
                }}
              />
            )}
            <div className="absolute inset-0" style={{ background: 'rgba(0,3,31,0.38)' }} />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse 60% 45% at 30% 55%, rgba(77,102,255,0.18) 0%, transparent 65%),
                  radial-gradient(ellipse 50% 40% at 72% 42%, rgba(255,109,77,0.13) 0%, transparent 60%)
                `,
              }}
            />
          </motion.div>

          {/* ── Palabras flotantes (z-15 para estar sobre el contenedor z-10) ── */}
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

          {/* ── Contenedor principal ──────────────────────────────── */}
          <div
            className="container mx-auto flex flex-col items-center justify-center"
            style={{ position: 'relative', zIndex: 10 }}
          >

            {/* ── Media expandible ────────────────────────────────── */}
            <div
              style={{
                position:  'absolute',
                zIndex:    0,
                top:       '50%',
                left:      '50%',
                transform: 'translate(-50%, -50%)',
                width:     `${mediaW}px`,
                height:    `${mediaH}px`,
                maxWidth:  '95vw',
                maxHeight: '85vh',
                boxShadow: `${glowBlue}, ${glowCorpo}`,
                borderRadius: `${borderR}px`,
                overflow:  'hidden',
                transition: 'none',
                willChange: 'width, height, box-shadow',
              }}
            >
              {/* Overlay de marca */}
              <div
                style={{
                  position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
                  opacity: Math.max(0, 1 - scrollProgress * 2.2),
                  background: `
                    radial-gradient(ellipse 55% 40% at 35% 60%, rgba(77,102,255,0.32) 0%, transparent 60%),
                    radial-gradient(ellipse 45% 35% at 68% 38%, rgba(255,109,77,0.22) 0%, transparent 55%)
                  `,
                  mixBlendMode: 'screen',
                }}
              />

              {mediaType === 'video' ? (
                mediaSrc?.includes('youtube.com') ? (
                  <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <iframe
                      title="Enfoque media"
                      width="100%" height="100%"
                      src={
                        mediaSrc.includes('embed')
                          ? `${mediaSrc}${mediaSrc.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&controls=0&rel=0&modestbranding=1`
                          : `${mediaSrc.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&controls=0&rel=0&playlist=${mediaSrc.split('v=')[1]}`
                      }
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ borderRadius: `${borderR}px` }}
                    />
                    <motion.div
                      style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 2 }}
                      initial={{ opacity: 0.65 }}
                      animate={{ opacity: 0.45 - scrollProgress * 0.25 }}
                    />
                  </div>
                ) : (
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {mediaSrc && !mediaError ? (
                      <video
                        src={mediaSrc}
                        type="video/mp4"
                        autoPlay muted loop playsInline preload="auto"
                        controls={false}
                        style={{
                          width: '100%', height: '100%',
                          objectFit: 'cover', objectPosition: 'center',
                          display: 'block',
                        }}
                        onError={() => setMediaError(true)}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%', height: '100%',
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
                    <motion.div
                      style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.30)', zIndex: 2 }}
                      initial={{ opacity: 0.65 }}
                      animate={{ opacity: 0.48 - scrollProgress * 0.28 }}
                    />
                  </div>
                )
              ) : (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  {mediaSrc && !mediaError ? (
                    <img
                      src={mediaSrc}
                      alt={title || 'Concéntrico Lab'}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                      onError={() => setMediaError(true)}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #050828, #0D1340)' }} />
                  )}
                  <motion.div
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }}
                    initial={{ opacity: 0.65 }}
                    animate={{ opacity: 0.65 - scrollProgress * 0.30 }}
                  />
                </div>
              )}

              {/* ── Textos que se separan lateralmente ─────────────── */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-2.5rem',
                  left: 0, right: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  zIndex: 5,
                }}
              >
                {date && (
                  <p
                    style={{
                      transform:  `translateX(-${textTX}vw)`,
                      fontFamily: "'Cal Sans', sans-serif",
                      fontSize:   '11px',
                      fontWeight: '500',
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      color: 'rgba(130,138,255,0.70)',
                      transition: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {date}
                  </p>
                )}
                {scrollToExpand && (
                  <p
                    style={{
                      transform:  `translateX(${textTX}vw)`,
                      fontFamily: "'Inter', sans-serif",
                      fontSize:   '10px',
                      fontWeight: '500',
                      letterSpacing: '0.08em',
                      color: 'rgba(255,109,77,0.60)',
                      transition: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {scrollToExpand}
                  </p>
                )}
              </div>
            </div>

            {/* ── Título que se abre hacia los lados (z-20 para estar sobre todo) ── */}
            <div
              style={{
                position: 'relative',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: isMobile ? '8px' : '16px',
                width: '100%',
                mixBlendMode: textBlend ? 'difference' : 'normal',
                pointerEvents: 'none',
              }}
            >
              <h2
                style={{
                  transform:  `translateX(-${textTX}vw)`,
                  fontFamily: "'Cal Sans', sans-serif",
                  fontSize:   isMobile ? '2.5rem' : '4rem',
                  fontWeight: '400',
                  lineHeight:  1.05,
                  letterSpacing: '-0.02em',
                  color: '#F5F5F0',
                  transition: 'none',
                  willChange: 'transform',
                  userSelect: 'none',
                  textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                }}
              >
                {firstWord}
              </h2>
              <h2
                style={{
                  transform:  `translateX(${textTX}vw)`,
                  fontFamily: "'Cal Sans', sans-serif",
                  fontSize:   isMobile ? '2.5rem' : '4rem',
                  fontWeight: '400',
                  lineHeight:  1.05,
                  letterSpacing: '-0.02em',
                  color: '#F5F5F0',
                  transition: 'none',
                  willChange: 'transform',
                  userSelect: 'none',
                  textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                }}
              >
                {restTitle}
              </h2>
            </div>

          </div>{/* end container */}

          {/* ── Contenido revelado tras expansión completa ────────── */}
          <motion.section
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: isMobile ? '2.5rem 1.5rem' : '4rem 4rem',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.section>

        </div>
      </section>
    </div>
  )
}

export default ScrollExpandMedia
