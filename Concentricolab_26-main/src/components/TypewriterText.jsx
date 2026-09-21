import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FULL_TEXT = {
  es: 'Construimos desde el núcleo hacia afuera — de la forma al sistema, del objeto a la pantalla.',
  en: 'We build from the core outward — from form to system, from object to screen.',
}

const ACCENT_WORDS_ES = ['núcleo', 'forma', 'sistema', 'pantalla']
const ACCENT_WORDS_EN = ['core', 'form', 'system', 'screen']

export default function TypewriterText({ lang = 'es', onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const fullText = FULL_TEXT[lang] ?? FULL_TEXT.es
  const accentWords = lang === 'es' ? ACCENT_WORDS_ES : ACCENT_WORDS_EN

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true)
    }
  }, [isInView])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= fullText.length) {
      setDone(true)
      onComplete?.()
      return
    }
    const timeout = setTimeout(() => {
      setDisplayed(fullText.slice(0, displayed.length + 1))
    }, 28)
    return () => clearTimeout(timeout)
  }, [started, displayed, fullText])

  function renderAccented(text) {
    const words = text.split(/(\s+)/)
    return words.map((word, i) => {
      const clean = word.replace(/[^a-záéíóúñüa-z]/gi, '').toLowerCase()
      const isAccent = accentWords.some(w => clean === w.toLowerCase())
      return (
        <span
          key={i}
          style={isAccent ? { color: '#FF6B35', fontWeight: 700 } : {}}
        >
          {word}
        </span>
      )
    })
  }

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
          fontWeight: 500,
          lineHeight: 1.65,
          letterSpacing: '-0.01em',
          color: 'rgba(255,255,255,0.88)',
          maxWidth: '680px',
          minHeight: '4em',
        }}
      >
        {renderAccented(displayed)}
        {!done && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1.1em',
              background: '#4A9EFF',
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
              borderRadius: '1px',
              boxShadow: '0 0 8px rgba(74,158,255,0.8)',
            }}
          />
        )}
      </p>
    </div>
  )
}
