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
import Proceso     from './sections/Proceso'
import Connect     from './sections/Connect'
import Footer      from './sections/Footer'

export default function App() {
  const [lang, setLang] = useState('es')
  const [dark, setDark] = useState(true)

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
    }
  }, [dark])

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
        <Capacidades lang={lang} />
        <Enfoque     lang={lang} />
        <Manifiesto  lang={lang} />
        <Productos   lang={lang} />
        <Proceso     lang={lang} />
        <Connect     lang={lang} />
      </main>

      <Footer lang={lang} />
      <ScrollToTop />
    </>
  )
}
