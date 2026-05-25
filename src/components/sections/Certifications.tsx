'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { COLOR_MAP, STATUS_CONFIG } from '@/lib/utils'
import { IconCheck, IconRefresh, IconClock, IconExternalLink, IconShield, IconX, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

type Filter = 'all' | 'done' | 'prog' | 'upcoming'

interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  status: 'done' | 'prog' | 'upcoming'
  color: string
  preview?: string   // JPEG preview image
  pdfUrl?: string    // original PDF for download
  credentialUrl?: string
  credentialId?: string
  description?: string
}

// ── Hardcoded data — no CMS API needed ───────────────────────────────────────
const CERTS: Certification[] = [
  {
    id: 'cert-2',
    name: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    year: '2026',
    status: 'done',
    color: 'blue',
    preview: '/certificates/previews/cert-2_p1.jpg',
    pdfUrl: '/certificates/cert-2.pdf',
    credentialUrl: 'https://www.credly.com/badges/db664e74-14fd-43cd-a55b-d4091e5b6806/linked_in_profile',
    credentialId: '0c33e30f-912f-4c7d-a146-b6712a6f5507',
    description: 'Foundational knowledge in networking concepts, IP addressing, network protocols, routing, switching, and basic network troubleshooting.',
  },
  {
    id: 'cert-3',
    name: 'Cisco Packet Tracer',
    issuer: 'Cisco Networking Academy',
    year: '2026',
    status: 'done',
    color: 'blue',
    preview: '/certificates/previews/cert-3_p1.jpg',
    pdfUrl: '/certificates/cert-3.pdf',
    credentialId: '09e5f2e5-4759-4d28-98dd-1c60816b00bb',
    description: 'Hands-on network simulation using Cisco Packet Tracer.',
  },
  {
    id: 'cert-4',
    name: 'Linux Unhatched',
    issuer: 'NDG / Cisco',
    year: '2026',
    status: 'done',
    color: 'green',
    preview: '/certificates/previews/cert-4_p1.jpg',
    pdfUrl: '/certificates/cert-4.pdf',
    credentialUrl: 'https://www.credly.com/badges/dcf53453-3619-464f-af27-2a60ec82a01d/linked_in_profile',
    credentialId: '0b9f9eb2-77b9-40c5-8701-964a6235a82c',
    description: 'Foundational Linux OS knowledge: command-line navigation, file management, system operations, and IT infrastructure essentials.',
  },
  {
    id: 'cert-6',
    name: 'Microsoft Excel',
    issuer: 'Simplilearn',
    year: '2026',
    status: 'done',
    color: 'green',
    preview: '/certificates/previews/cert-6_p1.jpg',
    pdfUrl: '/certificates/cert-6.pdf',
    credentialUrl: 'https://simpli-web.app.link/e/qdjoBhV5b3b',
    credentialId: '10234496',
    description: 'Spreadsheet management, formulas and functions, data organization, and analytical skills for professional applications.',
  },
  {
    id: 'certifications-1779624042835',
    name: 'Introduction to Software Testing',
    issuer: 'Simplilearn',
    year: '2026',
    status: 'done',
    color: 'blue',
    preview: '/certificates/previews/certifications-1779624042835_p1.jpg',
    pdfUrl: '/certificates/certifications-1779624042835.pdf',
    credentialId: '9685914',
    description: 'Learned about software testing fundamentals and methodologies.',
  },
  {
    id: 'cert-7',
    name: 'Solutions Architect (SAA-C03)',
    issuer: 'Amazon Web Services',
    year: '2026',
    status: 'prog',
    color: 'amber',
  },
  {
    id: 'cert-8',
    name: 'CCNA',
    issuer: 'Cisco',
    year: '2026',
    status: 'prog',
    color: 'blue',
  },
]

const STATUS_ICONS = {
  done:     <IconCheck size={10} strokeWidth={2.5} />,
  prog:     <IconRefresh size={10} strokeWidth={2.5} />,
  upcoming: <IconClock size={10} strokeWidth={2.5} />,
}

