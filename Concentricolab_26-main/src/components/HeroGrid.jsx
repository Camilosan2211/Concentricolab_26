/**
 * HeroGrid — grid perspectiva holográfica + glows laterales
 * Pure CSS animation. Sin Three.js, sin canvas, zero dependencies.
 */
export default function HeroGrid() {
  return (
    <div className="hero-grid-root" aria-hidden="true">
      {/* Grid perspectiva inferior */}
      <div className="hero-grid-perspective">
        <div className="hero-grid-lines" />
      </div>

      {/* Línea de scan horizontal animada */}
      <div className="hero-scan-line" />

      {/* Glows laterales — azul izq, coral der */}
      <div className="hero-side-glow hero-side-glow-left" />
      <div className="hero-side-glow hero-side-glow-right" />

      {/* Orbe central difuso de profundidad */}
      <div className="hero-center-orb" />
    </div>
  )
}
