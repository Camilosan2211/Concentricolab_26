import { motion } from 'framer-motion'
import { Youtube, ArrowRight, Play } from 'lucide-react'

export default function Contenido({lang}){
  const t=(es,en)=>lang==='es'?es:en
  return(
    <section id="contenido" className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-lg">
          <motion.p className="text-[12px] font-bold tracking-[.12em] uppercase dark:text-white/30 text-black/35"
            initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}>
            {t('Del laboratorio','From the lab')}
          </motion.p>
          <motion.h2 className="font-cal text-3xl md:text-4xl dark:text-white text-b-dark leading-tight"
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            transition={{duration:.75,ease:[.16,1,.3,1],delay:.08}}>
            {t('Contenido que ','Content that ')}
            <span className="text-grad">{t('construimos','we build')}</span>
          </motion.h2>
          <motion.p className="dark:text-white/40 text-black/45 text-sm leading-[1.7]"
            initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            transition={{duration:.7,ease:[.16,1,.3,1],delay:.16}}>
            {t('Videos, guías y recursos sobre diseño, IA y automatización — producidos desde Bogotá para el mundo.',
               'Videos, guides and resources on design, AI and automation — produced from Bogotá for the world.')}
          </motion.p>
        </div>

        {/* Subtle YouTube strip */}
        <motion.div
          className="glass rounded-2xl flex items-center gap-5 px-7 py-5 max-w-2xl"
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}} transition={{duration:.7,ease:[.16,1,.3,1]}}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{background:'rgba(81,112,255,.12)',border:'1px solid rgba(81,112,255,.22)'}}>
            <Youtube size={18} className="text-b-blue"/>
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <p className="dark:text-white text-b-dark text-sm font-semibold truncate">
              {t('Is UX Design Really Dead in 2026?','Is UX Design Really Dead in 2026?')}
            </p>
            <p className="dark:text-white/35 text-black/40 text-xs">
              {t('Próximamente en','Coming soon on')} YouTube · @ConcentricLab
            </p>
          </div>
          <a href="https://www.youtube.com/@ConcentricLab" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1.5 bg-b-blue text-white text-[12px] font-semibold px-4 py-2 rounded-full hover:-translate-y-0.5 transition-all duration-200">
            <Play size={11} fill="white"/>
            {t('Ir a YouTube','Go to YouTube')}
            <ArrowRight size={11}/>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
