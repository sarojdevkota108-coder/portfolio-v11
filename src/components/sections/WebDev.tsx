'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PROJECTS } from '@/data/portfolio'
import { COLOR_MAP } from '@/lib/utils'
import {
  IconArrowUpRight, IconBrandGithub,
  IconChevronRight, IconCheck, IconBrandYoutube,
} from '@tabler/icons-react'

function YouTubeEmbed({ videoId, color }: { videoId: string; color: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="mt-5 rounded-xl overflow-hidden" style={{ border: `1px solid ${color}25`, aspectRatio: '16/9', position: 'relative', background: '#000' }}>
      {!playing ? (
        <button
          onClick={() => setPlaying(true)}
          style={{ cursor: 'none', width: '100%', height: '100%', position: 'relative', display: 'block' }}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="Video thumbnail"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
          />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%',
              background: `${color}cc`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 24px ${color}66`,
            }}>
              <IconBrandYoutube size={30} color="#fff" />
            </div>
          </div>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      )}
    </div>
  )
}

function PosterModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.88)', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        padding: '24px', cursor: 'none',
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}>
        <img src={src} alt="Project poster" style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '12px', boxShadow: '0 8px 60px rgba(0,0,0,0.7)' }} />
        <button
          onClick={onClose}
          style={{
            cursor: 'none', position: 'absolute', top: '-14px', right: '-14px',
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'var(--bg4)', border: '1px solid var(--line2)',
            color: 'var(--txt2)', fontSize: '18px', lineHeight: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >×</button>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [posterOpen, setPosterOpen] = useState(false)
  const c = COLOR_MAP[project.color]

  return (
    <>
      {posterOpen && project.posterImage && (
        <PosterModal src={project.posterImage} onClose={() => setPosterOpen(false)} />
      )}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        className={`card glass-hover relative overflow-hidden ${project.featured ? 'md:col-span-2' : ''}`}
        style={{ borderColor: hovered ? `${c}30` : 'var(--line)' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Glow on hover */}
        <div
          className="absolute inset-0 rounded-xl transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${c}0c 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        <div className={`relative ${project.featured ? 'md:flex gap-10' : ''}`}>
          {/* Left */}
          <div className={project.featured ? 'flex-1' : ''}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div
                className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest"
                style={{ background: `${c}12`, border: `1px solid ${c}25`, color: c }}
              >
                {project.badge}
              </div>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: project.featured ? '32px' : '24px',
                letterSpacing: '.03em',
                color: 'var(--txt)',
                lineHeight: 1.05,
                marginBottom: '10px',
              }}
            >
              {project.title}
            </h3>

            <p style={{ fontSize: '14px', color: 'var(--txt2)', lineHeight: 1.7, marginBottom: '16px' }}>
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.stack.map(s => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a href={project.github} className="btn-ghost text-[13px] py-2 px-4" target="_blank" rel="noreferrer">
                  <IconBrandGithub size={14} /> GitHub
                </a>
              )}
              {project.live && (
                <a href={project.live} className="btn-ghost text-[13px] py-2 px-4" style={{ color: c, borderColor: `${c}30` }} target="_blank" rel="noreferrer">
                  Live Site <IconArrowUpRight size={13} />
                </a>
              )}

            </div>

            {/* Inline poster display */}
            {project.posterImage && (
              <div className="mt-5 rounded-xl overflow-hidden" style={{ border: `1px solid ${c}25` }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '.12em',
                  color: c, padding: '8px 14px',
                  background: `${c}08`, borderBottom: `1px solid ${c}15`,
                  textTransform: 'uppercase',
                }}>
                  📄 Project Poster
                </div>
                <img
                  src={project.posterImage}
                  alt="Project poster"
                  onClick={() => setPosterOpen(true)}
                  style={{
                    width: '100%', height: 'auto', display: 'block',
                    cursor: 'pointer', maxHeight: '600px', objectFit: 'contain',
                    background: 'var(--bg3)',
                  }}
                />
              </div>
            )}

            {/* YouTube embed for IoT project */}
            {project.youtubeId && (
              <YouTubeEmbed videoId={project.youtubeId} color={c} />
            )}
          </div>

          {/* Right — featured metrics & features */}
          {project.featured && (
            <div className="md:w-64 mt-6 md:mt-0 flex flex-col gap-4">
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2">
                {project.metrics.map(m => (
                  <div key={m.label} className="rounded-xl p-3 text-center" style={{ background: 'var(--bg3)', border: '1px solid var(--line)' }}>
                    <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', color: c, letterSpacing: '.02em' }}>
                      {m.value}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '.1em', color: 'var(--txt3)', textTransform: 'uppercase' }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
              {/* Features */}
              <div className="rounded-xl p-4" style={{ background: 'var(--bg3)', border: '1px solid var(--line)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.12em', color: 'var(--txt3)', marginBottom: '10px', textTransform: 'uppercase' }}>
                  Core Features
                </div>
                <ul className="space-y-2">
                  {project.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-[12px]" style={{ color: 'var(--txt2)' }}>
                      <IconCheck size={12} className="mt-0.5 flex-shrink-0" style={{ color: c }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

export function WebDev() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="webdev" className="section max-w-7xl mx-auto px-6 md:px-10">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">Full Stack Development</div>
          <h2 className="section-title">
            SELECTED<br />
            <span className="gradient-text-blue">PROJECTS.</span>
          </h2>
          <p className="section-desc">
            Production-grade applications spanning full-stack development, network architecture,
            and immersive spatial design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
