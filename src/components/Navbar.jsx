import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { clsx } from 'clsx'

const navLinks = [
  { href:'#productos',  es:'Productos',  en:'Products'  },
  { href:'#enfoque',    es:'Enfoque',    en:'Focus'     },
  { href:'#manifiesto', es:'Manifiesto', en:'Manifesto' },
  { href:'#contenido',  es:'Contenido',  en:'Content'   },
]

export default function Navbar({ lang, setLang, dark, setDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const t = (es, en) => lang === 'es' ? es : en

  const toggleDark = () => {
    setDark(d => {
      document.documentElement.classList.toggle('light', d)
      return !d
    })
  }

  return (
    <>
      <header 
        className={clsx(
        'fixed top-0 left-0 w-full z-50 flex flex-col items-center transition-all duration-400',
        scrolled && 'border-b',
      )}
      style={scrolled ? {
        background: dark ? 'rgba(0, 3, 31, 0.52)' : 'rgba(248, 247, 244, 0.48)',
        borderColor: dark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(81, 112, 255, 0.15)',
        boxShadow: dark ? '0 2px 12px rgba(0, 0, 0, 0.2)' : '0 2px 16px rgba(0, 0, 0, 0.06)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      } : {
        background: dark ? 'transparent' : 'rgba(248, 247, 244, 0.4)',
      }}
      >
        {/* Notch */}
        <div className="flex items-center gap-2 px-5 py-1.5 bg-b-blue rounded-b-[60px] mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-b-coral animate-pulse" />
          <span className="text-white text-[11px] font-medium tracking-wide">
            {t('Trabajando en nuevos proyectos ✦', 'Working on new projects ✦')}
          </span>
        </div>

        <div className="w-full max-w-[1200px] flex items-center justify-between px-6 lg:px-10 py-3">
          <a href="#hero" className="flex items-center gap-2">
            <img src="/assets/images/logo.png" alt="Concéntrico Lab" className="h-5 w-auto dark:brightness-100 brightness-75" />
          </a>

          {/* Desktop nav — texto legible en ambos modos */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm font-medium transition-colors duration-200 relative group"
                style={{
                  color: dark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(10, 10, 24, 0.85)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = dark ? 'rgba(255, 255, 255, 1)' : 'rgba(10, 10, 24, 1)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = dark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(10, 10, 24, 0.85)'
                }}>
                {t(l.es, l.en)}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-b-blue group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme toggle — con border explícito en light para visibilidad */}
            <button
              onClick={toggleDark}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              style={{
                background: dark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.7)',
                border: dark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(81, 112, 255, 0.25)',
                color: dark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(10, 10, 24, 0.85)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = dark ? 'rgba(255, 255, 255, 1)' : 'rgba(10, 10, 24, 1)'
                e.currentTarget.style.background = dark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.85)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = dark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(10, 10, 24, 0.85)'
                e.currentTarget.style.background = dark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.7)'
              }}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Lang toggle */}
            <button
              onClick={() => setLang(l => l === 'es' ? 'en' : 'es')}
              className="text-[13px] font-bold px-3.5 py-1.5 rounded-full transition-all duration-200 backdrop-blur-sm"
              style={{
                background: dark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.7)',
                border: dark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(81, 112, 255, 0.25)',
                color: dark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(10, 10, 24, 0.85)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = dark ? 'rgba(255, 255, 255, 1)' : 'rgba(10, 10, 24, 1)'
                e.currentTarget.style.background = dark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.85)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = dark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(10, 10, 24, 0.85)'
                e.currentTarget.style.background = dark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.7)'
              }}
            >
              {lang.toUpperCase()}
            </button>

            {/* CTA */}
            <a href="#productos"
              className="hidden md:inline-flex items-center gap-2 bg-b-blue text-white text-sm font-semibold px-5 py-2 rounded-full glow-blue hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(81,112,255,.45)] transition-all duration-200">
              {t('Explorar', 'Explore')}
            </a>

            {/* Mobile menu */}
            <button
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200"
              style={{
                background: dark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.7)',
                border: dark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(81, 112, 255, 0.25)',
                color: dark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(10, 10, 24, 0.85)',
              }}
              onClick={() => setOpen(o => !o)}
              aria-label="Menu">
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-28 px-6 pb-8 dark:bg-[rgba(0,3,31,.94)] bg-[rgba(220,225,255,.92)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: .25, ease: [.22, 1, .36, 1] }}>
            <nav className="flex flex-col gap-4">
              {navLinks.map((l, i) => (
                <motion.a key={l.href} href={l.href}
                  className="font-cal text-3xl dark:text-white text-[#0A0A18]"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * .05, duration: .3 }}>
                  {t(l.es, l.en)}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto flex gap-3">
              <button onClick={toggleDark}
                className="border border-[rgba(81,112,255,0.30)] dark:border-white/10 bg-white/40 dark:bg-white/[0.07] px-4 py-2 rounded-full text-sm dark:text-white/70 text-[#0A0A18]/70">
                {dark ? '☀ Claro' : '☾ Oscuro'}
              </button>
              <button onClick={() => setLang(l => l === 'es' ? 'en' : 'es')}
                className="border border-[rgba(81,112,255,0.30)] dark:border-white/10 bg-white/40 dark:bg-white/[0.07] px-4 py-2 rounded-full text-sm font-bold dark:text-white/70 text-[#0A0A18]/70">
                {lang === 'es' ? 'EN' : 'ES'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
