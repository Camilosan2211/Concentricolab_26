import { motion } from 'motion/react'

const navLinks = [
  { href: '#capacidades', es: 'Servicios',  en: 'Services'  },
  { href: '#enfoque',     es: 'Enfoque',    en: 'Approach'  },
  { href: '#principios',  es: 'Principios', en: 'Principles'},
  { href: '#connect',     es: 'Contacto',   en: 'Contact'   },
  { href: '#productos',   es: 'Recursos',   en: 'Resources' },
]
const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/concentriclab' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/concentriclab/' },
  { label: 'YouTube',   href: 'https://www.youtube.com/@ConcentricLab' },
]
const products = [
  { label: 'Kit de Métricas', href: 'https://concentriclab.gumroad.com/l/metricasdigitales' },
  { label: 'Ver todos →',     href: 'https://concentriclab.gumroad.com' },
]

export default function Footer({ lang }) {
  const t    = (es, en) => lang === 'es' ? es : en
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 px-4 pb-8 pt-20 mb-8 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right,transparent,rgba(77,102,255,.22),transparent)' }}
      />

      <div className="max-w-[1200px] mx-auto">

        {/* Headline */}
        <motion.div
          className="text-center pb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-cal text-3xl md:text-4xl lg:text-5xl dark:text-white/90 text-b-dark leading-tight tracking-[-0.5px]">
            {t('Construimos desde Bogotá', 'We build from Bogotá')}
          </p>
          <p className="font-cal text-3xl md:text-4xl lg:text-5xl leading-tight tracking-[-0.5px] text-grad">
            {t('para cualquier parte.', 'for anywhere.')}
          </p>
          <a
            href="#connect"
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold dark:text-white/50 text-black/45 hover:dark:text-white hover:text-black transition-colors duration-200"
          >
            {t('Iniciemos algo →', "Let's start something →")}
          </a>
        </motion.div>

        {/* Grid de links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 pt-10 pb-8 border-t dark:border-white/10 border-black/12">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase dark:text-white/50 text-black/45">
              {t('Navegación', 'Navigation')}
            </span>
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm transition-colors duration-200 dark:text-white/55 dark:hover:text-white text-black/50 hover:text-black">
                {t(l.es, l.en)}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase dark:text-white/50 text-black/45">
              {t('Recursos', 'Resources')}
            </span>
            {products.map(p => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                className="text-sm transition-colors duration-200 dark:text-white/55 dark:hover:text-white text-black/50 hover:text-black">
                {p.label}
              </a>
            ))}
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase dark:text-white/50 text-black/45">
              Social
            </span>
            {social.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-sm transition-colors duration-200 dark:text-white/50 dark:hover:text-white text-black/50 hover:text-black">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-7 grid grid-cols-3 items-center gap-4 border-t dark:border-white/10 border-black/12">
          <a href="#hero" className="flex items-center gap-0 group" aria-label="Concéntrico Lab">
            <img
              src="/assets/images/logo.png"
              alt="Concéntrico Lab"
              className="h-5 w-auto opacity-55 group-hover:opacity-90 transition-opacity duration-200 dark:brightness-0 dark:invert"
            />
          </a>
          <p className="text-[11px] text-center dark:text-white/30 text-black/35">
            © {year} Concéntrico Lab. Bogotá, Colombia.
          </p>
          <p className="text-[11px] text-right italic hidden sm:block dark:text-white/30 text-black/35">
            {t('Construido con diseño, IA y mucho café.', 'Built with design, AI and a lot of coffee.')}
          </p>
        </div>
      </div>
    </footer>
  )
}
