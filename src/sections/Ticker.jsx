import { motion } from 'framer-motion'
const tags=['Diseño UX/UI','IA Generativa','Branding','Métricas','Automatización','Diseño Industrial','Plantillas Notion','Sistemas digitales','Make · n8n','Consultoría CX','Design Systems','Creative Coding']
export default function Ticker() {
  const d=[...tags,...tags]
  return (
    <div className="relative overflow-hidden py-5 border-y dark:border-white/5 border-black/6">
      <div className="absolute left-0 top-0 w-24 h-full z-10 pointer-events-none dark:[background:linear-gradient(to_right,#00031F,transparent)] [background:linear-gradient(to_right,#F8F7F4,transparent)]"/>
      <div className="absolute right-0 top-0 w-24 h-full z-10 pointer-events-none dark:[background:linear-gradient(to_left,#00031F,transparent)] [background:linear-gradient(to_left,#F8F7F4,transparent)]"/>
      <motion.div className="flex gap-3 w-max" animate={{x:['0%','-50%']}} transition={{duration:32,ease:'linear',repeat:Infinity}}>
        {d.map((tag,i)=>(
          <span key={i} className="inline-flex items-center gap-2 glass-blue text-b-blue-lt text-[12px] font-semibold px-4 py-1.5 rounded-full whitespace-nowrap border border-b-blue/20 select-none">
            <span className="w-1 h-1 rounded-full bg-b-blue opacity-60"/>{tag}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
