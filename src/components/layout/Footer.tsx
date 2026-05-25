'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  IconBrandGithub, IconBrandLinkedin, IconBrandInstagram,
  IconMail, IconArrowUp, IconCode, IconMapPin,
} from '@tabler/icons-react'
import { NAV_LINKS, SOCIALS } from '@/data/portfolio'

const SOCIAL_LIST = [
  { icon: <IconBrandGithub size={16} />,    href: SOCIALS.github,    label: 'GitHub',    color: 'var(--txt)' },
  { icon: <IconBrandLinkedin size={16} />,  href: SOCIALS.linkedin,  label: 'LinkedIn',  color: '#0a66c2' },
  { icon: <IconBrandInstagram size={16} />, href: SOCIALS.instagram, label: 'Instagram', color: '#e4405f' },
  { icon: <IconMail size={16} />,           href: SOCIALS.email,     label: 'Email',     color: '#00d4ff' },
]

const PROFESSION_LINKS = [
  { label: 'Web Developer',   href: '#webdev',     color: 'var(--cyan)' },
  { label: 'Interior Designer', href: '#design',   color: 'var(--green)' },
  { label: 'Network Engineer',  href: '#networking', color: 'var(--blue)' },
]

export function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer
      ref={ref}
      className="relative border-t overflow-hidden"
      style={{ borderColor: 'var(--line)', background: 'var(--bg2)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(79,127,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white"
                style={{
                  background: 'linear-gradient(135deg,#4f7fff,#00d4ff)',
                  boxShadow: '0 0 20px rgba(0,212,255,0.3)',
                }}
              >
                SD
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '22px',
                  letterSpacing: '.05em',
                  color: 'var(--txt)',
                  lineHeight: 1,
                }}>
                  Saroj Devkota
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '.1em',
                  color: 'var(--txt3)',
                }}>
                  WEB · DESIGN · NETWORKS
                </div>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.7, maxWidth: '280px', marginBottom: '16px' }}>
              Multidisciplinary professional building across web development, interior design, and
              network engineering from Kathmandu, Nepal.
            </p>
            <div className="flex items-center gap-2">
              <IconMapPin size={12} style={{ color: 'var(--txt3)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--txt3)', letterSpacing: '.08em' }}>
                KATHMANDU, NEPAL
              </span>
            </div>

            {/* Profession pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {PROFESSION_LINKS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => document.querySelector(p.href)?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '.08em',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    border: `1px solid ${p.color}30`,
                    color: p.color,
                    background: `${p.color}08`,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'background .2s',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              letterSpacing: '.18em', color: 'var(--txt3)',
              textTransform: 'uppercase', marginBottom: '16px',
            }}>
              Navigation
            </div>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map(l => (
                <button
                  key={l.href}
                  onClick={() => document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontSize: '13px', color: 'var(--txt3)',
                    background: 'none', border: 'none',
                    textAlign: 'left', padding: '2px 0',
                    transition: 'color .2s', cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--txt)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--txt3)')}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              letterSpacing: '.18em', color: 'var(--txt3)',
              textTransform: 'uppercase', marginBottom: '16px',
            }}>
              Connect
            </div>
            <div className="flex flex-col gap-3">
              {SOCIAL_LIST.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      background: 'var(--bg3)',
                      border: '1px solid var(--line)',
                      color: 'var(--txt3)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.color = s.color
                      ;(e.currentTarget as HTMLDivElement).style.borderColor = `${s.color}50`
                      ;(e.currentTarget as HTMLDivElement).style.background = `${s.color}12`
                    }}
                    onMouseLeave={e => {
                      ;(e.currentTarget as HTMLDivElement).style.color = 'var(--txt3)'
                      ;(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--line)'
                      ;(e.currentTarget as HTMLDivElement).style.background = 'var(--bg3)'
                    }}
                  >
                    {s.icon}
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--txt3)', transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--txt)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--txt3)')}>
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="line-sep mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--txt3)', letterSpacing: '.06em' }}>
            © {new Date().getFullYear()} Saroj Devkota · Kathmandu, Nepal
          </div>
          <div className="flex items-center gap-1.5" style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--txt3)', letterSpacing: '.06em',
          }}>
            <IconCode size={12} />
            Built with Next.js · Framer Motion · Three.js
          </div>
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/6 text-[var(--txt3)] hover:text-white hover:border-white/12 transition-all duration-200"
          >
            <IconArrowUp size={13} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '.06em' }}>
              BACK TO TOP
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
