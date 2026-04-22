import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
export default function ScrollToTop() {
  const [v, setV] = useState(false)
  useEffect(()=>{
    const fn=()=>setV(window.scrollY>600)
    window.addEventListener('scroll',fn,{passive:true})
    return ()=>window.removeEventListener('scroll',fn)
  },[])
  return(
    <AnimatePresence>
      {v&&(
        <motion.button
          onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
          className="fixed bottom-7 right-7 z-50 w-11 h-11 rounded-full glass-blue border border-b-blue/25 flex items-center justify-center text-b-blue hover:bg-b-blue hover:text-white hover:-translate-y-1 transition-all duration-200"
          initial={{opacity:0,scale:.7}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.7}}
          transition={{type:'spring',stiffness:220,damping:18}}
          aria-label="Volver arriba">
          <ArrowUp size={16}/>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
