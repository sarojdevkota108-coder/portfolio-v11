'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { COLOR_MAP } from '@/lib/utils'
import { IconShield, IconHeart, IconSchool, IconMicrophone, IconX } from '@tabler/icons-react'

const ICON_MAP: Record<string, React.ReactNode> = {
  shield:     <IconShield size={18} />,
  heart:      <IconHeart size={18} />,
  school:     <IconSchool size={18} />,
  microphone: <IconMicrophone size={18} />,
}

const STRENGTHS = [
  'Leadership', 'Communication', 'Mentorship',
  'Team Coordination', 'Public Speaking',
  'Social Responsibility', 'Training & Facilitation',
]

const STATS = [
  { num: '40+', label: 'People Trained',   color: 'cyan'   },
  { num: '4',   label: 'Initiatives',      color: 'green'  },
  { num: '2+',  label: 'Years Active',     color: 'amber'  },
  { num: '3',   label: 'Domains Served',   color: 'violet' },
]

// ── Hardcoded data — no CMS API needed ───────────────────────────────────────
const VOLUNTEER_ITEMS = [
  {
    id: 'vol-1',
    year: '2023',
    title: 'Cyber Security Awareness Trainer',
    org: 'Technology Education Initiative · Kathmandu',
    description: 'Delivered hands-on cybersecurity training covering digital hygiene, phishing prevention, and safe online practices to local community members.',
    tag: '40+ individuals trained',
    color: 'cyan',
    icon: 'shield',
    preview: '/volunteer/previews/vol-1_p1.jpg',
    pdfUrl: '/volunteer/vol-1.pdf',
  },
  {
    id: 'vol-2',
    year: '2023',
    title: 'Breast Cancer Awareness Volunteer',
    org: 'Healthcare Community Initiative',
    description: 'Participated in awareness campaigns focused on early detection and community education across local neighbourhoods.',
    tag: 'Healthcare',
    color: 'rose',
    icon: 'heart',
    preview: '/volunteer/previews/vol-2_p1.jpg',
    pdfUrl: '/volunteer/vol-2.pdf',
  },
  {
    id: 'vol-3',
    year: '2022–Present',
    title: 'Educational Tutoring Volunteer',
    org: 'Academic Support Programme',
    description: 'Free tutoring in mathematics, computing, and science to students from underserved backgrounds.',
    tag: 'Education · Mentorship',
    color: 'green',
    icon: 'school',
    preview: '/volunteer/previews/vol-3_p1.jpg',
    pdfUrl: '/volunteer/vol-3.pdf',
  },
  {
    id: 'vol-4',
    year: 'Ongoing',
    title: 'Public Speaking & Leadership Development',
    org: 'Community Leadership Programmes',
    description: 'Active participation in workshops and leadership programmes developing communication and organisational skills.',
    tag: 'Leadership',
    color: 'amber',
    icon: 'microphone',
    preview: '/volunteer/previews/vol-4_p1.jpg',
    pdfUrl: '/volunteer/vol-4.pdf',
  },
]

