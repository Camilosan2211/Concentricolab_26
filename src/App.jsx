import { useState, useEffect } from 'react'
import { useLenis }   from './hooks/useLenis'
import { useCursor }  from './hooks/useCursor'

import ScrollToTop          from './components/ScrollToTop'
import Navbar               from './components/Navbar'
import GeometricBackground  from './components/ui/geometric'

import Hero        from './sections/Hero'
import Ticker      from './sections/Ticker'
import Capacidades from './sections/Capacidades'
import Enfoque     from './sections/Enfoque'
import Manifiesto  from './sections/Manifiesto'
import Productos   from './sections/Productos'
import Connect     from './sections/Connect'
import Footer      from './sections/Footer'

export default function App() {
  const [lang, setLang] = useState('es')
  const [dark, setDark] = useState(true)

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }, [dark])

  useEffect(() => {
    const pb = document.getElementById('pb')
    if (!pb) return
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      pb.style.width = pct + '%'
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useLenis()
  useCursor()

  return (
    <>
      <GeometricBackground darkMode={dark} />

      <div id="pb" aria-hidden="true" />
      <div className="cur-dot"  style={{ opacity: 0 }} aria-hidden="true" />
      <div className="cur-ring" style={{ opacity: 0 }} aria-hidden="true" />
      <div className="film-grain-overlay" aria-hidden="true" />

      <Navbar lang={lang} setLang={setLang} dark={dark} setDark={setDark} />

      <main className="relative z-10">
        <Hero        lang={lang} />
        <Ticker      />
        <Enfoque     lang={lang} />
        <Capacidades lang={lang} />
        <Manifiesto  lang={lang} />
        <Productos   lang={lang} />
        <Connect     lang={lang} />
      </main>

      <Footer lang={lang} />
      <ScrollToTop />
    </>
  )
}
