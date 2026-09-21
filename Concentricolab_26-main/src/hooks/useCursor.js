/**
 * useCursor — cursor aware del modo claro/oscuro
 * Dark: coral en dot y ring
 * Light: azul eléctrico en dot y ring
 * Glow mínimo en ambos modos
 */
import { useEffect } from 'react'

export function useCursor() {
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return

    const dot  = document.querySelector('.cur-dot')
    const ring = document.querySelector('.cur-ring')
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let visible = false, isHov = false

    // Colores según el modo actual
    const colors = () => {
      const isLight = document.documentElement.classList.contains('light')
      return isLight
        ? { main: '#4D66FF', glow: 'rgba(77,102,255,0.18)', ringBorder: 'rgba(77,102,255,0.55)', ringBg: 'rgba(77,102,255,0.04)', hoverBorder: 'rgba(77,102,255,0.85)', hoverBg: 'rgba(77,102,255,0.08)', hoverGlow: 'rgba(77,102,255,0.22)' }
        : { main: '#FF6D4D', glow: 'rgba(255,109,77,0.16)', ringBorder: 'rgba(255,109,77,0.50)', ringBg: 'rgba(255,109,77,0.04)', hoverBorder: 'rgba(255,109,77,0.85)', hoverBg: 'rgba(255,109,77,0.07)', hoverGlow: 'rgba(255,109,77,0.20)' }
    }

    const applyBase = () => {
      const c = colors()
      Object.assign(dot.style, {
        position:      'fixed',
        width:         '9px',
        height:        '9px',
        borderRadius:  '50%',
        background:    c.main,
        boxShadow:     `0 0 6px 1px ${c.glow}`,
        transform:     'translate(-50%,-50%)',
        pointerEvents: 'none',
        zIndex:        '99999',
        transition:    'width 0.15s ease, height 0.15s ease, transform 0.12s ease, background 0.20s ease, box-shadow 0.20s ease',
        willChange:    'left, top',
      })
      Object.assign(ring.style, {
        position:      'fixed',
        width:         '34px',
        height:        '34px',
        borderRadius:  '50%',
        border:        `1.5px solid ${c.ringBorder}`,
        boxShadow:     `0 0 8px 1px ${c.glow}`,
        background:    c.ringBg,
        transform:     'translate(-50%,-50%)',
        pointerEvents: 'none',
        zIndex:        '99998',
        transition:    [
          'width 0.25s cubic-bezier(.34,1.56,.64,1)',
          'height 0.25s cubic-bezier(.34,1.56,.64,1)',
          'border-color 0.2s ease',
          'box-shadow 0.2s ease',
          'background 0.2s ease',
          'opacity 0.3s ease',
        ].join(', '),
        willChange: 'left, top',
      })
    }

    applyBase()

    // Observar cambios de modo
    const observer = new MutationObserver(() => {
      if (!isHov) applyBase()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // RAF lerp
    let raf
    const loop = () => {
      rx += (mx - rx) * 0.10
      ry += (my - ry) * 0.10
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      raf = requestAnimationFrame(loop)
    }
    loop()

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
      if (!visible) {
        visible = true
        dot.style.opacity = '1'; ring.style.opacity = '0.80'
      }
    }

    const onOver = (e) => {
      if (!e.target.closest('a,button,[data-mag]')) return
      isHov = true
      const c = colors()
      ring.style.width       = '46px'
      ring.style.height      = '46px'
      ring.style.borderColor = c.hoverBorder
      ring.style.boxShadow   = `0 0 14px 2px ${c.hoverGlow}`
      ring.style.background  = c.hoverBg
      dot.style.width        = '12px'
      dot.style.height       = '12px'
    }

    const onOut = (e) => {
      if (!e.target.closest('a,button,[data-mag]')) return
      isHov = false
      applyBase()
      ring.style.width  = '34px'
      ring.style.height = '34px'
      dot.style.width   = '9px'
      dot.style.height  = '9px'
    }

    const onDown = () => {
      const sz = isHov ? '58px' : '44px'
      ring.style.width = sz; ring.style.height = sz; ring.style.opacity = '0.40'
      dot.style.transform = 'translate(-50%,-50%) scale(0.50)'
    }
    const onUp = () => {
      ring.style.width  = isHov ? '46px' : '34px'
      ring.style.height = isHov ? '46px' : '34px'
      ring.style.opacity = '0.80'
      dot.style.transform = 'translate(-50%,-50%) scale(1)'
    }

    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; visible = false }
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '0.80'; visible = true }

    document.addEventListener('mousemove',  onMove, { passive: true })
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mouseout',   onOut)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseout',   onOut)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])
}
