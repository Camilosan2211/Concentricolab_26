import { motion } from 'framer-motion'

const tools = [
  { name: 'Figma', src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg' },
  { name: 'Notion', src: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' },
  { name: 'Illustrator', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg' },
  { name: 'ChatGPT', src: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
  { name: 'Claude', src: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg' },
  {
    name: 'Perplexity',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/perplexity.svg',
    bg: '#ffffff',
    pad: 6,
  },
  { name: 'Make', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/make.svg', bg: '#6D00CC', pad: 7 },
  {
    name: 'n8n',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/n8n.svg',
    bg: '#EA4B71',
    pad: 6,
  },
  {
    name: 'Canva',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/canva.svg',
    bg: '#00C4CC',
    pad: 6,
  },
  {
    name: 'Framer',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/framer.svg',
    bg: '#0055FF',
    pad: 6,
  },
  {
    name: 'Vercel',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vercel.svg',
    bg: '#ffffff',
    invertIcon: true,
    pad: 7,
  },
  {
    name: 'GitHub',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg',
    bg: '#ffffff',
    invertIcon: true,
    pad: 6,
  },
  {
    name: 'ElevenLabs',
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/elevenlabs.svg',
    bg: '#000000',
    pad: 6,
  },
]

export default function Stack({ lang }) {
  return (
    <section id="stack" className="relative z-10 py-24 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        <motion.div
          className="text-center flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[12px] font-bold tracking-[0.12em] uppercase dark:text-white/30 text-black/35">
            {lang === 'es' ? 'Las herramientas del lab' : "The lab's tools"}
          </p>
          <h2 className="font-cal text-3xl md:text-4xl dark:text-white text-b-dark">
            {lang === 'es' ? 'Stack que ' : 'Stack that '}
            <span className="text-grad">{lang === 'es' ? 'usamos' : 'we use'}</span>
          </h2>
        </motion.div>
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              className="group glass flex flex-col items-center gap-2.5 px-5 py-4 rounded-2xl border dark:border-white/6 border-black/6 cursor-default"
              variants={{
                hidden: { opacity: 0, scale: 0.82 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
              }}
              whileHover={{
                y: -6,
                scale: 1.07,
                borderColor: 'rgba(77,102,255,.3)',
                transition: { duration: 0.22, ease: 'easeOut' },
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
                style={{
                  background: tool.bg || 'rgba(120,120,180,.08)',
                  padding: `${tool.pad ?? 7}px`,
                }}
              >
                <img
                  src={tool.src}
                  alt={tool.name}
                  className="w-full h-full object-contain"
                  style={tool.invertIcon ? { filter: 'invert(1)' } : undefined}
                  loading="lazy"
                />
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
