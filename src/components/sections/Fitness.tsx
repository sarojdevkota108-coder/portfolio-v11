'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { IconDumbbell, IconApple, IconHeartRateMonitor, IconTrophy, IconClock } from '@tabler/icons-react'

const PILLARS = [
  {
    icon: <IconDumbbell size={20} />,
    title: 'Strength Training',
    desc: 'Progressive overload-based resistance training for muscular development and long-term structural health.',
    color: 'violet',
    status: 'Active',
  },
  {
    icon: <IconApple size={20} />,
    title: 'Nutrition Science',
    desc: 'Macro-based nutrition planning, understanding metabolic processes and evidence-based dietary strategies.',
    color: 'green',
    status: 'Studying',
  },
  {
    icon: <IconHeartRateMonitor size={20} />,
    title: 'Performance Tracking',
    desc: 'Systematic logging of training metrics, body composition changes and recovery markers.',
    color: 'rose',
    status: 'Active',
  },
  {
    icon: <IconTrophy size={20} />,
    title: 'Discipline & Mindset',
    desc: 'Building systems and habits that align daily behaviour with long-term health and performance goals.',
    color: 'amber',
    status: 'Core Focus',
  },
]

const UPCOMING_CERTS = [
  { name: 'Nutrition Fundamentals',        issuer: 'Precision Nutrition',  color: 'green'  },
  { name: 'Sports Nutrition',              issuer: 'ISSA',                 color: 'cyan'   },
  { name: 'Fitness Coaching',              issuer: 'NASM / ACE',           color: 'violet' },
  { name: 'Strength & Conditioning',       issuer: 'NSCA',                 color: 'amber'  },
]

const COLOR_VALUES: Record<string, string> = {
  violet: '#a78bfa', green: '#00e599', rose: '#ff6b8a', amber: '#ffaa00', cyan: '#00d4ff',
}

export function Fitness() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="fitness" className="section max-w-7xl mx-auto px-6 md:px-10">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">Wellness</div>
          <h2 className="section-title">
            FITNESS &amp;<br />
            <span className="gradient-text-amber">NUTRITION.</span>
          </h2>
          <p className="section-desc">
            Approaching physical development with the same systems thinking applied to engineering —
            progressive overload, measured tracking, evidence-based nutrition.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left — pillars */}
          <div className="grid grid-cols-2 gap-4">
            {PILLARS.map((p, i) => {
              const c = COLOR_VALUES[p.color]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                  className="card glass-hover"
                  style={{ borderColor: `${c}20` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${c}12`, color: c }}
                  >
                    {p.icon}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: '16px',
                    letterSpacing: '.03em',
                    color: 'var(--txt)',
                    marginBottom: '6px',
                  }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--txt2)', lineHeight: 1.65, marginBottom: '10px' }}>
                    {p.desc}
                  </p>
                  <span className={`tag tag-${p.color} text-[10px]`}>{p.status}</span>
                </motion.div>
              )
            })}
          </div>

          {/* Right — upcoming certs + health dashboard */}
          <div className="flex flex-col gap-4">
            {/* Dashboard widget */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="terminal"
            >
              <div className="terminal-bar">
                <div className="terminal-dot" style={{ background: '#ff6b8a' }} />
                <div className="terminal-dot" style={{ background: '#ffaa00' }} />
                <div className="terminal-dot" style={{ background: '#00e599' }} />
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'var(--txt3)', marginLeft: '8px',
                }}>
                  health_dashboard.sh
                </span>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { key: 'FOCUS',       val: 'Body Recomposition',   color: '#a78bfa' },
                  { key: 'PROTOCOL',    val: 'Strength + Cardio',    color: '#00d4ff' },
                  { key: 'NUTRITION',   val: 'Macro-Based Tracking', color: '#00e599' },
                  { key: 'STATUS',      val: 'In Progress →',        color: '#ffaa00' },
                ].map(({ key, val, color }) => (
                  <div key={key} className="flex items-center gap-3">
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '11px',
                      color: 'var(--txt3)', width: '90px', flexShrink: 0,
                    }}>
                      {key}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming certs */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card"
            >
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                letterSpacing: '.16em', color: 'var(--txt3)',
                marginBottom: '14px', textTransform: 'uppercase',
              }}>
                Certification Roadmap
              </div>
              <div className="space-y-3">
                {UPCOMING_CERTS.map((cert, i) => {
                  const c = COLOR_VALUES[cert.color]
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-3 rounded-xl"
                      style={{ background: 'var(--bg3)', border: '1px solid var(--line)' }}
                    >
                      <div>
                        <div style={{ fontSize: '13px', color: 'var(--txt)', fontWeight: 500, marginBottom: '2px' }}>
                          {cert.name}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--txt3)' }}>
                          {cert.issuer}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md" style={{
                        background: `${c}10`, border: `1px solid ${c}25`,
                        fontFamily: 'var(--font-mono)', fontSize: '9px',
                        color: c, letterSpacing: '.06em',
                      }}>
                        <IconClock size={10} /> UPCOMING
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
