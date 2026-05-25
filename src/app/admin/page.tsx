'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

// ── Types ────────────────────────────────────────────────────────────────────
interface Achievement {
  id: string
  category: string
  color: string
  title: string
  org: string
  year: string
  description: string
  tag: string
  icon: string
}

interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  status: 'done' | 'prog' | 'upcoming'
  color: string
  image?: string
  credentialUrl?: string
  credentialId?: string
  description?: string
}

interface VolunteerItem {
  id: string
  year: string
  title: string
  org: string
  description: string
  tag: string
  color: string
  icon: string
  image?: string
}

interface Metric {
  num: string
  suffix: string
  label: string
}

interface SkillItem {
  name: string
  level: number
}

interface SkillGroup {
  category: string
  color: string
  items: SkillItem[]
}

interface DB {
  hero: { name: string; tagline: string; bio: string }
  metrics: Metric[]
  achievements: Achievement[]
  certifications: Certification[]
  volunteer: VolunteerItem[]
  skills: SkillGroup[]
  marquee: string[]
}

// ── Constants ─────────────────────────────────────────────────────────────────
const COLORS = ['cyan', 'blue', 'green', 'amber', 'violet', 'rose']
const ICONS  = ['trophy', 'star', 'code', 'building', 'network', 'users', 'shield', 'heart', 'school', 'microphone', 'rocket', 'medal']
const CATEGORIES = ['Web Dev', 'Design', 'Network', 'Community', 'Award', 'Academic']
const STATUS_OPTS = [
  { value: 'done',     label: 'Completed' },
  { value: 'prog',     label: 'In Progress' },
  { value: 'upcoming', label: 'Upcoming' },
]

const COLOR_DOT: Record<string, string> = {
  cyan: '#00d4ff', blue: '#4f7fff', green: '#00e599',
  amber: '#ffaa00', violet: '#a78bfa', rose: '#ff6b8a',
}

// ── Helpers ───────────────────────────────────────────────────────────────────
async function apiFetch(section: string) {
  const res = await fetch(`/api/cms?section=${section}`)
  const json = await res.json()
  return json.data
}

async function apiMutate(section: string, action: string, payload?: unknown, id?: string) {
  const res = await fetch('/api/cms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ section, action, payload, id }),
  })
  return res.json()
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function Toast({ msg, type }: { msg: string; type: 'ok' | 'err' }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: type === 'ok' ? '#00e59920' : '#ff6b8a20',
      border: `1px solid ${type === 'ok' ? '#00e599' : '#ff6b8a'}`,
      color: type === 'ok' ? '#00e599' : '#ff6b8a',
      padding: '10px 20px', borderRadius: 10, fontFamily: 'monospace',
      fontSize: 13, backdropFilter: 'blur(8px)',
    }}>
      {type === 'ok' ? '✓' : '✗'} {msg}
    </div>
  )
}

function SectionHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 11, letterSpacing: '.12em', color: '#00d4ff', fontFamily: 'monospace', marginBottom: 4 }}>
        {sub}
      </div>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--txt)', letterSpacing: '.04em' }}>{title}</h2>
    </div>
  )
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14,
      padding: '20px 24px',
      ...style,
    }}>
      {children}
    </div>
  )
}

function Input({ label, value, onChange, type = 'text', placeholder = '' }:
  { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 11, color: '#8899bb', fontFamily: 'monospace', marginBottom: 6, letterSpacing: '.06em' }}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{
            width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '9px 13px', color: '#e0e8ff', fontSize: 13,
            fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box',
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '9px 13px', color: '#e0e8ff', fontSize: 13,
            fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box',
          }}
        />
      )}
    </div>
  )
}

function Select({ label, value, onChange, options }:
  { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 11, color: '#8899bb', fontFamily: 'monospace', marginBottom: 6, letterSpacing: '.06em' }}>
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', background: '#101828', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8, padding: '9px 13px', color: '#e0e8ff', fontSize: 13,
          fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box',
        }}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