const ISSUER_LOGOS: Record<string, string> = {
  'amazon web services': '☁️', aws: '☁️', cisco: '🌐', google: '🎯',
  microsoft: '🪟', meta: '🔷', coursera: '📘', udemy: '🎓',
  simplilearn: '📊', ndg: '🐧',
}
function getIssuerEmoji(issuer: string) {
  const key = issuer.toLowerCase()
  for (const [match, emoji] of Object.entries(ISSUER_LOGOS)) {
    if (key.includes(match)) return emoji
  }
  return '🏅'
}

// ── Fullscreen image/PDF lightbox ─────────────────────────────────────────────
function Lightbox({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(4,4,10,0.97)' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between flex-shrink-0 px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: 13, color: 'var(--txt2)', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 'calc(100vw - 130px)' }}>
          {cert.name}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {cert.pdfUrl && (
            <a href={cert.pdfUrl} download
              style={{ fontSize: 11, color: '#00d4ff', fontFamily: 'var(--font-mono)', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.08)', textDecoration: 'none' }}>
              ↓ PDF
            </a>
          )}
          {cert.credentialUrl && (
            <a href={cert.credentialUrl} target="_blank" rel="noopener"
              style={{ fontSize: 11, color: '#00e599', fontFamily: 'var(--font-mono)', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(0,229,153,0.3)', background: 'rgba(0,229,153,0.08)', textDecoration: 'none' }}>
              Verify
            </a>
          )}
          <button onClick={onClose}
            style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--txt)', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <IconX size={16} />
          </button>
        </div>
      </div>
      {/* Image viewer — fills rest, pinch-zoomable */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        {cert.preview ? (
          <img src={cert.preview} alt={cert.name}
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 8, display: 'block' }} />
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <span style={{ fontSize: 56 }}>{getIssuerEmoji(cert.issuer)}</span>
            <p style={{ color: 'var(--txt2)', fontSize: 14 }}>No preview available</p>
            {cert.credentialUrl && (
              <a href={cert.credentialUrl} target="_blank" rel="noopener"
                style={{ color: '#00d4ff', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
                View credential online →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Cert card ─────────────────────────────────────────────────────────────────
function CertCard({ cert, index, onOpen }: { cert: Certification; index: number; onOpen: () => void }) {
  const col = COLOR_MAP[cert.color] || '#4f7fff'
  const st  = STATUS_CONFIG[cert.status]
  const hasPreview = !!cert.preview

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden"
      style={{ background: 'var(--bg2)', border: `1px solid ${col}20`, opacity: cert.status === 'upcoming' ? 0.72 : 1 }}
    >
      <div style={{ height: 3, background: `linear-gradient(90deg, ${col}, ${col}40, transparent)` }} />

      {/* Preview image — tappable on all devices */}
      {hasPreview ? (
        <div className="relative w-full overflow-hidden cursor-pointer" onClick={onOpen}
          style={{ background: `${col}06`, borderBottom: `1px solid ${col}15` }}>
          <img
            src={cert.preview}
            alt={cert.name}
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 420, objectFit: 'cover', objectPosition: 'top' }}
          />
          {/* Tap hint overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(0,0,0,0.35)' }}>
            <span style={{ color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.1em', background: 'rgba(0,0,0,0.6)', padding: '8px 16px', borderRadius: 8 }}>
              TAP TO EXPAND
            </span>
          </div>
          {/* Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
            style={{ background: 'rgba(4,4,10,0.75)', backdropFilter: 'blur(10px)', border: `1px solid ${col}30`, fontFamily: 'var(--font-mono)', fontSize: 9, color: col, letterSpacing: '.1em' }}>
            🖼 CERTIFICATE
          </div>
          {cert.credentialUrl && (
            <a href={cert.credentialUrl} target="_blank" rel="noopener" onClick={e => e.stopPropagation()}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
              style={{ background: 'rgba(4,4,10,0.75)', backdropFilter: 'blur(10px)', border: `1px solid ${col}30`, fontFamily: 'var(--font-mono)', fontSize: 9, color: col, letterSpacing: '.08em', textDecoration: 'none' }}>
              <IconShield size={9} /> Verify
            </a>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-10"
          style={{ background: `${col}05`, borderBottom: `1px solid ${col}10` }}>
          <div style={{ fontSize: 40 }}>{getIssuerEmoji(cert.issuer)}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--txt3)', letterSpacing: '.12em', textTransform: 'uppercase' }}>
            {cert.status === 'prog' ? 'In Progress' : 'Upcoming'}
          </div>
        </div>
      )}

      {/* Info */}
      <div style={{ padding: '24px 26px 28px' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-[.08em] ${st.colorClass}`}>
            {STATUS_ICONS[cert.status as keyof typeof STATUS_ICONS]}
            {st.label}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--txt3)' }}>{cert.year}</div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', color: col, textTransform: 'uppercase', marginBottom: 6 }}>
          {cert.issuer}
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', lineHeight: 1.2, marginBottom: cert.description ? 12 : 0 }}>
          {cert.name}
        </div>
        {cert.description && (
          <div style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.8 }}>{cert.description}</div>
        )}
        {(cert.credentialId || cert.credentialUrl) && (
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {cert.credentialId && (
              <div style={{ fontSize: 10, color: 'var(--txt3)', fontFamily: 'var(--font-mono)', letterSpacing: '.06em' }}>
                ID: {cert.credentialId}
              </div>
            )}
            {cert.credentialUrl && (
              <a href={cert.credentialUrl} target="_blank" rel="noopener"
                className="flex items-center gap-1 text-[10px] font-mono transition-opacity hover:opacity-80"
                style={{ color: col, letterSpacing: '.06em', textDecoration: 'none' }}>
                <IconExternalLink size={10} /> Verify Credential
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const [filter, setFilter] = useState<Filter>('all')
  const [lightbox, setLightbox] = useState<Certification | null>(null)

  const counts = {
    all:      CERTS.length,
    done:     CERTS.filter(c => c.status === 'done').length,
    prog:     CERTS.filter(c => c.status === 'prog').length,
    upcoming: CERTS.filter(c => c.status === 'upcoming').length,
  }
  const visible = CERTS.filter(c => filter === 'all' || c.status === filter)

  return (
    <section id="certifications" className="section max-w-7xl mx-auto px-6 md:px-10">
      <div ref={ref}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="section-eyebrow">Credentials</div>
            <h2 className="section-title">CERTIFICATIONS<br /><span className="gradient-text-blue">&amp; LEARNING.</span></h2>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-6 pb-1">
            {[
              { label: 'Earned',      count: counts.done,     col: '#00e599' },
              { label: 'In Progress', count: counts.prog,     col: '#ffaa00' },
              { label: 'Upcoming',    count: counts.upcoming, col: '#a78bfa' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div style={{ fontSize: 28, fontWeight: 800, color: s.col, fontFamily: 'var(--font-bebas)', letterSpacing: '.04em' }}>{s.count}</div>
                <div style={{ fontSize: 9, color: 'var(--txt3)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10">
          {(['all', 'done', 'prog', 'upcoming'] as Filter[]).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-[11px] font-mono tracking-[.08em] border transition-all duration-200 ${
                filter === f ? 'bg-white/8 border-white/15 text-white' : 'bg-transparent border-white/6 text-[var(--txt3)] hover:border-white/12 hover:text-[var(--txt2)]'
              }`}>
              {{ all: 'All', done: 'Completed', prog: 'In Progress', upcoming: 'Upcoming' }[f]}
              <span className="ml-2 px-1.5 py-0.5 rounded text-[9px]"
                style={{ background: filter === f ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)', color: filter === f ? '#00d4ff' : 'var(--txt3)' }}>
                {counts[f]}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="space-y-10">
          <AnimatePresence>
            {visible.map((c, i) => (
              <div key={c.id} className="w-full">
                <CertCard cert={c} index={i} onOpen={() => setLightbox(c)} />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && <Lightbox cert={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  )
}
