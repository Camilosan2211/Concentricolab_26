import { motion } from 'framer-motion'

const navLinks = [
  { href:'#productos',  es:'Productos',  en:'Products'  },
  { href:'#enfoque',    es:'Enfoque',    en:'Focus'     },
  { href:'#manifiesto', es:'Manifiesto', en:'Manifesto' },
  { href:'#contenido',  es:'Contenido',  en:'Content'   },
]
const social = [
  { label:'Instagram', href:'https://www.instagram.com/concentriclab'          },
  { label:'LinkedIn',  href:'https://www.linkedin.com/company/concentriclab/'  },
  { label:'YouTube',   href:'https://www.youtube.com/@ConcentricLab'           },
]
const products = [
  { label:'Kit de Métricas', href:'https://concentriclab.gumroad.com/l/metricasdigitales' },
  { label:'Ver todos →',     href:'https://concentriclab.gumroad.com'                     },
]

export default function Footer({ lang }) {
  const t = (es, en) => lang === 'es' ? es : en
  return (
    <footer className="relative px-6 pb-6 pt-24 overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(to right,transparent,rgba(81,112,255,.22),transparent)' }} />

      <div className="max-w-[1200px] mx-auto">
        {/* Big CTA */}
        <motion.div className="flex flex-col items-center text-center gap-6 pb-20"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .9, ease: [.16,1,.3,1] }}>
          <p className="text-[12px] font-bold tracking-[.12em] uppercase dark:text-white/25 text-black/30">
            {t('¿Listo para construir?', 'Ready to build?')}
          </p>
          <h2 className="font-cal text-5xl md:text-6xl lg:text-7xl dark:text-white text-b-dark leading-tight tracking-[-1.5px]">
            {t('Hagamos algo', "Let's build something")}<br />
            <span className="text-grad">{t('que funcione.', 'that works.')}</span>
          </h2>
          <a href="#connect"
            className="inline-flex items-center gap-2.5 bg-b-blue text-white text-sm font-semibold px-8 py-4 rounded-full glow-blue hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(81,112,255,.55)] transition-all duration-300 mt-2">
            {t('Conectar con el lab', 'Connect with the lab')}
          </a>
        </motion.div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t dark:border-white/5 border-black/6 pt-12 pb-10">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <img src="/assets/images/logo.png" alt="Concéntrico Lab" className="h-7 w-auto self-start" />
            <p className="dark:text-white/35 text-black/40 text-sm leading-[1.7] max-w-[200px]">
              {t('Laboratorio digital desde Bogotá.', 'Digital lab from Bogotá.')}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold tracking-[.1em] uppercase dark:text-white/25 text-black/30">
              {t('Navegación', 'Navigation')}
            </span>
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                className="dark:text-white/45 text-black/50 hover:dark:text-white hover:text-black text-sm transition-colors duration-200">
                {t(l.es, l.en)}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold tracking-[.1em] uppercase dark:text-white/25 text-black/30">Social</span>
            {social.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="dark:text-white/45 text-black/50 hover:dark:text-white hover:text-black text-sm transition-colors duration-200">
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold tracking-[.1em] uppercase dark:text-white/25 text-black/30">
              {t('Productos', 'Products')}
            </span>
            {products.map(p => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                className="dark:text-white/45 text-black/50 hover:dark:text-white hover:text-black text-sm transition-colors duration-200">
                {p.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-t dark:border-white/5 border-black/6 pt-6">
          <p className="dark:text-white/22 text-black/30 text-xs">© 2026 Concéntrico Lab · Bogotá, Colombia</p>
          <p className="dark:text-white/22 text-black/30 text-xs">
            {t('Construido con diseño, IA y mucho café.', 'Built with design, AI and a lot of coffee.')}
          </p>
        </div>
      </div>
    </footer>
  )
}
