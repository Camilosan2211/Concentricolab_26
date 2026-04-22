import { useState, useEffect } from 'react'
import { useLenis }   from './hooks/useLenis'
import { useCursor }  from './hooks/useCursor'

import ParticleField  from './components/ParticleField'
import ScrollToTop    from './components/ScrollToTop'
import Navbar         from './components/Navbar'

import Hero           from './sections/Hero'
import Ticker         from './sections/Ticker'
import Enfoque        from './sections/Enfoque'
import Manifiesto     from './sections/Manifiesto'
import LabStats       from './sections/LabStats'
import Productos      from './sections/Productos'
import Contenido      from './sections/Contenido'
import Stack          from './sections/Stack'
import Connect        from './sections/Connect'
import Footer         from './sections/Footer'

export default function App() {
  const [lang, setLang] = useState('es')
  const [dark, setDark] = useState(true)

  // Sync dark mode class on <html>
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
      {/* Progress bar */}
      <div id="pb" aria-hidden="true" />

      {/* Cursor */}
      <div className="cur-dot"  style={{ opacity: 0 }} aria-hidden="true" />
      <div className="cur-ring" style={{ opacity: 0 }} aria-hidden="true" />

      {/* 3-D canvas background */}
      <ParticleField darkMode={dark} />

      {/* Nav */}
      <Navbar lang={lang} setLang={setLang} dark={dark} setDark={setDark} />

      <main>
        <Hero       lang={lang} />
        <Ticker     />
        <Enfoque    lang={lang} />
        <Manifiesto lang={lang} />
        <LabStats   lang={lang} />
        <Productos  lang={lang} />
        <Contenido  lang={lang} />
        <Stack      lang={lang} />
        <Connect    lang={lang} />
      </main>

      <Footer lang={lang} />
      <ScrollToTop />
    </>
  )
}
