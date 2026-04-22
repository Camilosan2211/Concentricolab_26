import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, Linkedin, Youtube, Send, Copy, Check } from 'lucide-react'

const EMAIL = 'concentriclabco@gmail.com'

const socials = [
  { Icon: Instagram, label: 'Instagram', sub:'@concentriclab',      href: 'https://www.instagram.com/concentriclab' },
  { Icon: Linkedin,  label: 'LinkedIn',  sub:'Concéntrico Lab',     href: 'https://www.linkedin.com/company/concentriclab/' },
  { Icon: Youtube,   label: 'YouTube',   sub:'@ConcentricLab',      href: 'https://www.youtube.com/@ConcentricLab' },
  { Icon: Mail,      label: 'Email',     sub: EMAIL,                 href: `mailto:${EMAIL}`, isEmail: true },
]

export default function Connect({ lang }) {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState(false)
  const t = (es, en) => lang === 'es' ? es : en

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res  = await fetch('https://formspree.io/f/xreoreqr', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.ok) { setStatus('ok'); setEmail('') }
      else throw new Error()
    } catch { setStatus('error') }
    setTimeout(() => setStatus('idle'), 4000)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section id="connect" className="py-28 px-6 relative overflow-hidden">
      {/* Blob */}
      <div className="absolute bottom-[-80px] right-[-40px] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(255,109,77,.07) 0%,transparent 70%)', filter: 'blur(60px)' }}
        aria-hidden="true" />

      <div className="max-w-[1200px] mx-auto flex flex-col gap-14">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <motion.p className="text-[12px] font-bold tracking-[.12em] uppercase dark:text-white/30 text-black/35"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {t('Hablemos', "Let's talk")}
          </motion.p>
          <motion.h2 className="font-cal text-4xl md:text-5xl lg:text-6xl dark:text-white text-b-dark leading-tight tracking-[-0.5px]"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .8, ease: [.16,1,.3,1], delay: .08 }}>
            {t('Conéctate con ', 'Connect with ')}
            <span className="text-grad">{t('el lab', 'the lab')}</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Newsletter */}
          <motion.div className="glass rounded-3xl p-8 md:p-10 flex flex-col gap-7"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .8, ease: [.16,1,.3,1] }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-b-blue">
                <Mail size={15} />
                <span className="text-[12px] font-bold tracking-[.07em] uppercase text-b-blue">Newsletter</span>
              </div>
              <h3 className="font-cal text-2xl dark:text-white text-b-dark leading-snug mt-1">
                {t('Recursos gratis, directo a tu bandeja.', 'Free resources, straight to your inbox.')}
              </h3>
              <p className="dark:text-white/45 text-black/50 text-sm leading-[1.7] mt-1">
                {t('Templates, automatizaciones y recursos de diseño — todo lo que construimos, primero para ti.',
                   'Templates, automations and design resources — everything we build, first for you.')}
              </p>
            </div>
            <form onSubmit={submit} className="flex flex-col gap-3">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder={t('tu@email.com', 'your@email.com')} required
                className="w-full glass dark:border-white/10 border-black/8 focus:border-b-blue/50 dark:text-white text-b-dark placeholder:dark:text-white/30 placeholder:text-black/30 text-sm px-5 py-3.5 rounded-2xl outline-none bg-transparent transition-colors duration-200" />
              <button type="submit" disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2.5 bg-b-blue text-white font-semibold text-sm py-3.5 rounded-2xl glow-blue hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60">
                <Send size={14} />
                {status === 'loading' ? t('Enviando…','Sending…') :
                 status === 'ok'      ? t('¡Listo! ✓','Done! ✓')  :
                 status === 'error'   ? t('Intenta de nuevo','Try again') :
                                       t('Suscribirme','Subscribe')}
              </button>
              <p className="dark:text-white/25 text-black/35 text-xs text-center">
                {t('Sin spam. Date de baja cuando quieras.', 'No spam. Unsubscribe anytime.')}
              </p>
            </form>
          </motion.div>

          {/* Contact + socials */}
          <motion.div className="glass rounded-3xl p-8 md:p-10 flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .8, ease: [.16,1,.3,1], delay: .1 }}>
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] font-bold tracking-[.07em] uppercase text-b-coral">
                {t('Contacto directo', 'Direct contact')}
              </span>
              <h3 className="font-cal text-2xl dark:text-white text-b-dark leading-snug">
                {t('¿Tienes algo en mente?', 'Got something in mind?')}
              </h3>
              <p className="dark:text-white/45 text-black/50 text-sm leading-[1.7]">
                {t('Cuéntanos de qué se trata.', "Tell us what it's about.")}
              </p>
            </div>

            {/* Email pill with copy */}
            <button onClick={copyEmail}
              className="group glass flex items-center gap-3 px-5 py-3.5 rounded-2xl border dark:border-b-blue/20 border-b-blue/15 hover:dark:border-b-blue/40 hover:border-b-blue/30 transition-all duration-200 text-left w-full"
              data-mag="true">
              <Mail size={15} className="text-b-blue flex-shrink-0" />
              <span className="text-sm font-medium dark:text-white text-b-dark flex-1 truncate">{EMAIL}</span>
              {copied
                ? <Check size={14} className="text-b-blue flex-shrink-0" />
                : <Copy size={14} className="dark:text-white/30 text-black/30 group-hover:dark:text-white/60 group-hover:text-black/60 transition-colors flex-shrink-0" />
              }
            </button>

            {/* Socials */}
            <div className="flex flex-col gap-2.5">
              {socials.filter(s => !s.isEmail).map(({ Icon, label, sub, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="group glass flex items-center gap-4 px-5 py-3 rounded-2xl border dark:border-white/6 border-black/6 hover:dark:border-b-blue/25 hover:border-b-blue/20 hover:dark:bg-b-blue/5 hover:bg-b-blue/4 transition-all duration-200">
                  <Icon size={15} className="dark:text-white/40 text-black/40 group-hover:text-b-blue transition-colors duration-200" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="dark:text-white/70 text-black/70 group-hover:dark:text-white group-hover:text-black text-sm font-medium transition-colors duration-200">{label}</span>
                    <span className="dark:text-white/30 text-black/35 text-[11px] truncate">{sub}</span>
                  </div>
                  <span className="dark:text-white/20 text-black/25 group-hover:text-b-blue/60 text-xs transition-colors duration-200">→</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
