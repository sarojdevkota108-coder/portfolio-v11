'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  IconTrophy, IconStar, IconCode, IconBuildingSkyscraper,
  IconNetwork, IconUsers, IconPlus, IconSparkles,
} from '@tabler/icons-react'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Web Dev':  <IconCode size={16} />,
  'Design':   <IconBuildingSkyscraper size={16} />,
  'Network':  <IconNetwork size={16} />,
  'Community':<IconUsers size={16} />,
  'Award':    <IconTrophy size={16} />,
}

const COLOR_MAP: Record<string, string> = {
  cyan:   '#00d4ff',
  blue:   '#4f7fff',
  green:  '#00e599',
  amber:  '#ffaa00',
  violet: '#a78bfa',
  rose:   '#ff6b8a',
}


interface Achievement {
  id: string
  category: string
  color: string
  title: string
  org: string
  year: string
  description: string
  tag: string
  icon?: string
}

// Empty state shown when no achievements exist yet
function EmptyAchievements() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: 'linear-gradient(135deg, rgba(79,127,255,0.1), rgba(0,212,255,0.06))',
          border: '1px solid rgba(79,127,255,0.2)',
        }}
      >
        <IconSparkles size={32} style={{ color: 'var(--cyan)' }} />
      </div>
      <h3 style={{
        fontFamily: 'var(--font-bebas)',
        fontSize: '28px',
        letterSpacing: '.06em',
        color: 'var(--txt)',
        marginBottom: '12px',
      }}>
        ACHIEVEMENTS INCOMING
      </h3>
      <p style={{
        fontSize: '14px',
        color: 'var(--txt3)',
        maxWidth: '380px',
        lineHeight: 1.7,
        marginBottom: '24px',
      }}>
        This section will showcase awards, recognitions, competition wins, and notable milestones
        as Saroj's journey grows across web development, interior design, and networking.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {['Hackathon Wins', 'Design Awards', 'Certifications', 'Community Impact', 'Open Source'].map(tag => (
          <span key={tag} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '.08em',
            padding: '5px 12px',
            borderRadius: '999px',
            border: '1px dashed rgba(255,255,255,0.1)',
            color: 'var(--txt3)',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Add achievement prompt */}
      <div
        className="mt-10 px-6 py-4 rounded-xl"
        style={{
          background: 'rgba(79,127,255,0.04)',
          border: '1px dashed rgba(79,127,255,0.2)',
          maxWidth: '440px',
        }}
      >
        <p style={{ fontSize: '13px', color: 'var(--txt3)', lineHeight: 1.6 }}>
          Growing across web development, interior design, and networking —
          achievements and recognitions coming soon.
        </p>
      </div>
    </motion.div>
  )
}

export function Achievements() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [filter, setFilter] = useState<string>('all')
  const [ACHIEVEMENTS, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    fetch('/api/cms?section=achievements')
      .then(r => r.json())
      .then(j => setAchievements(j.data || []))
      .catch(() => setAchievements([]))
  }, [])

  const categories = ['all', ...Array.from(new Set(ACHIEVEMENTS.map(a => a.category)))]
  const visible = filter === 'all' ? ACHIEVEMENTS : ACHIEVEMENTS.filter(a => a.category === filter)

  return (
    <section id="achievements" className="section max-w-7xl mx-auto px-6 md:px-10">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">Recognition</div>
          <h2 className="section-title">
            ACHIEVEMENTS &amp;<br />
            <span className="gradient-text-blue">MILESTONES.</span>
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--txt2)',
            maxWidth: '520px',
            lineHeight: 1.8,
            marginBottom: '40px',
          }}>
            Awards, recognitions, and notable milestones across web development,
            interior design, and network engineering — growing with every project.
          </p>
        </motion.div>

        {/* Filters — only shown when there are achievements */}
        {ACHIEVEMENTS.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-[12px] font-mono tracking-[.06em] border transition-all duration-200 ${
                  filter === cat
                    ? 'bg-white/8 border-white/15 text-white'
                    : 'bg-transparent border-white/6 text-[var(--txt3)] hover:border-white/12 hover:text-[var(--txt2)]'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Content */}
        {ACHIEVEMENTS.length === 0 ? (
          <EmptyAchievements />
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            <AnimatePresence>
              {visible.map((a, i) => {
                const col = COLOR_MAP[a.color] || 'var(--cyan)'
                return (
                  <motion.div
                    key={a.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="card glass-hover relative overflow-hidden group"
                    style={{ borderColor: `${col}25` }}
                  >
                    {/* Top glow line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                      style={{ background: `linear-gradient(90deg, transparent, ${col}80, transparent)` }}
                    />
                    {/* Corner decoration */}
                    <div
                      className="absolute top-0 right-0 w-16 h-16"
                      style={{ background: `radial-gradient(circle at top right, ${col}12, transparent 70%)` }}
                    />

                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${col}15`, color: col }}
                      >
                        {CATEGORY_ICONS[a.category] || <IconTrophy size={16} />}
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: 'var(--txt3)',
                        letterSpacing: '.06em',
                      }}>
                        {a.year}
                      </span>
                    </div>

                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      letterSpacing: '.12em',
                      color: col,
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}>
                      {a.category}
                    </div>

                    <div style={{
                      fontSize: '15px',
                      color: 'var(--txt)',
                      fontWeight: 600,
                      lineHeight: 1.4,
                      marginBottom: '8px',
                    }}>
                      {a.title}
                    </div>

                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--txt3)',
                      marginBottom: '10px',
                    }}>
                      {a.org}
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.6 }}>
                      {a.description}
                    </p>

                    {a.tag && (
                      <div className="mt-3">
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '9px',
                          letterSpacing: '.08em',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: `${col}10`,
                          border: `1px solid ${col}30`,
                          color: col,
                        }}>
                          {a.tag}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}