function Btn({ children, onClick, variant = 'primary', small = false }:
  { children: React.ReactNode; onClick: () => void; variant?: 'primary' | 'danger' | 'ghost'; small?: boolean }) {
  const bg = variant === 'primary' ? 'rgba(79,127,255,0.15)' : variant === 'danger' ? 'rgba(255,107,138,0.12)' : 'rgba(255,255,255,0.05)'
  const border = variant === 'primary' ? 'rgba(79,127,255,0.4)' : variant === 'danger' ? 'rgba(255,107,138,0.3)' : 'rgba(255,255,255,0.1)'
  const color = variant === 'primary' ? '#4f7fff' : variant === 'danger' ? '#ff6b8a' : '#8899bb'
  return (
    <button
      onClick={onClick}
      style={{
        background: bg, border: `1px solid ${border}`, color, borderRadius: 8,
        padding: small ? '5px 12px' : '9px 18px', fontSize: small ? 11 : 13,
        fontFamily: 'monospace', cursor: 'pointer', letterSpacing: '.05em',
        transition: 'all .15s',
      }}
    >
      {children}
    </button>
  )
}

// ── SECTION: Achievements ──────────────────────────────────────────────────────
function AchievementsSection({ toast }: { toast: (m: string, t?: 'ok' | 'err') => void }) {
  const [items, setItems] = useState<Achievement[]>([])
  const [form, setForm] = useState<Partial<Achievement>>({ color: 'cyan', category: 'Award', icon: 'trophy' })
  const [editing, setEditing] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { apiFetch('achievements').then(d => { setItems(d || []); setLoading(false) }) }, [])

  const f = (k: keyof Achievement) => (v: string) => setForm(p => ({ ...p, [k]: v }))

  const save = async () => {
    if (!form.title?.trim()) return toast('Title is required', 'err')
    if (editing) {
      const res = await apiMutate('achievements', 'update', form, editing)
      setItems(res.data)
      setEditing(null)
    } else {
      const res = await apiMutate('achievements', 'add', form)
      setItems(res.data)
    }
    setForm({ color: 'cyan', category: 'Award', icon: 'trophy' })
    toast('Achievement saved!')
  }

  const del = async (id: string) => {
    const res = await apiMutate('achievements', 'delete', undefined, id)
    setItems(res.data)
    toast('Deleted')
  }

  const edit = (item: Achievement) => {
    setForm(item)
    setEditing(item.id)
  }

  return (
    <div>
      <SectionHeader title="Achievements" sub="PORTFOLIO › ACHIEVEMENTS" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Form */}
        <Card>
          <div style={{ fontSize: 12, color: '#8899bb', fontFamily: 'monospace', marginBottom: 16 }}>
            {editing ? '✏️  EDITING ACHIEVEMENT' : '＋ ADD ACHIEVEMENT'}
          </div>
          <Input label="TITLE *" value={form.title || ''} onChange={f('title')} placeholder="e.g. Best Web Dev Project" />
          <Input label="ORGANISATION" value={form.org || ''} onChange={f('org')} placeholder="e.g. University of Westminster" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input label="YEAR" value={form.year || ''} onChange={f('year')} placeholder="2024" />
            <Select label="CATEGORY" value={form.category || 'Award'} onChange={f('category')}
              options={CATEGORIES.map(c => ({ value: c, label: c }))} />
          </div>
          <Input label="DESCRIPTION" value={form.description || ''} onChange={f('description')} type="textarea" placeholder="What did you achieve?" />
          <Input label="TAG" value={form.tag || ''} onChange={f('tag')} placeholder="e.g. 1st Place" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Select label="COLOR" value={form.color || 'cyan'} onChange={f('color')}
              options={COLORS.map(c => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))} />
            <Select label="ICON" value={form.icon || 'trophy'} onChange={f('icon')}
              options={ICONS.map(i => ({ value: i, label: i }))} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <Btn onClick={save} variant="primary">{editing ? 'Update' : 'Add Achievement'}</Btn>
            {editing && <Btn onClick={() => { setEditing(null); setForm({ color: 'cyan', category: 'Award', icon: 'trophy' }) }} variant="ghost">Cancel</Btn>}
          </div>
        </Card>

        {/* List */}
        <div>
          {loading && <div style={{ color: '#8899bb', fontFamily: 'monospace', fontSize: 13 }}>Loading…</div>}
          {!loading && items.length === 0 && (
            <Card>
              <div style={{ textAlign: 'center', color: '#8899bb', fontFamily: 'monospace', fontSize: 13, padding: '20px 0' }}>
                No achievements yet. Add your first one!
              </div>
            </Card>
          )}
          {items.map(item => (
            <Card key={item.id} style={{ marginBottom: 12, borderLeft: `3px solid ${COLOR_DOT[item.color] || '#4f7fff'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#e0e8ff', marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#8899bb', fontFamily: 'monospace' }}>{item.org} · {item.year}</div>
                  {item.tag && <div style={{ marginTop: 6, fontSize: 11, color: COLOR_DOT[item.color], fontFamily: 'monospace' }}>{item.tag}</div>}
                </div>
                <div style={{ display: 'flex', gap: 8, marginLeft: 12, flexShrink: 0 }}>
                  <Btn onClick={() => edit(item)} variant="ghost" small>Edit</Btn>
                  <Btn onClick={() => del(item.id)} variant="danger" small>Del</Btn>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── SECTION: Certifications ────────────────────────────────────────────────────
function CertificationsSection({ toast }: { toast: (m: string, t?: 'ok' | 'err') => void }) {
  const [items, setItems]         = useState<Certification[]>([])
  const [form, setForm]           = useState<Partial<Certification>>({ color: 'blue', status: 'done' })
  const [editing, setEditing]     = useState<string | null>(null)
  const [uploading, setUploading] = useState<string | null>(null)
  const [showForm, setShowForm]   = useState(false)

  useEffect(() => { apiFetch('certifications').then(d => setItems(d || [])) }, [])

  const f = (k: keyof Certification) => (v: string) => setForm(p => ({ ...p, [k]: v }))

  const save = async () => {
    if (!form.name?.trim()) return toast('Name is required', 'err')
    if (editing) {
      const res = await apiMutate('certifications', 'update', form, editing)
      setItems(res.data); setEditing(null)
    } else {
      const res = await apiMutate('certifications', 'add', form)
      setItems(res.data)
    }
    setForm({ color: 'blue', status: 'done' })
    setShowForm(false)
    toast('Certification saved!')
  }

  const del = async (id: string) => {
    if (!confirm('Delete this certificate?')) return
    const res = await apiMutate('certifications', 'delete', undefined, id)
    setItems(res.data); toast('Deleted')
  }

  const uploadFile = async (certId: string, file: File) => {
    setUploading(certId)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('certId', certId)
      const res  = await fetch('/api/cms', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        setItems(prev => prev.map(i => i.id === certId ? { ...i, image: data.path } : i))
        toast('File uploaded! Visible on website now.')
      } else {
        toast(data.error || 'Upload failed', 'err')
      }
    } catch {
      toast('Upload failed', 'err')
    } finally {
      setUploading(null)
    }
  }

  const startEdit = (item: Certification) => {
    setForm(item)
    setEditing(item.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditing(null)
    setForm({ color: 'blue', status: 'done' })
    setShowForm(false)
  }

  const STATUS_COLORS: Record<string, string> = { done: '#00e599', prog: '#ffaa00', upcoming: '#a78bfa' }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <SectionHeader title="Certifications" sub="PORTFOLIO › CERTIFICATIONS" />
        {!showForm && (
          <Btn onClick={() => setShowForm(true)} variant="primary">＋ Add Certificate</Btn>
        )}
      </div>

      {/* ── Add / Edit form ── */}
      {showForm && (
        <Card style={{ marginBottom: 32, borderColor: editing ? 'rgba(255,170,0,0.3)' : 'rgba(0,212,255,0.2)' }}>
          <div style={{ fontSize: 12, color: editing ? '#ffaa00' : '#00d4ff', fontFamily: 'monospace', marginBottom: 20, letterSpacing: '.08em' }}>
            {editing ? '✏️  EDITING CERTIFICATE' : '＋ NEW CERTIFICATE'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
            <Input label="CERTIFICATE NAME *" value={form.name || ''} onChange={f('name')} placeholder="e.g. AWS Solutions Architect" />
            <Input label="ISSUER *" value={form.issuer || ''} onChange={f('issuer')} placeholder="e.g. Amazon Web Services" />
            <Input label="YEAR" value={form.year || ''} onChange={f('year')} placeholder="2025" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
            <Select label="STATUS" value={form.status || 'done'} onChange={f('status')} options={STATUS_OPTS} />
            <Select label="COLOR" value={form.color || 'blue'} onChange={f('color')}
              options={COLORS.map(c => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))} />
            <Input label="CREDENTIAL ID" value={form.credentialId || ''} onChange={f('credentialId')} placeholder="ABC-123" />
            <Input label="VERIFY URL" value={form.credentialUrl || ''} onChange={f('credentialUrl')} placeholder="https://..." />
          </div>

          <Input label="DESCRIPTION" value={form.description || ''} onChange={f('description')} type="textarea"
            placeholder="What this certification covers..." />

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <Btn onClick={save} variant="primary">{editing ? 'Save Changes' : 'Add Certificate'}</Btn>
            <Btn onClick={cancelEdit} variant="ghost">Cancel</Btn>
          </div>
        </Card>
      )}

      {/* ── Certificate list ── */}
      <div style={{ fontSize: 11, color: '#556070', fontFamily: 'monospace', marginBottom: 16, letterSpacing: '.1em' }}>
        {items.length} CERTIFICATE{items.length !== 1 ? 'S' : ''} — HOVER TO UPLOAD FILE
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map(item => {
          const col     = COLOR_DOT[item.color] || '#4f7fff'
          const isPDF   = item.image?.endsWith('.pdf')
          const hasFile = !!item.image
          const isUploading = uploading === item.id

          return (
            <div
              key={item.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '260px 1fr auto',
                gap: 0,
                borderRadius: 14,
                overflow: 'hidden',
                border: `1px solid rgba(255,255,255,0.07)`,
                borderLeft: `3px solid ${col}`,
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              {/* LEFT — file upload zone */}
              <div
                style={{
                  position: 'relative',
                  background: `${col}08`,
                  borderRight: `1px solid rgba(255,255,255,0.06)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 110,
                  overflow: 'hidden',
                }}
              >
                {/* Current file preview */}
                {hasFile && !isPDF && (
                  <img src={item.image} alt={item.name}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
                {hasFile && isPDF && (
                  <div style={{ textAlign: 'center', zIndex: 1 }}>
                    <div style={{ fontSize: 26 }}>📄</div>
                    <div style={{ fontSize: 9, color: col, fontFamily: 'monospace', marginTop: 4 }}>PDF UPLOADED</div>
                  </div>
                )}
                {!hasFile && (
                  <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.15)', zIndex: 1 }}>
                    <div style={{ fontSize: 26 }}>📁</div>
                    <div style={{ fontSize: 9, fontFamily: 'monospace', marginTop: 4, letterSpacing: '.06em' }}>NO FILE YET</div>
                  </div>
                )}

                {/* Upload hover overlay */}
                <label
                  style={{
                    position: 'absolute', inset: 0, zIndex: 2,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 4,
                    background: isUploading ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0)',
                    backdropFilter: 'blur(0px)',
                    cursor: isUploading ? 'wait' : 'pointer',
                    transition: 'all .2s',
                  }}
                  onMouseEnter={e => {
                    if (!isUploading) {
                      e.currentTarget.style.background = 'rgba(0,0,0,0.75)'
                      e.currentTarget.style.backdropFilter = 'blur(6px)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isUploading) {
                      e.currentTarget.style.background = 'rgba(0,0,0,0)'
                      e.currentTarget.style.backdropFilter = 'blur(0px)'
                    }
                  }}
                >
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                    style={{ display: 'none' }}
                    disabled={isUploading}
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) uploadFile(item.id, file)
                      e.target.value = ''
                    }}
                  />
                  {isUploading ? (
                    <div style={{ fontSize: 11, color: '#00d4ff', fontFamily: 'monospace', textAlign: 'center' }}>
                      <div style={{ fontSize: 20, marginBottom: 4 }}>⏳</div>
                      Uploading…
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: 18 }}>📤</div>
                      <div style={{ fontSize: 10, color: '#00d4ff', fontFamily: 'monospace', letterSpacing: '.06em', textAlign: 'center' }}>
                        {hasFile ? 'REPLACE FILE' : 'UPLOAD FILE'}
                      </div>
                      <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)' }}>JPG · PNG · PDF</div>
                    </>
                  )}
                </label>
              </div>

              {/* MIDDLE — cert info */}
              <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 9, fontFamily: 'monospace', color: STATUS_COLORS[item.status], letterSpacing: '.08em' }}>
                    ● {STATUS_OPTS.find(s => s.value === item.status)?.label}
                  </span>
                  <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#334455' }}>·</span>
                  <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#556070' }}>{item.year}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#dde8ff', lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: col, fontFamily: 'monospace', letterSpacing: '.06em' }}>{item.issuer}</div>
                {item.description && (
                  <div style={{ fontSize: 11, color: '#6070a0', marginTop: 4, lineHeight: 1.5 }}>{item.description}</div>
                )}
                {item.credentialId && (
                  <div style={{ fontSize: 9, color: '#3a4a6a', fontFamily: 'monospace', marginTop: 2 }}>ID: {item.credentialId}</div>
                )}
                {/* File status badge */}
                <div style={{ marginTop: 6 }}>
                  {hasFile ? (
                    <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#00e599', letterSpacing: '.06em' }}>
                      ✓ FILE UPLOADED — visible on website
                    </span>
                  ) : (
                    <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#ff6b8a', letterSpacing: '.06em' }}>
                      ✗ NO FILE — hover left panel to upload
                    </span>
                  )}
                </div>
              </div>

              {/* RIGHT — actions */}
              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 8, borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                <Btn onClick={() => startEdit(item)} variant="ghost" small>Edit</Btn>
                <Btn onClick={() => del(item.id)} variant="danger" small>Delete</Btn>
              </div>
            </div>
          )
        })}
      </div>

      {items.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          border: '1px dashed rgba(255,255,255,0.08)', borderRadius: 14,
          color: '#334455', fontFamily: 'monospace', fontSize: 13,
        }}>
          No certificates yet. Click "Add Certificate" to get started.
        </div>
      )}
    </div>
  )
}

