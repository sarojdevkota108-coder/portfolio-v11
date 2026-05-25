'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  IconBrandGithub, IconBrandLinkedin, IconBrandInstagram,
  IconMail, IconMapPin, IconSend, IconCheck,
} from '@tabler/icons-react'
import { SOCIALS } from '@/data/portfolio'

const SOCIAL_LIST = [
  { icon: <IconBrandGithub size={18} />,    label: 'GitHub',    href: SOCIALS.github,    color: 'var(--txt)' },
  { icon: <IconBrandLinkedin size={18} />,  label: 'LinkedIn',  href: SOCIALS.linkedin,  color: '#0a66c2' },
  { icon: <IconBrandInstagram size={18} />, label: 'Instagram', href: SOCIALS.instagram, color: '#e4405f' },
  { icon: <IconMail size={18} />,           label: 'Email',     href: SOCIALS.email,     color: '#00d4ff' },
]

type Status = 'idle' | 'sending' | 'done' | 'error'

export function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError]   = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Failed to send the message.')
      }

      setStatus('done')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      console.error('Contact submit error:', err)
      setStatus('error')
      setError(message)
    }
  }

  const inputClass = [
    'w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200',
    'text-white placeholder:text-[var(--txt3)]',
    'border border-white/6 bg-[var(--bg3)]',
    'focus:border-[rgba(0,212,255,0.4)] focus:ring-2 focus:ring-[rgba(0,212,255,0.08)]',
  ].join(' ')

  return (
    <section id="contact" className="section max-w-7xl mx-auto px-6 md:px-10">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="section-eyebrow justify-center">Contact</div>
          <h2 className="section-title">
            LET&apos;S BUILD<br />
            <span className="gradient-text-blue">TOGETHER.</span>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--txt2)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
            Open to collaborations, freelance work, and interesting conversations about
            web development, interior design, or network infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {/* Left info */}
          <motion.div
            className="md:col-span-2 flex flex-col gap-4"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Location */}
            <div className="card">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(0,229,153,0.08)', color: 'var(--green)' }}>
                  <IconMapPin size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--txt)', fontWeight: 500 }}>Location</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--txt3)' }}>
                    Kathmandu, Nepal
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            {SOCIAL_LIST.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card glass-hover flex items-center gap-3 no-underline group"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{ background: `${s.color}12`, color: s.color }}
                >
                  {s.icon}
                </div>
                <div className="flex flex-col">
                  <span style={{ fontSize: '14px', color: 'var(--txt)', fontWeight: 500 }}>
                    {s.label}
                  </span>
                  {s.href.includes('mailto') && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--txt3)' }}>
                      Saroj.devkota666@gmail.com
                    </span>
                  )}
                </div>
              </a>
            ))}

            {/* Response time */}
            <div className="card" style={{ borderColor: 'rgba(79,127,255,0.2)', background: 'rgba(79,127,255,0.04)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.1em', color: 'var(--blue)', marginBottom: '6px', textTransform: 'uppercase' }}>
                Response Time
              </div>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px', letterSpacing: '.04em', color: 'var(--txt)' }}>
                &lt; 24 HRS
              </div>
              <div style={{ fontSize: '12px', color: 'var(--txt3)', marginTop: '4px' }}>
                Typically respond within one business day.
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <form onSubmit={handleSubmit} className="card flex flex-col gap-4">
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                letterSpacing: '.18em', color: 'var(--txt3)',
                textTransform: 'uppercase', marginBottom: '4px',
              }}>
                Send a Message
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={inputClass}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className={inputClass}
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Subject — Web Dev / Interior Design / Networking / Other"
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                className={inputClass}
              />

              <textarea
                rows={5}
                placeholder="Your message — project idea, opportunity, question..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className={inputClass}
                required
                style={{ resize: 'none' }}
              />

              <button
                type="submit"
                disabled={status === 'sending' || status === 'done'}
                className="btn-primary self-start"
                style={{ minWidth: '160px', justifyContent: 'center' }}
              >
                {status === 'idle'    && <><IconSend size={15} /> Send Message</>}
                {status === 'sending' && <>Sending…</>}
                {status === 'done'    && <><IconCheck size={15} /> Sent!</>}
                {status === 'error'   && <>Try again</>}
              </button>

              {status === 'done' && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--green)', letterSpacing: '.06em' }}
                >
                  ✓ Message received. I&apos;ll get back to you shortly!
                </motion.p>
              )}

              {status === 'error' && error && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--red)', letterSpacing: '.06em' }}
                >
                  {error}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
