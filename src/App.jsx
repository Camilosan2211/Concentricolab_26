import { useState, useEffect } from 'react'
import { useLenis }   from './hooks/useLenis'
import { useCursor }  from './hooks/useCursor'

import ScrollToTop          from './components/ScrollToTop'
import Navbar               from './components/Navbar'
import GeometricBackground  from './components/ui/geometric'

import Hero       from './sections/Hero'
import Ticker     from './sections/Ticker'
import Enfoque    from './sections/Enfoque'
import Manifiesto from './sections/Manifiesto'
import Productos  from './sections/Productos'
import Proceso    from './sections/Proceso'
import Stack      from './sections/Stack'
import Connect    from './sections/Connect'
import Footer     from './sections/Footer'

// LabStats eliminado — las métricas ya están integradas en Manifiesto.jsx

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
      {/* Fondo geométrico — recibe darkMode para adaptar colores */}
      <GeometricBackground darkMode={dark} />

      <div id="pb" aria-hidden="true" />
      <div className="cur-dot"  style={{ opacity: 0 }} aria-hidden="true" />
      <div className="cur-ring" style={{ opacity: 0 }} aria-hidden="true" />
      <div className="film-grain-overlay" aria-hidden="true" />

      <Navbar lang={lang} setLang={setLang} dark={dark} setDark={setDark} />

      <main className="relative z-10">
        <Hero       lang={lang} />
        <Ticker     />
        <Enfoque    lang={lang} />
        <Manifiesto lang={lang} />
        <Productos  lang={lang} />
        <Proceso    lang={lang} />
        <Stack      lang={lang} />
        <Connect    lang={lang} />
      </main>

      <Footer lang={lang} />
      <ScrollToTop />
    </>
  )
}
