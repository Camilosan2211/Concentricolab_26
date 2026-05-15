import { motion } from 'framer-motion'

const lines = {
  es: [
    'Construimos desde el núcleo hacia afuera —',
    'de la forma al sistema,',
    'del objeto a la pantalla.',
  ],
  en: [
    'We build from the core outward —',
    'from form to system,',
    'from object to screen.',
  ],
}

const lineVariants = {
  hidden: {
    clipPath: 'inset(0 100% 0 0)',
    opacity: 0,
  },
  visible: (i) => ({
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: {
      clipPath: {
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1],
        delay: i * 0.18,
      },
      opacity: {
        duration: 0.01,
        delay: i * 0.18,
      },
    },
  }),
}

export default function LiquidText({ lang = 'es' }) {
  const text = lines[lang] ?? lines.es

  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      {text.map((line, i) => (
        <motion.p
          key={i}
          custom={i}
          variants={lineVariants}
          className="font-semibold"
          style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
            lineHeight: 1.4,
            color: i === text.length - 1
              ? '#FF6B35'
              : 'rgba(255,255,255,0.90)',
            letterSpacing: '-0.02em',
            willChange: 'clip-path',
          }}
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  )
}
