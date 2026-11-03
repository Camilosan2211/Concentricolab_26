import { motion } from 'motion/react'
import { Instagram, ArrowUpRight } from 'lucide-react'

export default function InstagramFeed({ lang }) {
  const t = (es, en) => (lang === 'es' ? es : en)

  return (
    <section id="instagram" aria-label={t('Feed de Instagram de Concéntrico Lab', 'Concéntrico Lab Instagram feed')} className="relative z-10 py-24 px-4 md:px-8 overflow-hidden">
      <div className="section-premium">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div className="flex flex-col gap-3 max-w-2xl">
              <motion.p className="text-[12px] font-bold tracking-[.12em] uppercase dark:text-white/30 text-black/35" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                {t('Desde Instagram', 'From Instagram')}
              </motion.p>
              <motion.h2 className="section-title dark:text-white text-b-dark" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8, ease: [.16, 1, .3, 1], delay: .08 }}>
                {t('El lab en ', 'The lab in ')}
                <span className="text-grad">{t('movimiento', 'motion')}</span>
              </motion.h2>
              <motion.p className="dark:text-white/50 text-black/50 text-sm md:text-base leading-[1.7] max-w-[620px]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: .6, delay: .15 }}>
                {t(
                  'Ideas, procesos, proyectos y exploraciones de Concéntrico Lab, directamente desde nuestro día a día.',
                  'Ideas, processes, projects and explorations from Concéntrico Lab, straight from our day-to-day work.'
                )}
              </motion.p>
            </div>
            <motion.a href="https://www.instagram.com/concentricolab" target="_blank" rel="noopener noreferrer" className="inline-flex w-fit shrink-0 items-center gap-2 glass border dark:border-white/10 border-black/10 dark:text-white/75 text-black/65 hover:dark:text-white hover:text-black px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6, delay: .18 }}>
              <Instagram size={15} className="text-b-blue dark:text-b-blue-lt" />
              {t('Seguir en Instagram', 'Follow on Instagram')}
              <ArrowUpRight size={14} className="opacity-60" />
            </motion.a>
          </div>
          <div className="w-full min-w-0 glass rounded-card p-1.5 md:p-2 border dark:border-white/8 border-black/8">
            <div className="elfsight-app-9ad9c274-eab2-4b84-aa56-1a35308734dc" data-elfsight-app-lazy />
          </div>
        </div>
      </div>
    </section>
  )
}
