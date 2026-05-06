import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

/* ── Palabras flotantes — estilo glass blanco unificado ────────────── */
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
        fontSize:   '18px',
        fontWeight: '500',
        color: 'rgba(245, 245, 240, 0.85)',
        letterSpacing: '0.04em',
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        willChange: 'transform',
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

/* ── Componente principal — scroll-native, sin hijacking ──────────── */
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
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [bgError, setBgError] = useState(false)
  const [mediaError, setMediaError] = useState(false)

  /* ── Scroll progress basado en la sección (no hijacking) ────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const progress = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const showContent = useTransform(scrollYProgress, [0.45, 0.55], [0, 1])

  /* ── Responsive ─────────────────────────────────────────────────── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* ── Mouse parallax ─────────────────────────────────────────────── */
  useEffect(() => {
    const onMove = (e) => {
      setMouseX(e.clientX - window.innerWidth  / 2)
      setMouseY(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* ── Sizing ─────────────────────────────────────────────────────── */
  const mediaW = 300 + (isMobile ? 650 : 1250)
  const mediaH = 400 + (isMobile ? 200 : 400)
  const textTX = isMobile ? 180 : 150

  const firstWord = title ? title.split(' ')[0] : ''
  const restTitle = title ? title.split(' ').slice(1).join(' ') : ''

  return (
    <div
      ref={sectionRef}
      className="overflow-x-hidden"
      style={{ background: 'transparent' }}
    >
      {/* ── Sticky viewport: todo ocurre aquí mientras scrolleas ──── */}
      <div style={{ height: '300dvh' }}>
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          <motion.div
            className="relative w-full flex flex-col items-center min-h-[100dvh]"
          >
            {/* ── Fondo panorámico ─────────────────────────────────── */}
            <motion.div
              className="absolute inset-0 z-0 h-full"
              style={{ opacity: useTransform(progress, [0, 1], [1, 0]) }}
            >
              {bgImageSrc && !bgError ? (
                <img
                  src={bgImageSrc}
                  alt=""
                  role="presentation"
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
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.10)' }} />
            </motion.div>

            {/* ── Palabras flotantes ──────────────────────────────── */}
            <FloatingWords mouseX={mouseX} mouseY={mouseY} progress={progress} />

            {/* ── Contenedor principal ────────────────────────────── */}
            <div className="container mx-auto flex flex-col items-center justify-center relative z-10 w-full h-[100dvh]">

              {/* ── Media ─────────────────────────────────────────── */}
              <motion.div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden"
                style={{
                  width:     useTransform(progress, [0, 1], [300, mediaW]),
                  height:    useTransform(progress, [0, 1], [400, mediaH]),
                  maxWidth:  '95vw',
                  maxHeight: '85vh',
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
                        className="w-full h-full rounded-xl"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <motion.div
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        style={{ opacity: useTransform(progress, [0, 1], [0.7, 0.2]) }}
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
                          className="w-full h-full rounded-xl flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #050828 0%, #0D1340 50%, #1A0A28 100%)',
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
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        style={{ opacity: useTransform(progress, [0, 1], [0.7, 0.2]) }}
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
                      style={{ opacity: useTransform(progress, [0, 1], [0.7, 0.4]) }}
                    />
                  </div>
                )}

                {/* ── Date / scroll hint ──────────────────────────── */}
                <div className="flex flex-col items-center text-center relative z-10 mt-4">
                  {date && (
                    <motion.p
                      className="text-2xl text-blue-200"
                      style={{ x: useTransform(progress, [0, 1], [0, -textTX * 2]) }}
                    >
                      {date}
                    </motion.p>
                  )}
                  {scrollToExpand && (
                    <motion.p
                      className="text-blue-200 font-medium text-center"
                      style={{
                        x: useTransform(progress, [0, 1], [0, textTX * 2]),
                        opacity: useTransform(progress, [0, 0.3], [1, 0]),
                      }}
                    >
                      {scrollToExpand}
                    </motion.p>
                  )}
                </div>
              </motion.div>

              {/* ── Título ────────────────────────────────────────── */}
              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200"
                  style={{ x: useTransform(progress, [0, 1], [0, -textTX * 2]) }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-blue-200"
                  style={{ x: useTransform(progress, [0, 1], [0, textTX * 2]) }}
                >
                  {restTitle}
                </motion.h2>
              </div>

            </div>{/* end container */}

            {/* ── Contenido revelado ──────────────────────────────── */}
            <motion.div
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              style={{ opacity: showContent }}
            >
              {children}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ── Wrapper para FLOAT_WORDS que consume MotionValue ─────────────── */
function FloatingWords({ mouseX, mouseY, progress }) {
  const opacity = useTransform(progress, [0, 0.35], [1, 0])

  return (
    <motion.div style={{ position: 'absolute', inset: 0, zIndex: 15, pointerEvents: 'none', opacity }}>
      {FLOAT_WORDS.map((item, i) => (
        <FloatingWord
          key={i}
          item={item}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
    </motion.div>
  )
}

export default ScrollExpandMedia
