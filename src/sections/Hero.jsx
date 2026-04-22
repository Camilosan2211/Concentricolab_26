import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import gsap from 'gsap'

const container = {
  hidden:{},
  show:{ transition:{ staggerChildren:.11, delayChildren:.35 } }
}
const item = {
  hidden:{ opacity:0, y:32 },
  show:  { opacity:1, y:0, transition:{ duration:.85, ease:[.16,1,.3,1] } }
}

/* Tiny circle avatars (coloured initials placeholders) */
const avatars = [
  { bg:'#5170FF', label:'A' },
  { bg:'#FF6D4D', label:'B' },
  { bg:'#828AFF', label:'C' },
  { bg:'#41EAFF', label:'D', dark: true },
]

export default function Hero({ lang }) {
  const blob1 = useRef(); const blob2 = useRef(); const blob3 = useRef()
  const t = (es,en) => lang==='es'?es:en

  useEffect(()=>{
    if (!window.matchMedia('(pointer:fine)').matches) return
    const factors = [{x:55,y:35},{x:-40,y:-25},{x:28,y:40}]
    const refs    = [blob1,blob2,blob3]
    const onMove  = e=>{
      const cx=e.clientX/window.innerWidth-.5
      const cy=e.clientY/window.innerHeight-.5
      refs.forEach((r,i)=>{
        if(!r.current) return
        gsap.to(r.current,{x:cx*factors[i].x,y:cy*factors[i].y,duration:1.3,ease:'power2.out'})
      })
    }
    window.addEventListener('mousemove',onMove,{passive:true})
    return ()=>window.removeEventListener('mousemove',onMove)
  },[])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-36 pb-24">

      {/* Parallax blobs */}
      <div ref={blob1} className="absolute top-[-8%] left-[-6%] w-[480px] h-[480px] rounded-full pointer-events-none will-change-transform"
        style={{background:'radial-gradient(circle,rgba(81,112,255,.13) 0%,transparent 70%)',filter:'blur(55px)'}} aria-hidden="true"/>
      <div ref={blob2} className="absolute bottom-[-4%] right-[-5%] w-[380px] h-[380px] rounded-full pointer-events-none will-change-transform"
        style={{background:'radial-gradient(circle,rgba(255,109,77,.11) 0%,transparent 70%)',filter:'blur(55px)'}} aria-hidden="true"/>
      <div ref={blob3} className="absolute top-[40%] left-[50%] w-[260px] h-[260px] rounded-full pointer-events-none will-change-transform"
        style={{background:'radial-gradient(circle,rgba(65,234,255,.08) 0%,transparent 70%)',filter:'blur(45px)'}} aria-hidden="true"/>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-7 px-6 max-w-5xl mx-auto"
        variants={container} initial="hidden" animate="show">

        {/* Badge */}
        <motion.div variants={item}>
          <span className="glass-blue inline-flex items-center gap-2 text-[11px] font-bold tracking-[.1em] uppercase text-b-blue-lt px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-b-coral animate-pulse"/>
            {t('Laboratorio digital · Bogotá','Digital Lab · Bogotá')}
          </span>
        </motion.div>

        {/* Social proof avatars */}
        <motion.div variants={item} className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {avatars.map((av,i)=>(
              <div key={i} className="w-8 h-8 rounded-full border-2 dark:border-b-dark border-b-light flex items-center justify-center text-[10px] font-bold"
                style={{background:av.bg, color: av.dark?'#00031F':'#fff', zIndex:avatars.length-i}}>
                {av.label}
              </div>
            ))}
          </div>
          <p className="text-[12px] dark:text-white/40 text-black/40 font-medium">
            {t('Founders y builders en LATAM','Founders & builders across LATAM')}
          </p>
        </motion.div>

        {/* Heading — 3 lines */}
        <motion.h1 variants={item}
          className="font-cal text-5xl sm:text-6xl md:text-7xl xl:text-[84px] leading-[1.06] tracking-[-2px] dark:text-white text-b-dark">
          {/* Line 1 */}
          <span>{t('Diseño que ','Design that ')}</span>
          <span className="brand-cycle">{t('piensa,','thinks,')}</span>
          <br/>
          {/* Line 2 */}
          <span className="brand-cycle">{t('sistemas','systems')}</span>
          <span className="text-grad"> {t('que funcionan,','that work,')}</span>
          <br/>
          {/* Line 3 */}
          <span>{t('experiencias ','experiences ')}</span>
          <span className="brand-cycle">{t('que conectan.','that connect.')}</span>
        </motion.h1>

        {/* Sub */}
        <motion.p variants={item} className="dark:text-white/50 text-black/55 text-base md:text-lg max-w-[520px] leading-[1.75]">
          {t(
            'Diseño, branding, IA y automatización — convergiendo en sistemas y experiencias construidos desde el núcleo.',
            'Design, branding, AI and automation — converging into systems and experiences built from the core.'
          )}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-4 justify-center">
          <a href="#enfoque"
            className="group relative inline-flex items-center gap-2.5 glass dark:text-white text-black text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(81,112,255,.22)]">
            <span className="w-1.5 h-1.5 rounded-full bg-b-coral"/>
            {t('Conoce el enfoque','Learn the approach')}
            <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform duration-300"/>
          </a>
          <a href="#productos"
            className="inline-flex items-center gap-2.5 bg-b-blue text-white text-sm font-semibold px-7 py-3.5 rounded-full glow-blue hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(81,112,255,.5)] transition-all duration-300">
            {t('Ver productos ahora','See products now')}
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div variants={item}
          className="flex items-center gap-2 dark:text-white/25 text-black/30 text-xs font-medium mt-4"
          animate={{y:[0,6,0]}} transition={{duration:2.4,repeat:Infinity,ease:'easeInOut'}}>
          <ArrowDown size={13}/>
          {t('Scroll para explorar','Scroll to explore')}
        </motion.div>
      </motion.div>
    </section>
  )
}
