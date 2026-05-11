import { useState } from 'react'
import { motion } from 'motion/react'
import { Mail, Instagram, Linkedin, Youtube, Send } from 'lucide-react'

const EMAIL = 'concentriclabco@gmail.com'

const socialGrid = [
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/concentriclab' },
  { Icon: Linkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/company/concentriclab/' },
  { Icon: Youtube,   label: 'YouTube',   href: 'https://www.youtube.com/@ConcentricLab' },
]

export default function Connect({ lang }) {
  const [email, setEmail]         = useState('')
  const [status, setStatus]       = useState('idle')
  const [formData, setFormData]   = useState({ nombre: '', email: '', tipo: '', mensaje: '' })
  const [formStatus, setFormStatus] = useState('idle')

  const t = (es, en) => (lang === 'es' ? es : en)

  // Newsletter submit
  const submitNewsletter = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/xreoreqr', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.ok) { setStatus('ok'); setEmail('') } else throw new Error()
    } catch { setStatus('error') }
    setTimeout(() => setStatus('idle'), 4000)
  }

  // Project form submit
  const submitProject = async (e) => {
    e.preventDefault()
    setFormStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/xreoreqr', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.ok) {
        setFormStatus('ok')
        setFormData({ nombre: '', email: '', tipo: '', mensaje: '' })
      } else throw new Error()
    } catch { setFormStatus('error') }
    setTimeout(() => setFormStatus('idle'), 5000)
  }

  const inputCls = "w-full glass dark:border-white/10 border-black/8 focus:border-b-blue/50 dark:text-white text-b-dark placeholder:dark:text-white/30 placeholder:text-black/30 text-sm px-5 py-3.5 rounded-action outline-none bg-transparent transition-colors duration-200"

  return (
    <section id="connect" className="relative z-10 py-24 px-6 overflow-hidden">
      <div
        className="absolute bottom-[-80px] right-[-40px] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(255,109,77,.07) 0%,transparent 70%)', filter: 'blur(60px)' }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-4">
          <motion.p
            className="text-[12px] font-bold tracking-[0.12em] uppercase dark:text-white/30 text-black/35"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            {t('Hablemos', "Let's talk")}
          </motion.p>
          <motion.h2
            className="font-cal text-4xl md:text-5xl lg:text-6xl text-white/[0.95] leading-tight tracking-[-0.5px]"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            {t('¿Qué estás construyendo?', 'What are you building?')}<br />
            {t('Cuéntanos qué necesitas.', 'Tell us what you need.')}
          </motion.h2>
          <motion.p
            className="text-[14px] font-inter text-white/45"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {t('Escríbenos o síguenos — respondemos rápido.', 'Write to us or follow us — we respond fast.')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-stretch">

          {/* Card izquierda — Newsletter & Socials */}
          <motion.div
            className="glass rounded-card p-8 md:p-10 flex flex-col h-full min-h-[340px]"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2 text-b-blue">
                <Mail size={15} />
                <span className="text-[12px] font-bold tracking-[0.07em] uppercase text-b-blue">Newsletter</span>
              </div>
              <h3 className="font-cal text-2xl dark:text-white text-b-dark leading-snug mt-1">
                {t('Recursos gratis, directo a tu bandeja.', 'Free resources, straight to your inbox.')}
              </h3>
              <p className="dark:text-white/50 text-black/50 text-sm leading-[1.7] mt-1">
                {t(
                  'Templates, automatizaciones y recursos de diseño — todo lo que construimos, primero para ti.',
                  'Templates, automations and design resources — everything we build, first for you.'
                )}
              </p>
            </div>
            
            <form onSubmit={submitNewsletter} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('tu@email.com', 'your@email.com')}
                required
                className={inputCls}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2.5 bg-b-blue text-white font-semibold text-sm py-3.5 rounded-action glow-blue hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60"
              >
                <Send size={14} />
                {status === 'loading' ? t('Enviando…', 'Sending…')
                  : status === 'ok'   ? t('¡Listo! Te avisamos pronto. ✓', "Done! We'll be in touch. ✓")
                  : status === 'error' ? t('Intenta de nuevo', 'Try again')
                  : t('Suscribirme', 'Subscribe')}
              </button>
            </form>

            {/* Redes Movidas Aquí */}
            <div className="mt-auto pt-8">
              <div className="pt-5 border-t dark:border-white/8 border-black/6">
                <p className="text-[10px] font-bold tracking-[0.1em] uppercase dark:text-white/40 text-black/40 mb-3">
                  {t('También en', 'Also on')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {socialGrid.map(({ Icon, label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 glass rounded-full py-1.5 px-3 border dark:border-white/8 border-black/8 hover:dark:border-b-blue/30 hover:border-b-blue/25 transition-all duration-200">
                      <Icon size={12} className="text-b-blue dark:text-b-blue-lt" />
                      <span className="text-[10px] font-semibold dark:text-white/50 text-black/45">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card derecha — Formulario de proyecto */}
          <motion.div
            className="glass rounded-card p-8 md:p-10 flex flex-col h-full min-h-[340px]"
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="flex flex-col gap-1.5 mb-6">
              <span className="text-[12px] font-bold tracking-[0.07em] uppercase text-b-coral">
                {t('Contacto directo', 'Direct contact')}
              </span>
              <h3 className="font-cal text-2xl dark:text-white text-b-dark leading-snug">
                {t('¿Tienes algo en mente?', 'Got something in mind?')}
              </h3>
              <p className="dark:text-white/50 text-black/50 text-sm leading-[1.7]">
                {t(
                  'Cuéntanos sobre tu producto, marca, espacio o idea.',
                  'Tell us about your product, brand, space or idea.'
                )}
              </p>
            </div>

            {formStatus === 'ok' ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center mb-4">
                <span className="text-3xl">✓</span>
                <p className="font-cal text-xl dark:text-white text-b-dark">
                  {t('¡Mensaje recibido!', 'Message received!')}
                </p>
                <p className="dark:text-white/50 text-black/50 text-sm">
                  {t('Te respondemos pronto.', "We'll get back to you soon.")}
                </p>
              </div>
            ) : (
              <form onSubmit={submitProject} className="flex flex-col gap-3 flex-1">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData(d => ({ ...d, nombre: e.target.value }))}
                    placeholder={t('Nombre', 'Name')}
                    required
                    className={inputCls}
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(d => ({ ...d, email: e.target.value }))}
                    placeholder={t('Email', 'Email')}
                    required
                    className={inputCls}
                  />
                </div>
                
                {/* Select Rediseñado */}
                <div className="relative">
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData(d => ({ ...d, tipo: e.target.value }))}
                    required
                    className={`${inputCls} appearance-none cursor-pointer pr-10`}
                  >
                    <option value="" disabled className="dark:bg-b-dark bg-b-light">{t('¿De qué trata tu proyecto?', 'What is your project about?')}</option>
                    <option value="producto" className="dark:bg-b-dark bg-b-light">{t('Producto & Empaque', 'Product & Packaging')}</option>
                    <option value="marca" className="dark:bg-b-dark bg-b-light">{t('Identidad de Marca', 'Brand Identity')}</option>
                    <option value="experiencia" className="dark:bg-b-dark bg-b-light">{t('Experiencia Digital (UX/UI)', 'Digital Experience (UX/UI)')}</option>
                    <option value="video" className="dark:bg-b-dark bg-b-light">{t('Video & Contenido', 'Video & Content')}</option>
                    <option value="otro" className="dark:bg-b-dark bg-b-light">{t('Otro', 'Other')}</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none dark:text-white/40 text-black/40">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>

                <textarea
                  value={formData.mensaje}
                  onChange={(e) => setFormData(d => ({ ...d, mensaje: e.target.value }))}
                  rows={3}
                  placeholder={t('Cuéntanos brevemente...', 'Tell us briefly...')}
                  className={`${inputCls} resize-none`}
                />
                
                {/* Botón anclado abajo gracias al mt-auto */}
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="mt-auto inline-flex items-center justify-center gap-2.5 bg-b-blue text-white font-semibold text-sm py-3.5 rounded-action glow-blue hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60"
                >
                  <Send size={14} />
                  {formStatus === 'loading' ? t('Enviando…', 'Sending…')
                    : formStatus === 'error' ? t('Intenta de nuevo', 'Try again')
                    : t('Enviar solicitud →', 'Send request →')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}