// ── SECTION: Volunteer ────────────────────────────────────────────────────────
function VolunteerSection({ toast }: { toast: (m: string, t?: 'ok' | 'err') => void }) {
  const [items, setItems] = useState<VolunteerItem[]>([])
  const [form, setForm] = useState<Partial<VolunteerItem>>({ color: 'cyan', icon: 'heart' })
  const [editing, setEditing] = useState<string | null>(null)
  const [uploading, setUploading] = useState<string | null>(null)

  useEffect(() => { apiFetch('volunteer').then(d => setItems(d || [])) }, [])

  const f = (k: keyof VolunteerItem) => (v: string) => setForm(p => ({ ...p, [k]: v }))

  const save = async () => {
    if (!form.title?.trim()) return toast('Title is required', 'err')
    if (editing) {
      const res = await apiMutate('volunteer', 'update', form, editing)
      setItems(res.data); setEditing(null)
    } else {
      const res = await apiMutate('volunteer', 'add', form)
      setItems(res.data)
    }
    setForm({ color: 'cyan', icon: 'heart' })
    toast('Volunteer item saved!')
  }

  const del = async (id: string) => {
    const res = await apiMutate('volunteer', 'delete', undefined, id)
    setItems(res.data); toast('Deleted')
  }

  const uploadFile = async (itemId: string, file: File) => {
    setUploading(itemId)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('itemId', itemId)
    fd.append('section', 'volunteer')
    try {
      const res = await fetch('/api/cms', { method: 'POST', body: fd })
      const json = await res.json()
      if (json.success) {
        setItems(prev => prev.map(it => it.id === itemId ? { ...it, image: json.path } : it))
        toast('Certificate uploaded! Visible on website now.')
      } else {
        toast(json.error || 'Upload failed', 'err')
      }
    } catch {
      toast('Upload error', 'err')
    }
    setUploading(null)
  }

  return (
    <div>
      <SectionHeader title="Volunteer Work" sub="PORTFOLIO › VOLUNTEER" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card>
          <div style={{ fontSize: 12, color: '#8899bb', fontFamily: 'monospace', marginBottom: 16 }}>
            {editing ? '✏️  EDITING' : '＋ ADD VOLUNTEER ITEM'}
          </div>
          <Input label="TITLE *" value={form.title || ''} onChange={f('title')} placeholder="e.g. Community Tech Trainer" />
          <Input label="ORGANISATION" value={form.org || ''} onChange={f('org')} placeholder="e.g. Local NGO" />
          <Input label="YEAR" value={form.year || ''} onChange={f('year')} placeholder="2023 or 2022–Present" />
          <Input label="DESCRIPTION" value={form.description || ''} onChange={f('description')} type="textarea" />
          <Input label="TAG" value={form.tag || ''} onChange={f('tag')} placeholder="e.g. 50+ people helped" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Select label="COLOR" value={form.color || 'cyan'} onChange={f('color')}
              options={COLORS.map(c => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))} />
            <Select label="ICON" value={form.icon || 'heart'} onChange={f('icon')}
              options={ICONS.map(i => ({ value: i, label: i }))} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <Btn onClick={save} variant="primary">{editing ? 'Update' : 'Add Item'}</Btn>
            {editing && <Btn onClick={() => { setEditing(null); setForm({ color: 'cyan', icon: 'heart' }) }} variant="ghost">Cancel</Btn>}
          </div>
        </Card>

        <div style={{ maxHeight: 600, overflowY: 'auto' }}>
          {items.map(item => {
            const c = COLOR_DOT[item.color] || '#00d4ff'
            const isUploading = uploading === item.id
            return (
              <Card key={item.id} style={{ marginBottom: 14, borderLeft: `3px solid ${c}`, padding: 0, overflow: 'hidden' }}>
                {/* File upload zone */}
                <div
                  style={{
                    background: item.image ? `${c}08` : '#0a0a15',
                    borderBottom: `1px solid ${c}20`,
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}
                >
                  <div style={{ fontSize: 11, color: item.image ? c : '#445566', fontFamily: 'monospace' }}>
                    {item.image ? `✅ ${item.image.split('/').pop()}` : '📎 No certificate uploaded'}
                  </div>
                  <label style={{
                    cursor: 'pointer',
                    fontSize: 10,
                    fontFamily: 'monospace',
                    padding: '4px 10px',
                    borderRadius: 6,
                    border: `1px solid ${c}40`,
                    color: c,
                    background: `${c}10`,
                    whiteSpace: 'nowrap',
                    opacity: isUploading ? 0.5 : 1,
                  }}>
                    {isUploading ? 'Uploading…' : '⬆ Upload Certificate'}
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf,.webp"
                      style={{ display: 'none' }}
                      disabled={isUploading}
                      onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) uploadFile(item.id, file)
                      }}
                    />
                  </label>
                </div>
                {/* Info row */}
                <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#e0e8ff' }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: '#8899bb', fontFamily: 'monospace', marginTop: 2 }}>{item.org} · {item.year}</div>
                    {item.tag && <div style={{ fontSize: 11, color: c, fontFamily: 'monospace', marginTop: 4 }}>{item.tag}</div>}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
                    <Btn onClick={() => { setForm(item); setEditing(item.id) }} variant="ghost" small>Edit</Btn>
                    <Btn onClick={() => del(item.id)} variant="danger" small>Del</Btn>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── SECTION: Hero / About ─────────────────────────────────────────────────────
function HeroSection({ toast }: { toast: (m: string, t?: 'ok' | 'err') => void }) {
  const [hero, setHero] = useState({ name: '', tagline: '', bio: '' })
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([apiFetch('hero'), apiFetch('metrics')]).then(([h, m]) => {
      setHero(h || { name: '', tagline: '', bio: '' })
      setMetrics(m || [])
      setLoading(false)
    })
  }, [])

  const saveHero = async () => {
    await apiMutate('hero', 'update', hero)
    toast('Hero section saved!')
  }

  const saveMetric = async (i: number) => {
    const updated = [...metrics]
    const res = await apiMutate('metrics', 'reorder', updated)
    setMetrics(res.data)
    toast('Metrics saved!')
  }

  const updateMetric = (i: number, k: keyof Metric, v: string) => {
    const updated = [...metrics]
    updated[i] = { ...updated[i], [k]: v }
    setMetrics(updated)
  }

  if (loading) return <div style={{ color: '#8899bb', fontFamily: 'monospace' }}>Loading…</div>

  return (
    <div>
      <SectionHeader title="Hero & About" sub="PORTFOLIO › HERO SECTION" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card>
          <div style={{ fontSize: 12, color: '#8899bb', fontFamily: 'monospace', marginBottom: 16 }}>HERO TEXT</div>
          <Input label="YOUR NAME" value={hero.name} onChange={v => setHero(p => ({ ...p, name: v }))} />
          <Input label="TAGLINE" value={hero.tagline} onChange={v => setHero(p => ({ ...p, tagline: v }))} />
          <Input label="BIO / ABOUT" value={hero.bio} onChange={v => setHero(p => ({ ...p, bio: v }))} type="textarea" />
          <Btn onClick={saveHero} variant="primary">Save Hero</Btn>
        </Card>

        <Card>
          <div style={{ fontSize: 12, color: '#8899bb', fontFamily: 'monospace', marginBottom: 16 }}>HERO METRICS</div>
          {metrics.map((m, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: 8, marginBottom: 10 }}>
              <Input label={i === 0 ? 'NUMBER' : ''} value={m.num} onChange={v => updateMetric(i, 'num', v)} placeholder="10" />
              <Input label={i === 0 ? 'SUFFIX' : ''} value={m.suffix} onChange={v => updateMetric(i, 'suffix', v)} placeholder="+" />
              <Input label={i === 0 ? 'LABEL' : ''} value={m.label} onChange={v => updateMetric(i, 'label', v)} placeholder="Projects" />
            </div>
          ))}
          <Btn onClick={() => saveMetric(0)} variant="primary">Save Metrics</Btn>
        </Card>
      </div>
    </div>
  )
}

