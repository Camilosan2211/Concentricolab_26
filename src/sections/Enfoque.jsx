import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
const tags_es=['Diseño UX/UI','IA Generativa','Branding','Diseño Industrial','Métricas','Automatización','Data storytelling']
const tags_en=['UX/UI Design','Generative AI','Branding','Industrial Design','Metrics','Automation','Data storytelling']
export default function Enfoque({ lang }) {
  const ref   = useRef()
  const inView= useInView(ref,{once:true,margin:'-100px'})
  const text  = lang==='es'
    ? 'Construimos desde el núcleo hacia afuera — del usuario al sistema, del problema a la solución — combinando diseño, IA y automatización.'
    : 'We build from the core outward — from the user to the system, from the problem to the solution — combining design, AI and automation.'
  const tags  = lang==='es'?tags_es:tags_en
  return (
    <section id="enfoque" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-[-60px] right-[-40px] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{background:'radial-gradient(ellipse,rgba(81,112,255,.07) 0%,transparent 70%)',filter:'blur(40px)'}} aria-hidden="true"/>
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-10">
        <motion.div className="flex items-center gap-3"
          initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:.6}}>
          <span className="glass-blue inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[.07em] uppercase text-b-blue-lt px-3 py-1.5 rounded-full border border-b-blue/20">
            👋 {lang==='es'?'hola':'hello'}
          </span>
          <span className="text-[12px] dark:text-white/40 text-black/40 font-semibold tracking-[.1em] uppercase">
            {lang==='es'?'Nuestro enfoque':'Our approach'}
          </span>
        </motion.div>
        <div ref={ref} className="text-center font-cal text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.18] max-w-[800px] tracking-[-0.5px]">
          {text.split('').map((ch,i)=>(
            <motion.span key={i} className="inline"
              initial={{color:'rgba(10,10,24,0.18)' }}
              animate={inView?{color: document.documentElement.classList.contains('light') ? 'rgba(10,10,24,1)' : 'rgba(245,245,240,1)'}:{}}
              transition={{delay:i*.011,duration:.38,ease:[.16,1,.3,1]}}>
              {ch}
            </motion.span>
          ))}
        </div>
        <motion.div className="flex flex-wrap justify-center gap-2.5 mt-2"
          initial="hidden" whileInView="show" viewport={{once:true,margin:'-60px'}}
          variants={{hidden:{},show:{transition:{staggerChildren:.07}}}}>
          {tags.map((tag,i)=>(
            <motion.span key={i}
              className="inline-flex items-center gap-1.5 glass-blue text-b-blue-lt text-[12px] font-semibold px-4 py-2 rounded-full border border-b-blue/18"
              variants={{hidden:{opacity:0,scale:.88,rotate:-3},show:{opacity:1,scale:1,rotate:0,transition:{duration:.5,ease:[.34,1.56,.64,1]}}}}>
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
