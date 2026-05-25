'use client'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Image from 'next/image'
import {
  IconBrandGithub, IconBrandLinkedin,
  IconCode, IconNetwork, IconBuildingSkyscraper,
} from '@tabler/icons-react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { METRICS as STATIC_METRICS, SOCIALS as STATIC_SOCIALS } from '@/data/portfolio'

const ROLES = [
  { label: 'Full-Stack Developer', color: '#00d4ff', icon: IconCode },
  { label: 'Interior Designer',    color: '#00e599', icon: IconBuildingSkyscraper },
  { label: 'Network Engineer',     color: '#4f7fff', icon: IconNetwork },
]

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef   = useRef<HTMLDivElement>(null)
  const { ref: metricsRef, inView: metricsInView } = useInView({ triggerOnce: true })
  const [activeRole, setActiveRole] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile once on mount
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollY } = useScroll()
  // On mobile: NO parallax shift (y=0) and NO opacity fade — prevents blur & disappearing photo
  const photoY       = useTransform(scrollY, [0, 600], isMobile ? [0, 0] : [0, 60])
  const photoOpacity = useTransform(scrollY, [0, 1000], isMobile ? [1, 1] : [1, 0.3])

  // Cycle active role
  useEffect(() => {
    const id = setInterval(() => setActiveRole(r => (r + 1) % ROLES.length), 3000)
    return () => clearInterval(id)
  }, [])

  // Particle canvas — skip on mobile to save battery
  useEffect(() => {
    if (isMobile) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1400, y: Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.2 + 0.3,
    }))

    let mouse = { x: -999, y: -999 }
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const d  = Math.hypot(dx, dy)
        if (d < 100) { p.vx += dx / d * 0.04; p.vy += dy / d * 0.04 }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,212,255,0.35)'; ctx.fill()
      })
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d < 90) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(79,127,255,${(1 - d / 90) * 0.06})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove) }
  }, [isMobile])

  const fade = (delay: number) => ({
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay } },
  })

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
      style={{ paddingTop: '90px' }}
    >
      {/* Canvas bg — desktop only */}
      {!isMobile && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.55, pointerEvents: 'none' }} />
      )}

      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '-5%', right: '25%', width: '600px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(79,127,255,0.07) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '400px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(0,229,153,0.05) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', top: '30%', right: '5%', width: '300px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 65%)' }} />
      </div>

      {/* Grid bg */}
      <div className="absolute inset-0 bg-grid opacity-100"
        style={{ maskImage: 'radial-gradient(ellipse 90% 70% at 40% 50%, black 20%, transparent 80%)' }} />

      {/* ── MAIN LAYOUT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full
                      grid md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-90px)]">

        {/* ─── LEFT COLUMN ─── */}
        <div className="flex flex-col justify-center py-12 md:py-0">

          {/* Tagline pill */}
          <motion.div variants={fade(0.15)} initial="hidden" animate="show"
            className="inline-flex items-center gap-2 mb-8 self-start"
            style={{
              padding: '6px 14px', borderRadius: '999px',
              background: 'rgba(79,127,255,0.07)',
              border: '1px solid rgba(79,127,255,0.2)',
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              color: 'var(--blue)', letterSpacing: '.06em',
            }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e599',
              boxShadow: '0 0 6px #00e599', display: 'inline-block' }} />
            I design spaces, build websites, and engineer networks.
          </motion.div>

          {/* Name */}
          <motion.div variants={fade(0.25)} initial="hidden" animate="show">
            <h1 style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(64px, 10vw, 140px)',
              lineHeight: 0.88, letterSpacing: '.02em',
              color: 'var(--txt)', marginBottom: '6px',
            }}>
              SAROJ
            </h1>
            <h1 style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(64px, 10vw, 140px)',
              lineHeight: 0.88, letterSpacing: '.02em',
              color: 'transparent',
              WebkitTextStroke: '1.5px var(--cyan)',
              marginBottom: '28px',
              position: 'relative', display: 'inline-block',
            }}>
              DEVKOTA
              {/* Glow duplicate — aria-hidden so screen readers skip it */}
              <span aria-hidden="true" style={{
                position: 'absolute', inset: 0,
                color: 'var(--cyan)', opacity: 0.1,
                filter: 'blur(12px)', WebkitTextStroke: '0',
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(64px, 10vw, 140px)',
              }}>DEVKOTA</span>
            </h1>
          </motion.div>

          {/* Role pills */}
          <motion.div variants={fade(0.38)} initial="hidden" animate="show"
            className="flex flex-wrap gap-2 mb-7">
            {ROLES.map((r, i) => {
              const Icon = r.icon
              const isActive = i === activeRole
              return (
                <motion.span key={i}
                  animate={{
                    background: isActive ? `${r.color}18` : 'rgba(255,255,255,0.03)',
                    borderColor: isActive ? `${r.color}55` : 'rgba(255,255,255,0.08)',
                    color: isActive ? r.color : 'var(--txt3)',
                    scale: isActive ? 1.04 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '7px 14px', borderRadius: '999px',
                    border: '1px solid', cursor: 'default',
                    fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '.07em',
                    textTransform: 'uppercase',
                  }}>
                  <Icon size={12} /> {r.label}
                </motion.span>
              )
            })}
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={fade(0.48)} initial="hidden" animate="show"
            className="mb-8"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(12px,1.6vw,16px)',
              color: 'var(--cyan)', letterSpacing: '.04em' }}>
            {'> '}
            <TypeAnimation
              sequence={[
                'Building full-stack web applications',  2200,
                'Designing beautiful living spaces',      2200,
                'Architecting enterprise networks',       2200,
                'Training communities in cybersecurity',  2200,
                'Creating compound value across domains', 2200,
              ]}
              speed={58} deletionSpeed={72} repeat={Infinity}
            />
            <span style={{ opacity: 0.4 }}>_</span>
          </motion.div>

          {/* Bio */}
          <motion.p variants={fade(0.58)} initial="hidden" animate="show"
            className="mb-10"
            style={{ maxWidth: '480px', color: 'var(--txt2)', fontSize: '15px', lineHeight: 1.85 }}>
            Three disciplines. One mind. I write code, plan spaces, and build networks,
            while each craft sharpens the others.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fade(0.68)} initial="hidden" animate="show"
            className="flex flex-wrap gap-3 mb-12">
            <button className="btn-primary"
              onClick={() => document.getElementById('webdev')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Work
            </button>
            <button className="btn-ghost"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Get In Touch
            </button>
            <a href={STATIC_SOCIALS.github} target="_blank" rel="noopener noreferrer" className="btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <IconBrandGithub size={15} /> GitHub
            </a>
            <a href={STATIC_SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <IconBrandLinkedin size={15} /> LinkedIn
            </a>
          </motion.div>

          {/* Metrics bar */}
          <motion.div ref={metricsRef} variants={fade(0.8)} initial="hidden" animate="show"
            className="grid grid-cols-4 rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.06)', maxWidth: '520px' }}>
            {STATIC_METRICS.map((m, i) => (
              <div key={i} style={{
                padding: '16px 14px',
                borderRight: i < STATIC_METRICS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                background: 'rgba(255,255,255,0.02)',
                textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '36px', lineHeight: 1,
                  color: 'var(--txt)', letterSpacing: '.02em', marginBottom: '3px' }}>
                  {metricsInView
                    ? <CountUp end={parseInt(m.num)} duration={2} suffix={m.suffix} useEasing />
                    : `0${m.suffix}`}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px',
                  letterSpacing: '.12em', color: 'var(--txt3)', textTransform: 'uppercase' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── RIGHT COLUMN — PHOTO ─── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative flex items-center justify-center"
          style={{ minHeight: isMobile ? '380px' : '600px' }}
        >
          {/* Decorative rings — hidden on mobile to reduce paint cost */}
          {!isMobile && (
            <>
              <div style={{
                position: 'absolute', inset: '-20px',
                borderRadius: '40% 60% 55% 45% / 45% 50% 50% 55%',
                border: '1px solid rgba(0,212,255,0.08)',
                animation: 'morphRing 12s ease-in-out infinite',
              }} />
              <div style={{
                position: 'absolute', inset: '-40px',
                borderRadius: '55% 45% 40% 60% / 50% 45% 55% 50%',
                border: '1px solid rgba(79,127,255,0.06)',
                animation: 'morphRing2 16s ease-in-out infinite',
              }} />
            </>
          )}

          {/* Glow behind photo */}
          <div style={{
            position: 'absolute', inset: '10%',
            background: 'radial-gradient(ellipse, rgba(79,127,255,0.12) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }} />

          {/* Three domain orbs */}
          {[
            { label: 'Code',    color: '#00d4ff', top: '8%',  right: '5%',  delay: 0 },
            { label: 'Design',  color: '#00e599', bottom: '20%', right: '-2%', delay: 0.5 },
            { label: 'Network', color: '#4f7fff', top: '40%',  left: '-5%', delay: 1 },
          ].map((orb, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + orb.delay, duration: 0.5, type: 'spring' }}
              style={{
                position: 'absolute', top: orb.top, right: orb.right,
                bottom: orb.bottom, left: orb.left,
                padding: '8px 14px', borderRadius: '999px',
                background: `${orb.color}14`,
                border: `1px solid ${orb.color}40`,
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                color: orb.color, letterSpacing: '.08em',
                backdropFilter: 'blur(8px)',
                animation: `float${i} ${3 + i}s ease-in-out infinite`,
                zIndex: 10,
              } as React.CSSProperties}>
              {orb.label}
            </motion.div>
          ))}

          {/* ── THE PHOTO ──
              FIX: On mobile, remove will-change:transform (set by Framer's y transform)
              which forces GPU compositing and causes blur during scroll.
              We achieve this by wrapping in a plain div on mobile instead of motion.div.
          */}
          {isMobile ? (
            /* Mobile: static wrapper — no transform, no will-change, crisp at all times */
            <div
              style={{
                position: 'relative',
                zIndex: 5,
                borderRadius: '24px',
                overflow: 'hidden',
                width: 'min(300px, 78vw)',
                height: 'min(424px, calc(78vw * 1.41))',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
                // Force subpixel rendering — prevents JPEG blur on high-DPI screens
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <Image
                src="/images/saroj.jpeg"
                alt="Saroj Devkota"
                fill
                priority
                quality={95}
                sizes="(max-width: 768px) 78vw, 340px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  // Disable image-rendering smoothing that causes blur on mobile
                  imageRendering: 'auto',
                }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                background: 'linear-gradient(to top, rgba(6,11,20,0.8) 0%, transparent 100%)',
              }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  color: 'rgba(255,255,255,0.5)', letterSpacing: '.1em', marginBottom: '4px',
                }}>
                  INTERIOR DESIGNER • NETWORK ENGINEER
                </div>
                <div style={{
                  fontFamily: 'var(--font-bebas)', fontSize: '22px',
                  color: 'var(--txt)', letterSpacing: '.05em',
                }}>
                  SAROJ DEVKOTA
                </div>
              </div>
            </div>
          ) : (
            /* Desktop: parallax wrapper */
            <motion.div
              className="relative z-[5]"
              style={{
                y: photoY,
                opacity: photoOpacity,
                position: 'relative',
                zIndex: 5,
                borderRadius: '24px',
                overflow: 'hidden',
                width: 'min(340px, 78vw)',
                height: 'min(480px, calc(78vw * 1.41))',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
              }}
            >
              <Image
                src="/images/saroj.jpeg"
                alt="Saroj Devkota"
                fill
                priority
                quality={95}
                sizes="(max-width: 768px) 78vw, 340px"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                background: 'linear-gradient(to top, rgba(6,11,20,0.8) 0%, transparent 100%)',
              }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  color: 'rgba(255,255,255,0.5)', letterSpacing: '.1em', marginBottom: '4px',
                }}>
                  INTERIOR DESIGNER • NETWORK ENGINEER
                </div>
                <div style={{
                  fontFamily: 'var(--font-bebas)', fontSize: '22px',
                  color: 'var(--txt)', letterSpacing: '.05em',
                }}>
                  SAROJ DEVKOTA
                </div>
              </div>
            </motion.div>
          )}

          {/* Corner lines */}
          {[
            { top: '5%', right: '5%', borderTop: '2px solid rgba(0,212,255,0.3)', borderRight: '2px solid rgba(0,212,255,0.3)' },
            { bottom: '5%', left: '5%', borderBottom: '2px solid rgba(0,212,255,0.3)', borderLeft: '2px solid rgba(0,212,255,0.3)' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: '30px', height: '30px', ...s }} />
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px',
          letterSpacing: '.18em', color: 'var(--txt3)' }}>SCROLL</span>
        <div style={{ width: '1px', height: '40px', background: 'var(--line)', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
            background: 'linear-gradient(to bottom, var(--cyan), transparent)',
            animation: 'scrollHint 1.6s ease-in-out infinite',
          }} />
        </div>
      </motion.div>

      <style>{`
        @keyframes scrollHint {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(220%); }
        }
        @keyframes morphRing {
          0%, 100% { border-radius: 40% 60% 55% 45% / 45% 50% 50% 55%; }
          33%  { border-radius: 55% 45% 60% 40% / 55% 40% 60% 45%; }
          66%  { border-radius: 45% 55% 40% 60% / 40% 55% 45% 60%; }
        }
        @keyframes morphRing2 {
          0%, 100% { border-radius: 55% 45% 40% 60% / 50% 45% 55% 50%; }
          50%  { border-radius: 40% 60% 55% 45% / 60% 55% 45% 40%; }
        }
        @keyframes float0 {
          0%, 100% { transform: translateY(0px); }
          50%  { transform: translateY(-8px); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px); }
          50%  { transform: translateY(-6px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50%  { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  )
}