// ── SECTION: Skills ────────────────────────────────────────────────────────────
function SkillsSection({ toast }: { toast: (m: string, t?: 'ok' | 'err') => void }) {
  const [groups, setGroups] = useState<SkillGroup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { apiFetch('skills').then(d => { setGroups(d || []); setLoading(false) }) }, [])

  const updateSkill = (gi: number, si: number, k: keyof SkillItem, v: string) => {
    const g = [...groups]
    g[gi].items[si] = { ...g[gi].items[si], [k]: k === 'level' ? Math.min(100, Math.max(0, parseInt(v) || 0)) : v }
    setGroups(g)
  }

  const addSkill = (gi: number) => {
    const g = [...groups]
    g[gi].items.push({ name: 'New Skill', level: 70 })
    setGroups(g)
  }

  const removeSkill = (gi: number, si: number) => {
    const g = [...groups]
    g[gi].items.splice(si, 1)
    setGroups(g)
  }

  const save = async () => {
    await apiMutate('skills', 'reorder', groups)
    toast('Skills saved!')
  }

  if (loading) return <div style={{ color: '#8899bb', fontFamily: 'monospace' }}>Loading…</div>

  return (
    <div>
      <SectionHeader title="Skills Matrix" sub="PORTFOLIO › SKILLS" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {groups.map((group, gi) => (
          <Card key={gi} style={{ borderTop: `2px solid ${COLOR_DOT[group.color] || '#4f7fff'}` }}>
            <div style={{ fontSize: 12, color: COLOR_DOT[group.color], fontFamily: 'monospace', marginBottom: 14, fontWeight: 600 }}>
              {group.category.toUpperCase()}
            </div>
            {group.items.map((skill, si) => (
              <div key={si} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 30px', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <input
                  value={skill.name}
                  onChange={e => updateSkill(gi, si, 'name', e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 6, padding: '6px 10px', color: '#e0e8ff', fontSize: 12, fontFamily: 'monospace', outline: 'none',
                  }}
                />
                <input
                  type="number" min={0} max={100}
                  value={skill.level}
                  onChange={e => updateSkill(gi, si, 'level', e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 6, padding: '6px 8px', color: '#e0e8ff', fontSize: 12, fontFamily: 'monospace',
                    outline: 'none', textAlign: 'center',
                  }}
                />
                <button
                  onClick={() => removeSkill(gi, si)}
                  style={{ background: 'none', border: 'none', color: '#ff6b8a', cursor: 'pointer', fontSize: 16, padding: 0 }}
                >×</button>
              </div>
            ))}
            <Btn onClick={() => addSkill(gi)} variant="ghost" small>+ Add Skill</Btn>
          </Card>
        ))}
      </div>
      <Btn onClick={save} variant="primary">Save All Skills</Btn>
    </div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'hero',    label: 'Hero & About',   icon: '🏠' },
  { id: 'achievements', label: 'Achievements', icon: '🏆' },
  { id: 'certifications', label: 'Certifications', icon: '📜' },
  { id: 'volunteer', label: 'Volunteer',     icon: '🤝' },
  { id: 'skills',  label: 'Skills',          icon: '⚡' },
]

