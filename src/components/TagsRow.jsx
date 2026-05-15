import { motion } from 'framer-motion'

const tags = {
  es: ['Diseño de producto', 'Experiencia digital', 'Branding', 'Sistemas visuales', 'Video · contenido', 'Automatización · IA'],
  en: ['Product design', 'Digital experience', 'Branding', 'Visual systems', 'Video · content', 'Automation · AI'],
}

const tagVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.55 + i * 0.07,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
}

export default function TagsRow({ lang = 'es' }) {
  const list = tags[lang] ?? tags.es

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {list.map((tag, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={tagVariants}
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(13,14,26,0.55)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.10)',
            color: 'rgba(255,255,255,0.75)',
            whiteSpace: 'nowrap',
          }}
        >
          {tag}
        </motion.span>
      ))}
    </motion.div>
  )
}
