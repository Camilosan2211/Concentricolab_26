import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const motionPresets = {
  luxury: {
    container: { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.28 } } },
    item: {
      hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
      show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
      },
    },
    row: {
      hidden: { opacity: 0, y: 40, scale: 0.985, filter: 'blur(8px)' },
      show: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          delay: 0.25 + i * 0.11,
          type: 'spring',
          stiffness: 128,
          damping: 16,
          mass: 0.9,
        },
      }),
    },
  },
  dynamic: {
    container: { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.16 } } },
    item: {
      hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
      show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
      },
    },
    row: {
      hidden: { opacity: 0, y: 32, scale: 0.978, rotateX: 6, filter: 'blur(7px)' },
      show: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: 'blur(0px)',
        transition: {
          delay: 0.14 + i * 0.08,
          type: 'spring',
          stiffness: 168,
          damping: 15,
          mass: 0.82,
        },
      }),
    },
  },
}

const HERO_LINE_IMAGES = {
  es: [
    'assets/images/hero-1.webp',
    'assets/images/hero-2.webp',
    'assets/images/hero-3.webp',
  ],
  en: [
    'assets/images/hero-1.webp',
    'assets/images/hero-2.webp',
    'assets/images/hero-3.webp',
  ],
}

function HeroLinePhoto({ src, alt }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <span
        className="inline-block w-[0.84em] h-[0.84em] shrink-0 rounded-full bg-gradient-to-br from-b-blue/80 to-b-coral/70 align-[-0.12em] mx-1.5"
        aria-hidden
      />
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      width={64}
      height={64}
      className="inline-block w-[0.84em] h-[0.84em] shrink-0 rounded-full object-cover align-[-0.12em] mx-1.5 shadow-[0_8px_24px_rgba(0,0,0,.16)]"
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

export default function Hero({ lang }) {
  const t = (es, en) => (lang === 'es' ? es : en)
  const imgs = HERO_LINE_IMAGES[lang] || HERO_LINE_IMAGES.es
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [motionMode, setMotionMode] = useState('luxury')
  const variants = useMemo(() => motionPresets[motionMode] || motionPresets.luxury, [motionMode])

  useEffect(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('heroMotion')
      const fromStorage = window.localStorage.getItem('heroMotionMode')
      const initial = fromUrl || fromStorage
      if (initial === 'luxury' || initial === 'dynamic') setMotionMode(initial)
    } catch {
      // Ignore storage/browser privacy restrictions and keep default mode.
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem('heroMotionMode', motionMode)
    } catch {
      // Ignore storage/browser privacy restrictions.
    }
  }, [motionMode])

  return (
    <section
      id="hero"
      className={`relative z-10 min-h-screen flex items-center justify-center text-center overflow-hidden pt-36 pb-24 ${motionMode === 'dynamic' ? 'hero-mode-dynamic' : 'hero-mode-luxury'}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - r.left) / r.width - 0.5) * 2
        const y = ((e.clientY - r.top) / r.height - 0.5) * 2
        setParallax({ x, y })
      }}
      onMouseLeave={() => setParallax({ x: 0, y: 0 })}
    >
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-brand-aurora" aria-hidden="true" />
      <div className="hero-brand-aurora hero-brand-aurora-2" aria-hidden="true" />
      <div
        className="hero-blur-layer"
        style={{ transform: `translate3d(${parallax.x * 16}px, ${parallax.y * 12}px, 0)` }}
        aria-hidden="true"
      />
      <div
        className="hero-blur-layer hero-blur-layer-2"
        style={{ transform: `translate3d(${parallax.x * -12}px, ${parallax.y * -9}px, 0)` }}
        aria-hidden="true"
      />
      <div
        className="hero-blur-layer hero-blur-layer-3"
        style={{ transform: `translate3d(${parallax.x * 8}px, ${parallax.y * -6}px, 0)` }}
        aria-hidden="true"
      />
      <motion.div
        className="relative z-10 flex flex-col items-center gap-7 px-6 max-w-5xl mx-auto"
        variants={variants.container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={variants.item} className="flex items-center gap-2 flex-wrap justify-center">
          <span className="glass-blue inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-b-blue-lt px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-b-coral animate-pulse" />
            {t('Laboratorio digital · Bogotá', 'Digital Lab · Bogotá')}
          </span>
          <div className="hero-motion-switch glass rounded-full p-1 inline-flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMotionMode('luxury')}
              className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all duration-200 ${motionMode === 'luxury'
                ? 'bg-b-blue text-white'
                : 'dark:text-white/55 text-black/55 hover:dark:text-white hover:text-black'
                }`}
            >
              {t('Slow Luxury', 'Slow Luxury')}
            </button>
            <button
              type="button"
              onClick={() => setMotionMode('dynamic')}
              className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all duration-200 ${motionMode === 'dynamic'
                ? 'bg-b-coral text-white'
                : 'dark:text-white/55 text-black/55 hover:dark:text-white hover:text-black'
                }`}
            >
              {t('Tech Dynamic', 'Tech Dynamic')}
            </button>
          </div>
        </motion.div>

        <motion.h1
          variants={variants.item}
          className="font-cal text-5xl sm:text-6xl md:text-7xl xl:text-[84px] leading-[1.06] tracking-[-2px] dark:text-white text-b-dark"
        >
          <motion.span
            custom={0}
            variants={variants.row}
            className="inline-flex flex-nowrap items-center justify-center gap-2"
            animate={motionMode === 'dynamic' ? { y: [0, -3, 0] } : undefined}
            transition={motionMode === 'dynamic' ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 } : undefined}
          >
            <span>{t('Diseño que', 'Design that')}</span>
            <HeroLinePhoto src={imgs[0]} alt="" />
            <span className="hero-shimmer font-semibold">{t('Piensa.', 'Thinks.')}</span>
          </motion.span>
          <br />
          <motion.span
            custom={1}
            variants={variants.row}
            className="inline-flex flex-nowrap items-center justify-center gap-2"
            animate={motionMode === 'dynamic' ? { y: [0, 2, 0] } : undefined}
            transition={motionMode === 'dynamic' ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.35 } : undefined}
          >
            <span className="hero-shimmer font-semibold">{t('Sistemas', 'Systems')}</span>
            <HeroLinePhoto src={imgs[1]} alt="" />
            <span>{t('que funcionan.', 'that work.')}</span>
          </motion.span>
          <br />
          <motion.span
            custom={2}
            variants={variants.row}
            className="inline-flex flex-nowrap items-center justify-center gap-2"
            animate={motionMode === 'dynamic' ? { y: [0, -2, 0] } : undefined}
            transition={motionMode === 'dynamic' ? { duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } : undefined}
          >
            <span>{t('Experiencias', 'Experiences')}</span>
            <HeroLinePhoto src={imgs[2]} alt="" />
            <span className="hero-shimmer font-semibold">{t('que conectan.', 'that connect.')}</span>
          </motion.span>
        </motion.h1>

        <motion.p
          variants={variants.item}
          className="dark:text-white/50 text-black/55 text-base md:text-lg max-w-[520px] leading-[1.75]"
        >
          {t(
            'Diseño, branding, IA y automatización — convergiendo en sistemas y experiencias que funcionan desde el núcleo.',
            'Design, branding, AI and automation — converging into systems and experiences that work from the core.'
          )}
        </motion.p>

        <motion.div variants={variants.item} className="flex flex-wrap items-center gap-4 justify-center">
          <a
            href="#enfoque"
            className="group relative inline-flex items-center gap-2.5 glass dark:text-white text-black text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(81,112,255,.22)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-b-coral" />
            {t('Conoce el enfoque', 'Learn the approach')}
            <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
          </a>
          <a
            href="#enfoque"
            className="inline-flex items-center gap-2.5 bg-b-blue text-white text-sm font-semibold px-7 py-3.5 rounded-full glow-blue hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(81,112,255,.5)] transition-all duration-300"
          >
            {t('Explorar', 'Explore')}
          </a>
        </motion.div>

        <motion.div
          variants={variants.item}
          className="flex items-center gap-2 dark:text-white/25 text-black/30 text-xs font-medium mt-4"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={13} />
          {t('Scroll para explorar', 'Scroll to explore')}
        </motion.div>
      </motion.div>
    </section>
  )
}
