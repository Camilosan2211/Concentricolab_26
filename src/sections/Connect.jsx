import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, Linkedin, Youtube, Send, Copy, Check } from 'lucide-react'

const EMAIL = 'concentriclabco@gmail.com'

const socialGrid = [
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/concentriclab' },
  { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/concentriclab/' },
  { Icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@ConcentricLab' },
]

export default function Connect({ lang }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState(false)
  const t = (es, en) => (lang === 'es' ? es : en)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/xreoreqr', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus('ok')
        setEmail('')
      } else throw new Error()
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 4000)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section id="connect" className="relative z-10 py-24 px-6 overflow-hidden">
      <div
        className="absolute bottom-[-80px] right-[-40px] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle,rgba(255,109,77,.07) 0%,transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-4">
          <motion.p
            className="text-[12px] font-bold tracking-[0.12em] uppercase dark:text-white/30 text-black/35"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('Hablemos', "Let's talk")}
          </motion.p>
          <motion.h2
            className="font-cal text-4xl md:text-5xl lg:text-6xl dark:text-white text-b-dark leading-tight tracking-[-0.5px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            {t('Conéctate con ', 'Connect with ')}
            <span className="text-grad">{t('el lab', 'the lab')}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-stretch">
          <motion.div
            className="glass rounded-3xl p-8 md:p-10 flex flex-col gap-6 h-full min-h-[340px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-b-blue">
                <Mail size={15} />
                <span className="text-[12px] font-bold tracking-[0.07em] uppercase text-b-blue">Newsletter</span>
              </div>
              <h3 className="font-cal text-2xl dark:text-white text-b-dark leading-snug mt-1">
                {t('Recursos gratis, directo a tu bandeja.', 'Free resources, straight to your inbox.')}
              </h3>
              <p className="dark:text-white/45 text-black/50 text-sm leading-[1.7] mt-1">
                {t(
                  'Templates, automatizaciones y recursos de diseño — todo lo que construimos, primero para ti.',
                  'Templates, automations and design resources — everything we build, first for you.'
                )}
              </p>
            </div>
            <form onSubmit={submit} className="flex flex-col gap-3 mt-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('tu@email.com', 'your@email.com')}
                required
                className="w-full glass dark:border-white/10 border-black/8 focus:border-b-blue/50 dark:text-white text-b-dark placeholder:dark:text-white/30 placeholder:text-black/30 text-sm px-5 py-3.5 rounded-2xl outline-none bg-transparent transition-colors duration-200"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2.5 bg-b-blue text-white font-semibold text-sm py-3.5 rounded-2xl glow-blue hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60"
              >
                <Send size={14} />
                {status === 'loading'
                  ? t('Enviando…', 'Sending…')
                  : status === 'ok'
                    ? t('¡Listo! ✓', 'Done! ✓')
                    : status === 'error'
                      ? t('Intenta de nuevo', 'Try again')
                      : t('Suscribirme', 'Subscribe')}
              </button>
              <p className="dark:text-white/25 text-black/35 text-xs text-center">
                {t('Sin spam. Date de baja cuando quieras.', 'No spam. Unsubscribe anytime.')}
              </p>
            </form>
          </motion.div>

          <motion.div
            className="glass rounded-3xl p-8 md:p-10 flex flex-col gap-6 h-full min-h-[340px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] font-bold tracking-[0.07em] uppercase text-b-coral">
                {t('Contacto directo', 'Direct contact')}
              </span>
              <h3 className="font-cal text-2xl dark:text-white text-b-dark leading-snug">
                {t('¿Tienes algo en mente?', 'Got something in mind?')}
              </h3>
              <p className="dark:text-white/45 text-black/50 text-sm leading-[1.7]">
                {t('Cuéntanos de qué se trata.', "Tell us what it's about.")}
              </p>
            </div>

            <button
              onClick={copyEmail}
              className="group glass flex items-center gap-3 px-5 py-3.5 rounded-2xl border dark:border-b-blue/20 border-b-blue/15 hover:dark:border-b-blue/40 hover:border-b-blue/30 transition-all duration-200 text-left w-full"
              data-mag="true"
            >
              <Mail size={15} className="text-b-blue flex-shrink-0" />
              <span className="text-sm font-medium dark:text-white text-b-dark flex-1 truncate">{EMAIL}</span>
              {copied ? (
                <Check size={14} className="text-b-blue flex-shrink-0" />
              ) : (
                <Copy
                  size={14}
                  className="dark:text-white/30 text-black/30 group-hover:dark:text-white/60 group-hover:text-black/60 transition-colors flex-shrink-0"
                />
              )}
            </button>

            <div className="mt-auto">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase dark:text-white/28 text-black/35 mb-3">
                {t('Redes', 'Social')}
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {socialGrid.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 glass rounded-2xl py-3 px-2 border dark:border-white/8 border-black/8 hover:dark:border-b-blue/30 hover:border-b-blue/25 hover:dark:bg-b-blue/6 hover:bg-b-blue/5 transition-all duration-200"
                  >
                    <Icon size={18} className="text-b-blue dark:text-b-blue-lt opacity-90" />
                    <span className="text-[10px] font-semibold dark:text-white/55 text-black/50 text-center leading-tight">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
