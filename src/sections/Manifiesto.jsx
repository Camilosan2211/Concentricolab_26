import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const principles=[
  {num:'01',color:'#5170FF',
   es:{title:'Del núcleo hacia afuera',body:'Las mejores soluciones parten del centro: del usuario al sistema, del problema a la solución. No construimos piezas sueltas; construimos desde adentro.'},
   en:{title:'From the core outward',body:'The best solutions start from the center: from the user to the system, from the problem to the solution. We build from within.'},
  },
  {num:'02',color:'#FF6D4D',
   es:{title:'Criterio sobre velocidad',body:'Mover rápido sin pensar solo acumula deuda. El criterio es el filtro que convierte ideas en sistemas con sentido.'},
   en:{title:'Criterion over speed',body:'Moving fast without thinking only accumulates debt. Criterion is the filter that turns ideas into meaningful systems.'},
  },
  {num:'03',color:'#828AFF',
   es:{title:'Convergencia, no fragmentación',body:'Diseño, IA, datos y automatización no son silos. Cuando convergen bajo una misma lógica, los resultados se multiplican.'},
   en:{title:'Convergence, not fragmentation',body:'Design, AI, data and automation are not silos. When they converge under the same logic, results multiply.'},
  },
  {num:'04',color:'#41EAFF',
   es:{title:'Sistemas sobre piezas',body:'Una pieza gráfica genial puede impresionar. Un sistema que funciona transforma. El lab construye lo segundo.'},
   en:{title:'Systems over pieces',body:'A great graphic piece can impress. A system that works transforms. The lab builds the second.'},
  },
]

function Card({p,lang,index}){
  const c=lang==='es'?p.es:p.en
  return(
    <motion.div
      className="glass rounded-3xl p-6 md:p-7 flex flex-col gap-3.5 relative overflow-hidden group cursor-default"
      initial={{opacity:0,y:48}} whileInView={{opacity:1,y:0}}
      viewport={{once:true,margin:'-60px'}} transition={{duration:.8,ease:[.16,1,.3,1],delay:index*.1}}
      whileHover={{y:-6,transition:{duration:.28,ease:'easeOut'}}}>
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none opacity-40 group-hover:opacity-80 group-hover:scale-150 transition-all duration-500"
        style={{background:`radial-gradient(circle,${p.color}22 0%,transparent 70%)`,filter:'blur(18px)'}}/>
      <span className="font-cal text-4xl md:text-[2.75rem]" style={{color:p.color,opacity:.16}}>{p.num}</span>
      <h3 className="font-cal text-xl md:text-[22px] dark:text-white text-b-dark leading-tight">{c.title}</h3>
      <p className="dark:text-white/50 text-black/55 leading-[1.7] text-sm">{c.body}</p>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out rounded-full"
        style={{background:`linear-gradient(to right,${p.color},transparent)`}}/>
    </motion.div>
  )
}

export default function Manifiesto({lang}){
  const sec=useRef()
  const {scrollYProgress}=useScroll({target:sec,offset:['start end','end start']})
  const y=useTransform(scrollYProgress,[0,1],[55,-55])
  return(
    <section id="manifiesto" ref={sec} className="py-16 md:py-20 px-6 relative overflow-hidden dark:bg-[linear-gradient(180deg,#00031F_0%,#020425_50%,#00031F_100%)] bg-[linear-gradient(180deg,#F8F7F4_0%,#EEF1FF_50%,#F8F7F4_100%)]">
      <motion.div style={{y}} className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[660px] h-[460px] rounded-full pointer-events-none" aria-hidden="true">
        <div className="w-full h-full rounded-full" style={{background:'radial-gradient(ellipse,rgba(81,112,255,.06) 0%,transparent 70%)',filter:'blur(70px)'}}/>
      </motion.div>
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 md:gap-12">
        <div className="flex flex-col items-center text-center gap-4">
          <motion.p className="text-[12px] font-bold tracking-[.12em] uppercase dark:text-white/30 text-black/35"
            initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}>
            {lang==='es'?'En qué creemos':'What we believe'}
          </motion.p>
          <motion.h2 className="font-cal text-4xl md:text-5xl lg:text-6xl text-grad leading-tight tracking-[-0.5px]"
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
            viewport={{once:true}} transition={{duration:.8,ease:[.16,1,.3,1],delay:.1}}>
            {lang==='es'?'La filosofía del lab':'The lab\'s philosophy'}
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {principles.map((p,i)=><Card key={i} p={p} lang={lang} index={i}/>)}
        </div>
      </div>
    </section>
  )
}