export default function AdminPage() {
  const [tab, setTab] = useState('achievements')
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null)

  const showToast = useCallback((msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #060b14 0%, #0a1020 50%, #060b14 100%)',
      color: '#e0e8ff',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
    }}>
      {/* Sidebar */}
      <div style={{
        width: 220, flexShrink: 0,
        background: 'rgba(255,255,255,0.02)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 0',
        position: 'sticky', top: 0, height: '100vh',
      }}>
        <div style={{ padding: '0 20px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 10, letterSpacing: '.14em', color: '#4f7fff', fontFamily: 'monospace', marginBottom: 4 }}>
            SAROJ PORTFOLIO
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)' }}>CMS Admin</div>
        </div>
        <nav style={{ padding: '20px 12px' }}>
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              style={{
                width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 8,
                background: tab === n.id ? 'rgba(79,127,255,0.12)' : 'transparent',
                border: tab === n.id ? '1px solid rgba(79,127,255,0.2)' : '1px solid transparent',
                color: tab === n.id ? '#4f7fff' : '#8899bb',
                cursor: 'pointer', fontFamily: 'monospace', fontSize: 12,
                display: 'flex', alignItems: 'center', gap: 10,
                marginBottom: 4, transition: 'all .15s',
                letterSpacing: '.04em',
              }}
            >
              <span>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>

        <div style={{ padding: '20px', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <a
            href="/"
            style={{
              display: 'block', textAlign: 'center', padding: '8px 12px',
              background: 'rgba(0,229,153,0.08)', border: '1px solid rgba(0,229,153,0.2)',
              color: '#00e599', borderRadius: 8, fontFamily: 'monospace',
              fontSize: 11, textDecoration: 'none', letterSpacing: '.06em',
            }}
          >
            ← VIEW PORTFOLIO
          </a>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
        {tab === 'hero'           && <HeroSection toast={showToast} />}
        {tab === 'achievements'   && <AchievementsSection toast={showToast} />}
        {tab === 'certifications' && <CertificationsSection toast={showToast} />}
        {tab === 'volunteer'      && <VolunteerSection toast={showToast} />}
        {tab === 'skills'         && <SkillsSection toast={showToast} />}
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  )
}
