import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { clsx } from 'clsx'

const navLinks = [
  { href:'#productos',  es:'Productos',  en:'Products'  },
  { href:'#enfoque',    es:'Enfoque',    en:'Focus'      },
  { href:'#manifiesto', es:'Manifiesto', en:'Manifesto'  },
  { href:'#contenido',  es:'Contenido',  en:'Content'    },
]

export default function Navbar({ lang, setLang, dark, setDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(()=>{
    const fn = ()=> setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, {passive:true})
    return ()=> window.removeEventListener('scroll', fn)
  },[])

  const t = (es,en) => lang==='es' ? es : en

  const toggleDark = () => {
    setDark(d => {
      document.documentElement.classList.toggle('light', d)
      return !d
    })
  }

  return (
    <>
      <header className={clsx(
        'fixed top-0 left-0 w-full z-50 flex flex-col items-center transition-all duration-300',
        scrolled
          ? 'dark:bg-[rgba(0,3,31,.78)] bg-[rgba(248,247,244,.88)] backdrop-blur-xl border-b dark:border-white/5 border-black/6 shadow-md'
          : ''
      )}>
        {/* Notch pill */}
        <div className="flex items-center gap-2 px-5 py-1.5 bg-b-blue rounded-b-[60px] mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-b-coral animate-pulse"/>
          <span className="text-white text-[11px] font-medium tracking-wide">
            {t('Trabajando en nuevos proyectos ✦','Working on new projects ✦')}
          </span>
        </div>

        {/* Bar */}
        <div className="w-full max-w-[1200px] flex items-center justify-between px-6 lg:px-10 py-3">
          <a href="#hero" className="flex items-center gap-2">
            <img src="/assets/images/logo.png" alt="Concéntrico Lab" className="h-6 w-auto"/>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(l=>(
              <a key={l.href} href={l.href}
                className="text-sm dark:text-white/50 text-black/50 hover:dark:text-white hover:text-black font-medium transition-colors duration-200 relative group">
                {t(l.es,l.en)}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-b-blue group-hover:w-full transition-all duration-300"/>
              </a>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Light/Dark */}
            <button
              onClick={toggleDark}
              aria-label="Toggle theme"
              className="glass w-9 h-9 rounded-full flex items-center justify-center dark:text-white/60 text-black/50 hover:dark:text-white hover:text-black transition-colors duration-200"
            >
              {dark ? <Sun size={15}/> : <Moon size={15}/>}
            </button>

            {/* Lang */}
            <button
              onClick={()=> setLang(l => l==='es'?'en':'es')}
              className="glass dark:text-white/60 text-black/50 text-[13px] font-bold px-3.5 py-1.5 rounded-full hover:dark:text-white hover:text-black transition-all duration-200"
            >
              {lang.toUpperCase()}
            </button>

            {/* CTA */}
            <a href="#productos"
              className="hidden md:inline-flex items-center gap-2 bg-b-blue text-white text-sm font-semibold px-5 py-2 rounded-full glow-blue hover:-translate-y-0.5 transition-all duration-200">
              {t('Ver productos ahora','See products now')}
            </a>

            {/* Hamburger */}
            <button className="md:hidden dark:text-white/70 text-black/60 hover:dark:text-white hover:text-black transition-colors"
              onClick={()=>setOpen(true)} aria-label="Menú">
              <Menu size={22}/>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-10 dark:bg-b-dark bg-b-light"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.3}}>
            <button className="absolute top-6 right-6 dark:text-white/60 text-black/50 hover:dark:text-white hover:text-black"
              onClick={()=>setOpen(false)}><X size={26}/></button>
            {navLinks.map((l,i)=>(
              <motion.a key={l.href} href={l.href} onClick={()=>setOpen(false)}
                className="font-cal text-4xl dark:text-white text-black hover:text-b-blue transition-colors"
                initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*.08}}>
                {t(l.es,l.en)}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
