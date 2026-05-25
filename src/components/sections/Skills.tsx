'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { COLOR_MAP } from '@/lib/utils'

function MarqueeStrip({ items }: { items: string[] }) {
  const doubled = [...items, ...items]
  return (
    <div
      className="overflow-hidden py-5 my-10 border-y"
      style={{ borderColor: 'var(--line)' }}
    >
      <div className="flex gap-8 animate-marquee whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', letterSpacing: '.1em', color: 'var(--txt3)' }}
          >
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: i % 3 === 0 ? 'var(--cyan)' : i % 3 === 1 ? 'var(--blue)' : 'var(--green)', flexShrink: 0 }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

const TAG_COLORS: Record<string, string> = {
  Advanced:   'var(--cyan)',
  Proficient: 'var(--blue)',
  Competent:  'var(--green)',
}

export function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const [active, setActive] = useState<string | null>(null)
  const [SKILLS_MATRIX, setSkillsMatrix] = useState<{ category: string; color: string; items: { name: string; tag: string }[] }[]>([])
  const [MARQUEE_ITEMS, setMarqueeItems] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/cms?section=skills').then(r => r.json()).then(j => setSkillsMatrix(j.data || [])).catch(() => {})
    fetch('/api/cms?section=marquee').then(r => r.json()).then(j => setMarqueeItems(j.data || [])).catch(() => {})
  }, [])

  const visible = active
    ? SKILLS_MATRIX.filter(g => g.category === active)
    : SKILLS_MATRIX

  return (
    <section id="skills" className="section max-w-7xl mx-auto px-6 md:px-10">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">Capabilities</div>
          <h2 className="section-title">
            SKILLS &amp;<br />
            <span className="gradient-text-blue">TECHNOLOGIES.</span>
          </h2>
        </motion.div>

        <MarqueeStrip items={MARQUEE_ITEMS} />

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <button
            onClick={() => setActive(null)}
            style={{ cursor: 'none' }}
            className={`px-4 py-2 rounded-lg text-[12px] font-mono tracking-[.06em] border transition-all ${
              !active ? 'bg-white/8 border-white/15 text-white' : 'bg-transparent border-white/6 text-[var(--txt3)] hover:border-white/12 hover:text-[var(--txt2)]'
            }`}
          >
            All
          </button>
          {SKILLS_MATRIX.map(g => (
            <button
              key={g.category}
              onClick={() => setActive(active === g.category ? null : g.category)}
              style={{ cursor: 'none' }}
              className={`px-4 py-2 rounded-lg text-[12px] font-mono tracking-[.06em] border transition-all ${
                active === g.category
                  ? 'bg-white/8 border-white/15 text-white'
                  : 'bg-transparent border-white/6 text-[var(--txt3)] hover:border-white/12 hover:text-[var(--txt2)]'
              }`}
            >
              {g.category}
            </button>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {Object.entries(TAG_COLORS).map(([label, color]) => (
            <div key={label} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--txt3)', letterSpacing: '.08em' }}>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Skill groups */}
        <motion.div layout className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          <AnimatePresence>
            {visible.map((group, gi) => {
              const c = COLOR_MAP[group.color]
              return (
                <motion.div
                  key={group.category}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: gi * 0.06 }}
                  className="card glass-hover"
                  style={{ borderColor: `${c}20` }}
                >
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-5"
                    style={{
                      background: `${c}10`,
                      border: `1px solid ${c}25`,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '.1em',
                      color: c,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
                    {group.category}
                  </div>

                  <div className="space-y-3">
                    {group.items.map((skill, si) => {
                      const tagColor = TAG_COLORS[skill.tag] || 'var(--txt3)'
                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -8 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.3 + gi * 0.06 + si * 0.07 }}
                          className="flex items-center justify-between gap-3"
                        >
                          <span style={{ fontSize: '13px', color: 'var(--txt2)', flex: 1 }}>{skill.name}</span>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '9px',
                              letterSpacing: '.08em',
                              color: tagColor,
                              background: `${tagColor}12`,
                              border: `1px solid ${tagColor}30`,
                              borderRadius: '999px',
                              padding: '2px 8px',
                              whiteSpace: 'nowrap',
                              textTransform: 'uppercase',
                            }}
                          >
                            {skill.tag}
                          </span>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
