import { useEffect } from 'react'
import Lenis from 'lenis'
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: t => Math.min(1, 1.001 - Math.pow(2,-10*t)), smoothWheel: true })
    const pb = document.getElementById('pb')
    lenis.on('scroll', ({ progress }) => { if(pb) pb.style.width = (progress*100)+'%' })
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
}
