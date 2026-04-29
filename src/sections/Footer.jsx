import { motion } from 'framer-motion'

const navLinks = [
  { href: '#productos',  es: 'Productos',  en: 'Products'  },
  { href: '#enfoque',    es: 'Enfoque',    en: 'Focus'     },
  { href: '#manifiesto', es: 'Manifiesto', en: 'Manifesto' },
  { href: '#proceso',    es: 'Proceso',    en: 'Process'   },
  { href: '#contenido',  es: 'Contenido',  en: 'Content'   },
]
const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/concentriclab' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/concentriclab/' },
  { label: 'YouTube',   href: 'https://www.youtube.com/@ConcentricLab' },
]
const products = [
  { label: 'Kit de Métricas', href: 'https://concentriclab.gumroad.com/l/metricasdigitales' },
  { label: 'Ver todos →',    href: 'https://concentriclab.gumroad.com' },
]

export default function Footer({ lang }) {
  const t    = (es, en) => lang === 'es' ? es : en
  const year = new Date().getFullYear()

  return (
    /* Footer con fondo adaptativo al modo — transparencia coherente */
    <footer className="relative z-10 px-6 pb-8 pt-20 overflow-hidden dark:bg-[linear-gradient(180deg,#00031F_0%,#020425_100%)] bg-[linear-gradient(180deg,rgba(238,241,255,0.5)_0%,rgba(81,112,255,0.12)_100%)]">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right,transparent,rgba(81,112,255,.22),transparent)' }}
      />

      <div className="max-w-[1200px] mx-auto">

        {/* CTA grande — adaptativo al modo */}
        <motion.div
          className="flex flex-col items-center text-center gap-6 pb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[12px] font-bold tracking-[0.12em] uppercase dark:text-white/28 text-black/35">
            {t('¿Listo para construir?', 'Ready to build?')}
          </p>
          <h2 className="font-cal text-5xl md:text-6xl lg:text-7xl leading-tight tracking-[-1.5px] dark:text-white text-b-dark">
            {t('Hagamos algo', "Let's build something")}
            <br />
            <span className="text-grad">{t('que funcione.', 'that works.')}</span>
          </h2>
          <a
            href="#connect"
            className="inline-flex items-center gap-2.5 bg-b-blue text-white text-sm font-semibold px-8 py-4 rounded-full glow-blue hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(81,112,255,.55)] transition-all duration-300 mt-2"
          >
            {t('Conectar con el lab', 'Connect with the lab')}
          </a>
        </motion.div>

        {/* Grid de links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 pt-10 pb-8 border-t dark:border-white/6 border-black/8">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase dark:text-white/28 text-black/35">
              {t('Navegación', 'Navigation')}
            </span>
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm transition-colors duration-200 dark:text-white/45 dark:hover:text-white text-black/50 hover:text-black">
                {t(l.es, l.en)}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase dark:text-white/28 text-black/35">
              {t('Productos', 'Products')}
            </span>
            {products.map(p => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                className="text-sm transition-colors duration-200 dark:text-white/45 dark:hover:text-white text-black/50 hover:text-black">
                {p.label}
              </a>
            ))}
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase dark:text-white/28 text-black/35">
              Social
            </span>
            {social.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-sm transition-colors duration-200 dark:text-white/45 dark:hover:text-white text-black/50 hover:text-black">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Barra inferior: Logo | Copyright | Tagline ── */}
        <div className="pt-7 grid grid-cols-3 items-center gap-4 border-t dark:border-white/6 border-black/8">
          {/* Izquierda — logo */}
          <a href="#hero" className="flex items-center gap-0 group" aria-label="Concéntrico Lab">
            <img
              src="/assets/images/logo.png"
              alt="Concéntrico Lab"
              className="h-5 w-auto opacity-55 group-hover:opacity-90 transition-opacity duration-200 dark:brightness-0 dark:invert"
            />
          </a>

          {/* Centro — copyright */}
          <p className="text-[11px] text-center dark:text-white/30 text-black/35">
            © {year} Concéntrico Lab. Bogotá, Colombia.
          </p>

          {/* Derecha — tagline */}
          <p className="text-[11px] text-right italic hidden sm:block dark:text-white/30 text-black/35">
            {t('Construido con diseño, IA y mucho café.', 'Built with design, AI and a lot of coffee.')}
          </p>
        </div>

      </div>
    </footer>
  )
}
