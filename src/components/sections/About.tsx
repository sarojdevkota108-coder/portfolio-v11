'use client'
import { motion } from 'framer-motion'
import {
  IconCode,
  IconNetwork,
  IconBuildingSkyscraper,
} from '@tabler/icons-react'

const WORLDS = [
  {
    id: 'code',
    title: 'The Developer',
    color: '#00d4ff',
    bg: 'rgba(0,212,255,0.04)',
    border: 'rgba(0,212,255,0.15)',
    icon: IconCode,
    tagline: 'Systems that think',
    desc: 'Full-stack applications with Django & React. APIs that move data. Interfaces that disappear.',
    items: ['Python · Django · REST', 'React · Next.js · TypeScript', 'PostgreSQL · Docker · AWS'],
  },
  {
    id: 'design',
    title: 'The Designer',
    color: '#00e599',
    bg: 'rgba(0,229,153,0.04)',
    border: 'rgba(0,229,153,0.15)',
    icon: IconBuildingSkyscraper,
    tagline: 'Spaces that breathe',
    desc: '3D visualization, AutoCAD floor plans, material curation where function meets beauty.',
    items: ['AutoCAD · 3D Visualization', 'Space Planning · Lighting', 'Material & Color Theory'],
  },
  {
    id: 'network',
    title: 'The Engineer',
    color: '#4f7fff',
    bg: 'rgba(79,127,255,0.04)',
    border: 'rgba(79,127,255,0.15)',
    icon: IconNetwork,
    tagline: 'Infrastructure that holds',
    desc: 'Enterprise topology, VLAN architecture, WAN simulation, the invisible skeleton of everything.',
    items: ['Cisco · TCP/IP · VLANs', 'Routing · Switching · Firewalls', 'AWS · Cloud · DNS/DHCP'],
  },
]

export function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 md:px-10 py-[120px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-eyebrow">About</div>
        <h2 className="section-title">
          THREE CRAFTS,<br />
          <span className="gradient-text-blue">ONE VISION.</span>
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-5 mt-20">
        {WORLDS.map((w, i) => {
          const Icon = w.icon

          return (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="card glass-hover group relative overflow-hidden"
              style={{ borderColor: w.border, background: w.bg }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                style={{
                  background: `linear-gradient(90deg, transparent, ${w.color}, transparent)`,
                }}
              />

              <div
                className="w-[44px] h-[44px] rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${w.color}15`, color: w.color }}
              >
                <Icon size={20} />
              </div>

              <div
                className="uppercase mb-2"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '.14em',
                  color: w.color,
                }}
              >
                {w.tagline}
              </div>

              <h3 className="text-[26px] mb-3 font-bebas">{w.title}</h3>

              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {w.desc}
              </p>

              <div className="flex flex-col gap-2">
                {w.items.map((it) => (
                  <div key={it} className="flex items-center gap-2 text-xs text-gray-500">
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ background: w.color }}
                    />
                    {it}
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}