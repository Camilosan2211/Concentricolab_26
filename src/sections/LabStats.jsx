import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
const stats=[
  {num:'+40h',color:'#5170FF',es:'Ahorradas por automatización en un proyecto típico',en:'Saved through automation in a typical project'},
  {num:'6+',  color:'#FF6D4D',es:'Disciplinas que convergen en cada entrega',        en:'Disciplines converging in every delivery'},
  {num:'3x',  color:'#41EAFF',es:'Más rápido que un flujo de trabajo tradicional',   en:'Faster than a traditional workflow'},
]
export default function LabStats({lang}){
  const ref=useRef(); const inView=useInView(ref,{once:true,margin:'-60px'})
  return(
    <section className="py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div ref={ref}
          className="glass rounded-3xl p-6 md:p-9 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0 divide-y md:divide-y-0 md:divide-x dark:divide-white/6 divide-black/6 relative overflow-hidden"
          initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.9,ease:[.16,1,.3,1]}}>
          <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(81,112,255,.05) 0%,transparent 70%)'}}/>
          {stats.map((s,i)=>(
            <motion.div key={i} className="flex flex-col items-center text-center gap-2 px-4 py-4 md:py-1"
              initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}}
              transition={{delay:i*.18,duration:.8,ease:[.16,1,.3,1]}}>
              <motion.span className="font-cal text-4xl md:text-5xl font-bold"
                style={{color:s.color,textShadow:`0 0 28px ${s.color}45`}}
                initial={{scale:.8,opacity:0}} animate={inView?{scale:1,opacity:1}:{}}
                transition={{delay:.3+i*.18,type:'spring',stiffness:120}}>
                {s.num}
              </motion.span>
              <p className="dark:text-white/45 text-black/50 text-[13px] leading-[1.6] max-w-[170px]">
                {lang==='es'?s.es:s.en}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
