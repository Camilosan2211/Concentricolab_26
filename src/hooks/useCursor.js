/**
 * useCursor — cursor híbrido: blend-mode + color de marca
 *
 * DOT: punto coral con mix-blend-mode:difference → invierte los
 *      colores debajo (efecto premium) pero con identidad de marca
 * RING: anillo azul semitransparente con lerp suave y glow sutil
 * HOVER: ring se expande levemente + dot se vuelve sólido blanco
 *        (blend-mode hace que se vea como "recorte" del fondo)
 * CLICK: ping rápido hacia afuera
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

    // ── DOT — pequeño, coral, con blend-mode ───────────────────
    Object.assign(dot.style, {
      position:      'fixed',
      width:         '9px',
      height:        '9px',
      borderRadius:  '50%',
      background:    '#FF6D4D',
      boxShadow:     '0 0 8px 2px rgba(255,109,77,0.50)',
      transform:     'translate(-50%,-50%)',
      pointerEvents: 'none',
      zIndex:        '99999',
      mixBlendMode:  'difference',      // ← el efecto premium
      transition:    'width 0.15s ease, height 0.15s ease, transform 0.12s ease, background 0.18s ease',
      willChange:    'left, top',
    })

    // ── RING — azul, mediano, sin blend-mode ────────────────────
    Object.assign(ring.style, {
      position:      'fixed',
      width:         '34px',
      height:        '34px',
      borderRadius:  '50%',
      border:        '1.5px solid rgba(81,112,255,0.60)',
      boxShadow:     '0 0 12px 1px rgba(81,112,255,0.20)',
      transform:     'translate(-50%,-50%)',
      pointerEvents: 'none',
      zIndex:        '99998',
      background:    'rgba(81,112,255,0.04)',
      transition:    [
        'width 0.25s cubic-bezier(.34,1.56,.64,1)',
        'height 0.25s cubic-bezier(.34,1.56,.64,1)',
        'border-color 0.2s ease',
        'box-shadow 0.2s ease',
        'background 0.2s ease',
        'opacity 0.3s ease',
      ].join(', '),
      willChange:    'left, top',
    })

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

    // ── Move ────────────────────────────────────────────────────
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
      if (!visible) {
        visible = true
        dot.style.opacity  = '1'
        ring.style.opacity = '0.80'
      }
    }

    // ── Hover sobre interactivos ────────────────────────────────
    const onOver = (e) => {
      if (!e.target.closest('a,button,[data-mag]')) return
      isHov = true
      // Ring: más grande, más azul
      ring.style.width       = '48px'
      ring.style.height      = '48px'
      ring.style.borderColor = 'rgba(81,112,255,0.85)'
      ring.style.boxShadow   = '0 0 20px 3px rgba(81,112,255,0.30)'
      ring.style.background  = 'rgba(81,112,255,0.07)'
      // Dot: se achica (el blend-mode crea el recorte)
      dot.style.width     = '14px'
      dot.style.height    = '14px'
      dot.style.background = '#ffffff'
      dot.style.boxShadow  = 'none'
    }

    const onOut = (e) => {
      if (!e.target.closest('a,button,[data-mag]')) return
      isHov = false
      ring.style.width       = '34px'
      ring.style.height      = '34px'
      ring.style.borderColor = 'rgba(81,112,255,0.60)'
      ring.style.boxShadow   = '0 0 12px 1px rgba(81,112,255,0.20)'
      ring.style.background  = 'rgba(81,112,255,0.04)'
      dot.style.width      = '9px'
      dot.style.height     = '9px'
      dot.style.background = '#FF6D4D'
      dot.style.boxShadow  = '0 0 8px 2px rgba(255,109,77,0.50)'
    }

    // ── Click: ping ─────────────────────────────────────────────
    const onDown = () => {
      const sz = isHov ? '62px' : '46px'
      ring.style.width   = sz; ring.style.height  = sz
      ring.style.opacity = '0.40'
      dot.style.transform = 'translate(-50%,-50%) scale(0.50)'
    }
    const onUp = () => {
      ring.style.width   = isHov ? '48px' : '34px'
      ring.style.height  = isHov ? '48px' : '34px'
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
