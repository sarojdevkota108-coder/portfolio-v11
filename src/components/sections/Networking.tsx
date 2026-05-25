'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { NET_SKILLS } from '@/data/portfolio'

function NetworkTopology() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--bg2)', border: '1px solid var(--line)' }}
    >
      <div
        className="px-5 py-3 flex items-center gap-2 border-b"
        style={{ borderColor: 'var(--line)', background: 'var(--bg3)' }}
      >
        <span className="status-dot" />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '.08em', color: 'var(--txt3)' }}>
          LIVE TOPOLOGY — Enterprise WAN Simulation · New York ↔ Tokyo
        </span>
      </div>

      {/*
        FIX: wrap SVG in a horizontally-scrollable container so it never gets
        crushed on narrow phones. The SVG keeps its 700px coordinate space so
        all text stays crisp and readable.
      */}
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <svg
          viewBox="0 0 700 240"
          style={{ display: 'block', padding: '8px', minWidth: '500px', width: '100%' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="0" width="700" height="240" fill="transparent" />

          {[
            { x: 90, y: 22, text: 'TOKYO OFFICE', color: '#4f7fff' },
            { x: 610, y: 22, text: 'NEW YORK HQ', color: '#00d4ff' },
          ].map((l, i) => (
            <g key={i}>
              <rect x={l.x - 65} y={l.y - 13} width="130" height="22" rx="4"
                fill={`${l.color}08`} stroke={`${l.color}25`} strokeWidth="0.5" />
              <text x={l.x} y={l.y + 2} textAnchor="middle"
                fontFamily="JetBrains Mono, monospace" fontSize="9" fill={l.color} letterSpacing="2">
                {l.text}
              </text>
            </g>
          ))}

          {[
            { y: 55,  label: 'L2 Switch', color: '#8080a0', bg: '#13131c' },
            { y: 95,  label: 'L3 / VLAN', color: '#8080a0', bg: '#13131c' },
            { y: 135, label: 'Firewall',  color: '#ffaa00', bg: 'rgba(255,170,0,0.06)' },
            { y: 175, label: 'Router',    color: '#4f7fff', bg: 'rgba(79,127,255,0.06)' },
          ].map((n, i) => (
            <g key={i}>
              <rect x="30" y={n.y} width="120" height="22" rx="4"
                fill={n.bg} stroke={`${n.color}30`} strokeWidth="0.6" />
              <text x="90" y={n.y + 14} textAnchor="middle"
                fontFamily="JetBrains Mono, monospace" fontSize="9" fill={n.color}>
                {n.label}
              </text>
              {i < 3 && (
                <line x1="90" y1={n.y + 22} x2="90" y2={n.y + 33}
                  stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
              )}
            </g>
          ))}

          {[
            { y: 55,  label: 'L2 Switch', color: '#8080a0', bg: '#13131c' },
            { y: 95,  label: 'L3 / VLAN', color: '#8080a0', bg: '#13131c' },
            { y: 135, label: 'Firewall',  color: '#ffaa00', bg: 'rgba(255,170,0,0.06)' },
            { y: 175, label: 'Router',    color: '#00d4ff', bg: 'rgba(0,212,255,0.06)' },
          ].map((n, i) => (
            <g key={i}>
              <rect x="550" y={n.y} width="120" height="22" rx="4"
                fill={n.bg} stroke={`${n.color}30`} strokeWidth="0.6" />
              <text x="610" y={n.y + 14} textAnchor="middle"
                fontFamily="JetBrains Mono, monospace" fontSize="9" fill={n.color}>
                {n.label}
              </text>
              {i < 3 && (
                <line x1="610" y1={n.y + 22} x2="610" y2={n.y + 33}
                  stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
              )}
            </g>
          ))}

          <rect x="285" y="200" width="130" height="24" rx="12"
            fill="rgba(167,139,250,0.07)" stroke="rgba(167,139,250,0.25)" strokeWidth="0.5" />
          <text x="350" y="216" textAnchor="middle"
            fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#a78bfa" letterSpacing="1">
            CLOUD / INTERNET
          </text>

          <line x1="150" y1="186" x2="550" y2="186"
            stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="5 4" />
          <text x="350" y="181" textAnchor="middle"
            fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(255,255,255,0.2)" letterSpacing="1">
            WAN LINK — MPLS/IPSec
          </text>

          <line x1="90"  y1="197" x2="285" y2="208" stroke="rgba(167,139,250,0.15)" strokeWidth="0.5" />
          <line x1="610" y1="197" x2="415" y2="208" stroke="rgba(167,139,250,0.15)" strokeWidth="0.5" />

          <circle r="3.5" fill="#4f7fff" opacity="0.9">
            <animateMotion dur="3.2s" repeatCount="indefinite" path="M150,186 L550,186" />
          </circle>
          <circle r="3" fill="#00d4ff" opacity="0.8">
            <animateMotion dur="4s" repeatCount="indefinite" begin="1.2s" path="M550,186 L150,186" />
          </circle>
          <circle r="2.5" fill="#00e599" opacity="0.7">
            <animateMotion dur="5s" repeatCount="indefinite" begin="2.4s" path="M150,186 L550,186" />
          </circle>
        </svg>
      </div>

      {/* Scroll hint for mobile — disappears when the diagram fits */}
      <div className="sm:hidden px-5 pb-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--txt3)', letterSpacing: '.08em' }}>
        ← scroll to see full diagram →
      </div>

      <div className="px-5 py-3 flex gap-5 border-t" style={{ borderColor: 'var(--line)' }}>
        {[
          { c: '#4f7fff', l: 'ICMP' },
          { c: '#00d4ff', l: 'DNS' },
          { c: '#00e599', l: 'ARP' },
        ].map(({ c, l }) => (
          <span key={l} className="flex items-center gap-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: c }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: c, display: 'inline-block', boxShadow: `0 0 6px ${c}` }} />
            {l}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Networking() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const projects = [
    {
      num: '01',
      title: 'Enterprise Network Architecture Simulation',
      tech: 'Cisco Packet Tracer · TCP/IP · VLANs · NAT',
      points: [
        'Multi-site enterprise WAN connecting New York and Tokyo',
        'Routers, L2/L3 switches, firewalls and servers configured',
        'VLAN-based segmentation and hierarchical architecture',
        'NAT policies and firewall rule simulation',
        'Packet-level analysis: ICMP, ARP, DNS, PDU',
      ],
      color: '#4f7fff',
    },
    {
      num: '02',
      title: 'Multi-Router Hierarchical Network Design',
      tech: 'Routing · Redundancy · Scalability · OSI Model',
      points: [
        'Distributed multi-router topology with core / distribution / access layers',
        'Inter-router communication protocols configured',
        'Redundancy and scalability built into design',
        'Enterprise infrastructure principles applied',
      ],
      color: '#00d4ff',
    },
  ]

  return (
    <section id="networking" className="section max-w-7xl mx-auto px-6 md:px-10">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">Infrastructure</div>
          <h2 className="section-title">
            NETWORK<br />
            <span className="gradient-text-blue">ENGINEERING.</span>
          </h2>
          <p className="section-desc">
            Designing and simulating enterprise-grade network topologies — from Layer 2
            switching to WAN, cloud connectivity and cybersecurity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <NetworkTopology />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              className="card glass-hover"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.12 }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.12em', color: p.color, marginBottom: '8px' }}>
                PROJECT {p.num}
              </div>
              <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', letterSpacing: '.03em', color: 'var(--txt)', marginBottom: '6px' }}>
                {p.title}
              </h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--txt3)', marginBottom: '14px' }}>
                {p.tech}
              </div>
              <ul className="space-y-2">
                {p.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--txt2)' }}>
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: p.color }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Skills grid — FIX: explicit flex-wrap so tags never overflow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8"
        >
          <div
            className="rounded-xl p-6"
            style={{ background: 'var(--bg2)', border: '1px solid var(--line)' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.14em', color: 'var(--txt3)', marginBottom: '16px', textTransform: 'uppercase' }}>
              Networking Skill Set
            </div>
            {/* flex-wrap is explicit here — prevents horizontal overflow on mobile */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {NET_SKILLS.map(s => (
                <span key={s} className="net-skill-tag tag tag-blue">{s}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
