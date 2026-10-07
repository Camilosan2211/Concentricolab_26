import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
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
    const root = document.documentElement
    root.classList.toggle('dark', dark)
    root.classList.toggle('light', !dark)
    root.style.colorScheme = dark ? 'dark' : 'light'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#00031F' : '#F8F7F4')
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
  
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return

      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return

      const targetId = hash.slice(1)
      const targetEl = document.getElementById(targetId)
      if (!targetEl) return

      e.preventDefault()

      const lenis = window.__lenis
      if (lenis) {
        lenis.scrollTo(targetEl, {
          duration: 1.4,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          offset: -80,
        })
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' })
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
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
      <Analytics />
      <SpeedInsights />
    </>
  )
}
