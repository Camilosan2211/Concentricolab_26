import { motion } from 'framer-motion'
const tools=[
  {name:'Figma',       src:'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg'},
  {name:'Notion',      src:'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png'},
  {name:'Illustrator', src:'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg'},
  {name:'ChatGPT',     src:'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'},
  {name:'Claude',      src:'https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg'},
  {name:'Perplexity',  src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/perplexity.svg', invert:true},
  {name:'Make',        src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/make.svg',bg:'#6D00CC'},
  {name:'n8n',         src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/n8n.svg', invert:true},
  {name:'Canva',       src:'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg'},
  {name:'Vercel',      src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vercel.svg', invert:true},
  {name:'GitHub',      src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg', invert:true},
  {name:'ElevenLabs',  src:'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/elevenlabs.svg', invert:true},
]
export default function Stack({lang}){
  return(
    <section id="stack" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        <motion.div className="text-center flex flex-col gap-3"
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}} transition={{duration:.7,ease:[.16,1,.3,1]}}>
          <p className="text-[12px] font-bold tracking-[.12em] uppercase dark:text-white/30 text-black/35">
            {lang==='es'?'Las herramientas del lab':'The lab\'s tools'}
          </p>
          <h2 className="font-cal text-3xl md:text-4xl dark:text-white text-b-dark">
            {lang==='es'?'Stack que ':'Stack that '}
            <span className="text-grad">{lang==='es'?'usamos':'we use'}</span>
          </h2>
        </motion.div>
        <motion.div className="flex flex-wrap justify-center gap-4"
          initial="hidden" whileInView="show" viewport={{once:true,margin:'-40px'}}
          variants={{hidden:{},show:{transition:{staggerChildren:.06}}}}>
          {tools.map((tool,i)=>(
            <motion.div key={i}
              className="group glass flex flex-col items-center gap-2.5 px-5 py-4 rounded-2xl border dark:border-white/6 border-black/6 cursor-default"
              variants={{hidden:{opacity:0,scale:.82},show:{opacity:1,scale:1,transition:{duration:.5,ease:[.34,1.56,.64,1]}}}}
              whileHover={{y:-6,scale:1.07,borderColor:'rgba(81,112,255,.3)',transition:{duration:.22,ease:'easeOut'}}}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{background:tool.bg||'rgba(120,120,180,.08)',padding:'7px'}}>
                <img src={tool.src} alt={tool.name} className="w-full h-full object-contain"
                  style={tool.invert?{filter:'invert(1)'}:{}} loading="lazy"/>
              </div>
              <span className="text-[12px] font-medium dark:text-white/50 text-black/50 group-hover:dark:text-white/80 group-hover:text-black/80 transition-colors duration-200">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