// ── Fullscreen lightbox ───────────────────────────────────────────────────────
function Lightbox({ item, onClose }: { item: typeof VOLUNTEER_ITEMS[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(4,4,10,0.97)' }}>
      <div className="flex items-center justify-between flex-shrink-0 px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: 13, color: 'var(--txt2)', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 'calc(100vw - 120px)' }}>
          {item.title}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a href={item.pdfUrl} download
            style={{ fontSize: 11, color: '#00d4ff', fontFamily: 'var(--font-mono)', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.08)', textDecoration: 'none' }}>
            ↓ PDF
          </a>
          <button onClick={onClose}
            style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--txt)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <IconX size={16} />
          </button>
        </div>
      </div>
      {/* Scrollable image — native pinch zoom on mobile */}
      <div className="flex-1 overflow-auto flex items-start justify-center p-4">
        <img src={item.preview} alt={item.title}
          style={{ maxWidth: '100%', height: 'auto', borderRadius: 8, display: 'block' }} />
      </div>
    </div>
  )
}

export function Volunteer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })
  const [lightbox, setLightbox] = useState<typeof VOLUNTEER_ITEMS[0] | null>(null)

  return (
    <section id="volunteer" className="section max-w-7xl mx-auto px-6 md:px-10">
      <div ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="section-eyebrow">Community</div>
          <h2 className="section-title">LEADERSHIP<br /><span className="gradient-text-amber">&amp; IMPACT.</span></h2>
          <p className="section-desc">
            Technical growth must go hand-in-hand with community contribution.
            Actively engaged in education, public awareness and cybersecurity training.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {STATS.map((s, i) => (
            <div key={i} className="card text-center glass-hover" style={{ borderColor: `${COLOR_MAP[s.color]}25` }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '48px', letterSpacing: '.03em', color: COLOR_MAP[s.color], lineHeight: 1, marginBottom: '4px' }}>
                {s.num}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.14em', color: 'var(--txt3)', textTransform: 'uppercase' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Timeline */}
          <div className="md:col-span-2">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.18em', color: 'var(--txt3)', textTransform: 'uppercase', marginBottom: '28px' }}>
              Activity Timeline
            </div>
            <div className="relative pl-8 space-y-8">
              <div className="absolute left-0 top-2 bottom-2 w-px"
                style={{ background: 'linear-gradient(to bottom, var(--cyan), rgba(0,212,255,0.1))' }} />

              {VOLUNTEER_ITEMS.map((item, i) => {
                const c = COLOR_MAP[item.color]
                return (
                  <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }} className="relative">
                    <div className="absolute -left-8 top-2 w-3 h-3 rounded-full border-2"
                      style={{ borderColor: c, background: 'var(--bg)', boxShadow: `0 0 10px ${c}50`, transform: 'translateX(-4px)' }} />

                    <div className="card glass-hover overflow-hidden" style={{ borderColor: `${c}20`, padding: 0 }}>
                      {/* Certificate preview — tappable image */}
                      <div className="relative w-full overflow-hidden cursor-pointer group"
                        style={{ background: `${c}06`, borderBottom: `1px solid ${c}15` }}
                        onClick={() => setLightbox(item)}>
                        <img src={item.preview} alt={item.title}
                          style={{ width: '100%', height: 'auto', maxHeight: 360, objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: 'rgba(0,0,0,0.35)' }}>
                          <span style={{ color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.1em', background: 'rgba(0,0,0,0.6)', padding: '8px 16px', borderRadius: 8 }}>
                            TAP TO EXPAND
                          </span>
                        </div>
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                          style={{ background: 'rgba(4,4,10,0.75)', backdropFilter: 'blur(10px)', border: `1px solid ${c}30`, fontFamily: 'var(--font-mono)', fontSize: 9, color: c, letterSpacing: '.1em' }}>
                          🖼 Certificate
                        </div>
                      </div>

                      {/* Card info */}
                      <div style={{ padding: '20px 24px 22px' }}>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <span style={{ color: c }}>{ICON_MAP[item.icon]}</span>
                            <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', letterSpacing: '.03em', color: 'var(--txt)' }}>
                              {item.title}
                            </span>
                          </div>
                          <span className={`tag tag-${item.color} flex-shrink-0 hidden sm:inline-flex`}>{item.year}</span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.06em', color: 'var(--txt3)', marginBottom: '8px' }}>
                          {item.org}
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.7, marginBottom: '10px' }}>
                          {item.description}
                        </p>
                        <span className={`tag tag-${item.color}`}>{item.tag}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Strengths sidebar */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col gap-4">
            <div className="card" style={{ borderColor: 'rgba(255,170,0,0.2)', background: 'rgba(255,170,0,0.03)' }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', letterSpacing: '.04em', color: 'var(--amber)', lineHeight: 1.25, marginBottom: '8px' }}>
                &quot;Selfless Action, Endless Impact.&quot;
              </div>
              <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.7 }}>
                Actively engaged in community development, educational support, public awareness
                initiatives, and cybersecurity training programmes.
              </p>
            </div>

            <div className="card">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.14em', color: 'var(--txt3)', marginBottom: '14px', textTransform: 'uppercase' }}>
                Core Strengths
              </div>
              <div className="space-y-3">
                {STRENGTHS.map((s, i) => (
                  <motion.div key={s} initial={{ opacity: 0, width: 0 }} animate={inView ? { opacity: 1, width: '100%' } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.07 }} className="flex items-center gap-3">
                    <span style={{ fontSize: '13px', color: 'var(--txt2)', minWidth: '140px' }}>{s}</span>
                    <div className="flex-1 metric-bar">
                      <div className="metric-fill" style={{ background: 'linear-gradient(90deg, var(--amber), var(--rose))', transform: inView ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: `${0.6 + i * 0.07}s` }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="card" style={{ borderColor: 'rgba(0,229,153,0.15)', background: 'rgba(0,229,153,0.03)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="status-dot" style={{ background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.1em', color: 'var(--green)' }}>
                  ACTIVELY CONTRIBUTING
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--txt2)', lineHeight: 1.65 }}>
                Ongoing educational tutoring and community leadership participation across Kathmandu.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  )
}
