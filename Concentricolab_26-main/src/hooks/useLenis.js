/**
 * useLenis.js — Smooth scroll con Lenis
 *
 * Cambio respecto a la versión anterior:
 * Expone la instancia en window.__lenis para que componentes
 * como ScrollExpandMedia puedan pausar/reanudar el scroll
 * suave durante su captura de eventos wheel/touch.
 *
 * Uso en ScrollExpandMedia:
 *   window.__lenis?.stop()   // pausa durante expansión
 *   window.__lenis?.start()  // reanuda al completar
 */
import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    const lenis = new Lenis({
      duration:    1.4,
      easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Exponer globalmente para pause/resume desde otras secciones
    window.__lenis = lenis

    // Progress bar (elemento #pb en index.html si existe)
    const pb = document.getElementById('pb')
    lenis.on('scroll', ({ progress }) => {
      if (pb) pb.style.width = progress * 100 + '%'
    })

    const raf = (t) => {
      lenis.raf(t)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      window.__lenis = null
    }
  }, [])
}
