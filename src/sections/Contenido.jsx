import { motion } from 'framer-motion'
import { Youtube, ArrowRight, Play } from 'lucide-react'

export default function Contenido({ lang }) {
  const t = (es, en) => (lang === 'es' ? es : en)
  return (
    <section id="contenido" className="relative z-10 py-14 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-3 max-w-lg">
          <motion.p
            className="text-[12px] font-bold tracking-[0.12em] uppercase dark:text-white/30 text-black/35"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('Del laboratorio', 'From the lab')}
          </motion.p>
          <motion.h2
            className="font-cal text-3xl md:text-4xl dark:text-white text-b-dark leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            {t('Contenido que ', 'Content that ')}
            <span className="text-grad">{t('construimos', 'we build')}</span>
          </motion.h2>
        </div>

        <motion.div
          className="glass rounded-2xl px-5 py-4 md:px-8 md:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'rgba(81,112,255,.12)',
                border: '1px solid rgba(81,112,255,.22)',
              }}
            >
              <Youtube size={20} className="text-b-blue" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="dark:text-white text-b-dark text-sm font-semibold leading-snug">
                {t('Contenido en camino en YouTube', 'YouTube content on the way')}
              </p>
              <p className="dark:text-white/40 text-black/45 text-xs leading-relaxed">
                {t(
                  'Videos y recursos sobre diseño, branding, IA y automatización — @ConcentricLab.',
                  'Videos and resources on design, branding, AI and automation — @ConcentricLab.'
                )}
              </p>
            </div>
          </div>
          <a
            href="https://www.youtube.com/@ConcentricLab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 sm:flex-shrink-0 bg-b-blue text-white text-[12px] font-semibold px-5 py-2.5 rounded-full hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
          >
            <Play size={12} fill="white" />
            {t('Ir a YouTube', 'Go to YouTube')}
            <ArrowRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
