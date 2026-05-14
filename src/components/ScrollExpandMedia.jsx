import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import LottiePlayer from './LottiePlayer'

/* ── Componente principal ────────────────────────────────────────── */
const ScrollExpandMedia = ({
  mediaType   = 'video',
  mediaSrc,
  bgImageSrc,
  title,
  subtitle,
  children,
  bottomOverlay,
}) => {
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [bgError, setBgError] = useState(false)
  const [mediaError, setMediaError] = useState(false)

  /* ── Scroll: animation completes when section reaches center of viewport ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const bgOpacity = useTransform(progress, [0.5, 0.9], [1, 0.3])

  /* ── Video sizing — bordes redondeados flat/cute, menos altura ── */
  const mediaW = useTransform(progress, [0, 1], [300, isMobile ? 1000 : 1920])
  const mediaH = useTransform(mediaW, w => w * (9 / 21))
  const borderR = useTransform(progress, [0, 1], [32, 16])

  /* ── Opacidades ───────────────────────────────────────────────── */
  const contentOpacity = useTransform(progress, [0.65, 0.95], [0, 1])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
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

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="relative z-10 pt-8 md:pt-10 px-6 md:px-8">
        <div className="flex flex-col items-center text-center gap-3">
          {subtitle && (
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase dark:text-white/40 text-black/45">
              {subtitle}
            </p>
          )}
          <h2 className="font-cal text-3xl md:text-4xl xl:text-[42px] dark:text-white text-b-dark leading-tight tracking-[-0.5px] text-center">
            {leadingWords}{leadingWords ? ' ' : ''}
            <span className="text-grad">{lastWord}</span>
          </h2>
        </div>
      </div>

      {/* ── Media ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-center w-full py-6 md:py-8" style={{ minHeight: '45vh', overflow: 'visible' }}>
        <motion.div
          className="overflow-hidden relative"
          style={{
            width: mediaW,
            height: mediaH,
            maxWidth: '95vw',
            maxHeight: '80vh',
            borderRadius: borderR,
            boxShadow: 'none',
          }}
        >
          {mediaType === 'lottie' ? (
            <div className="relative w-full h-full pointer-events-none">
              {mediaSrc ? (
                <LottiePlayer src={mediaSrc} loop autoplay speed={1} />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #050828, #0D1340, #1A0A28)' }}>
                  <span style={{ fontFamily: "'Cal Sans', sans-serif", fontSize: '48px', color: 'rgba(255,255,255,0.08)' }}>CL</span>
                </div>
              )}
              <motion.div className="absolute inset-0 bg-black/30" style={{ opacity: useTransform(progress, [0, 1], [0.7, 0.2]) }} />
            </div>
          ) : mediaType === 'video' ? (
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
                    autoPlay muted loop playsInline preload="none"
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

          {/* Ocultar watermark jitter.video */}
          <div
            className="pointer-events-none absolute bottom-0 right-0 z-40"
            style={{
              width: '140px',
              height: '40px',
              background: 'linear-gradient(to top left, rgba(0,3,31,0.98) 40%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* Children overlay — z-30 */}
        <motion.div
          className="absolute inset-0 z-30"
          style={{ opacity: contentOpacity }}
        >
          {children}
        </motion.div>

        {bottomOverlay && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-30 flex justify-center pb-6 px-4"
            style={{ opacity: contentOpacity }}
          >
            {bottomOverlay}
          </motion.div>
        )}
      </div>

    </div>
  )
}

export default ScrollExpandMedia
