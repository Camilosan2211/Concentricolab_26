import { motion, AnimatePresence } from 'framer-motion'

const tags = {
  es: ['Diseño de producto', 'Experiencia digital', 'Branding', 'Sistemas visuales', 'Video · contenido', 'Automatización · IA'],
  en: ['Product design', 'Digital experience', 'Branding', 'Visual systems', 'Video · content', 'Automation · AI'],
}

export default function TagsRow({ lang = 'es', visible = false }) {
  const list = tags[lang] ?? tags.es

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <AnimatePresence>
        {visible && list.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 16, scale: 0.82, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.45,
              delay: i * 0.08,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            style={{
              background: 'rgba(13,14,26,0.55)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(74,158,255,0.18)',
              borderRadius: '999px',
              padding: '7px 16px',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: 'rgba(200,220,255,0.82)',
              whiteSpace: 'nowrap',
              boxShadow: '0 0 12px rgba(74,158,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {tag}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
