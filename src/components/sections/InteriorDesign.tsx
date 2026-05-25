'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Render images extracted from PDFs — sharp JPEGs, work on all devices
const RENDER_BASE = '/images/interior/renders'

// Individual render page viewer — uses pre-extracted JPEG images, NOT iframes
// This solves the mobile PDF zoom problem: <img> tags are pinch-zoomable,
// load instantly, and look crisp on every device
function FloorViewer({ floor, activePage, setActivePage }: {
  floor: { id: string; label: string; style: string; pageCount: number }
  activePage: number
  setActivePage: (n: number) => void
}) {
  // Touch swipe state
  const touchStartX = useRef(0)

  const prev = () => setActivePage(Math.max(1, activePage - 1))
  const next = () => setActivePage(Math.min(floor.pageCount, activePage + 1))

  const imgSrc = `${RENDER_BASE}/${floor.id}_${activePage}.jpg`

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0a0a14' }}
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (dx > 50) prev()
          else if (dx < -50) next()
        }}
      >
        {/* Aspect-ratio box so layout doesn't shift while image loads */}
        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={`${floor.id}-${activePage}`}
              src={imgSrc}
              alt={`${floor.label} render ${activePage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </AnimatePresence>

          {/* Floor badge */}
          <div
            className="absolute top-3 left-3 px-3 py-1.5 rounded-lg"
            style={{
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              color: '#00e599', letterSpacing: '.06em',
            }}
          >
            {floor.label} · {activePage}/{floor.pageCount}
          </div>

          {/* Style badge */}
          <div
            className="absolute top-3 right-3 px-3 py-1.5 rounded-lg hidden sm:block"
            style={{
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: 'var(--txt3)', letterSpacing: '.08em', textTransform: 'uppercase',
            }}
          >
            {floor.style}
          </div>

          {/* Prev / Next arrow buttons */}
          {activePage > 1 && (
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-opacity hover:opacity-90"
              style={{
                width: 36, height: 36,
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', fontSize: 18, cursor: 'pointer',
              }}
            >‹</button>
          )}
          {activePage < floor.pageCount && (
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-opacity hover:opacity-90"
              style={{
                width: 36, height: 36,
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', fontSize: 18, cursor: 'pointer',
              }}
            >›</button>
          )}

          {/* Swipe hint — mobile only, shown only on first page */}
          {activePage === 1 && floor.pageCount > 1 && (
            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:hidden px-3 py-1 rounded-full"
              style={{
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                fontFamily: 'var(--font-mono)', fontSize: 10,
                color: 'rgba(255,255,255,0.5)', letterSpacing: '.06em',
                pointerEvents: 'none',
              }}
            >
              ← swipe to browse →
            </div>
          )}
        </div>
      </div>

      {/* Slide hint label */}
      <div style={{
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '.14em',
        color: 'var(--txt3)',
        textTransform: 'uppercase',
        marginBottom: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}>
        <span style={{ display: 'inline-block', animation: 'nudgeLeft 1.6s ease-in-out infinite' }}>‹</span>
        Slide to view new room
        <span style={{ display: 'inline-block', animation: 'nudgeRight 1.6s ease-in-out infinite' }}>›</span>
        <style>{`
          @keyframes nudgeLeft  { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-4px)} }
          @keyframes nudgeRight { 0%,100%{transform:translateX(0)} 50%{transform:translateX(4px)} }
        `}</style>
      </div>

      {/* Dot navigation */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: floor.pageCount }, (_, i) => i + 1).map(n => (
          <button
            key={n}
            onClick={() => setActivePage(n)}
            style={{ cursor: 'pointer', padding: '8px 4px', minHeight: '44px', display: 'flex', alignItems: 'center' }}
          >
            <div
              style={{
                width: n === activePage ? 24 : 8, height: 8,
                borderRadius: 999,
                background: n === activePage ? '#00e599' : 'rgba(255,255,255,0.12)',
                transition: 'all .25s ease',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

// Floor data
const FLOORS = [
  {
    id: 'ground',
    label: 'Ground Floor',
    shortLabel: 'GF',
    rooms: ['Living Room', 'Kitchen & Dining', 'Entry Hall', 'Staircase Foyer'],
    description: 'Grand open-plan social living — an expansive living room with luxury chandelier and custom TV wall, open-plan kitchen with navy-blue cabinetry and marble countertops, and a dramatic staircase foyer featuring traditional carved doors and a golden Buddha accent.',
    palette: ['#C8A882', '#F5F0E8', '#2C2C2C', '#8B7355'],
    paletteNames: ['Warm Oak', 'Cream White', 'Charcoal', 'Walnut'],
    highlights: [
      'Multi-tier crystal chandelier centrepiece',
      'Custom wood-slat TV feature wall',
      'Navy & marble open-plan kitchen',
      'Traditional carved entry doors',
      'Curved staircase with wrought-iron railings',
      'White marble tile flooring throughout',
    ],
    pageCount: 7,
    style: 'Contemporary Luxury',
  },
  {
    id: 'first',
    label: 'First Floor',
    shortLabel: 'F1',
    rooms: ['Master Bedroom', 'Bedroom 2', 'Family Lounge', 'Study Area'],
    description: 'A floor of refined personal spaces — the master bedroom in warm taupe with gold pendant lights and slatted feature wall, two additional bedrooms in bold navy-blue and sage-green palettes, plus a stylish family lounge with panel moulding and teal velvet seating.',
    palette: ['#D4B896', '#4A7B9D', '#6B8F6B', '#E8DDD0'],
    paletteNames: ['Taupe', 'Navy Blue', 'Sage Green', 'Ivory'],
    highlights: [
      'Warm taupe master bedroom with gold accents',
      'Bold navy accent wall with fluted panelling',
      'Sage green bedroom with walk-in wardrobe',
      'Elegant family lounge with panel moulding',
      'Integrated study desks and open shelving',
      'LED cove lighting throughout',
    ],
    pageCount: 7,
    style: 'Modern Transitional',
  },
  {
    id: 'second',
    label: 'Second Floor',
    shortLabel: 'F2',
    rooms: ['Bedroom Suite A', 'Bedroom Suite B', 'Study Room', 'Private Lounge'],
    description: 'Serene upper-floor suites with a lighter, airy aesthetic — two well-appointed bedrooms in soft grey and warm cream tones, complete with built-in wardrobes, open bookshelves, and generous natural light from floor-to-ceiling windows.',
    palette: ['#C0B0A0', '#E8E4E0', '#8A8A9A', '#D4CFC8'],
    paletteNames: ['Greige', 'Soft White', 'Cool Grey', 'Sand'],
    highlights: [
      'Soft grey tones with wood accent panels',
      'Integrated wardrobe-to-ceiling storage',
      'Open study nook with built-in shelves',
      'Floor-to-ceiling sheer curtain windows',
      'Upholstered platform bed with bench end',
      'Layered lighting: recessed + LED cove',
    ],
    pageCount: 7,
    style: 'Soft Contemporary',
  },
]

export function InteriorDesign() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const [activeFloor, setActiveFloor] = useState(0)
  const [activePage, setActivePage] = useState(1)

  const floor = FLOORS[activeFloor]

  const switchFloor = (i: number) => {
    setActiveFloor(i)
    setActivePage(1)
  }

  return (
    <section id="design" className="section max-w-7xl mx-auto px-6 md:px-10">
      <div ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">Interior Design</div>
          <h2 className="section-title">
            SPATIAL<br />
            <span className="gradient-text-green">ARCHITECTURE.</span>
          </h2>
          <p className="section-desc">
            Contemporary luxury residential project spanning three floors — full 3D visualization renders,
            material palette curation, and smart space planning.
          </p>
        </motion.div>

        {/* Floor tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex gap-3 mb-8 flex-wrap"
        >
          {FLOORS.map((f, i) => (
            <button
              key={f.id}
              onClick={() => switchFloor(i)}
              style={{ cursor: 'pointer', minHeight: '52px' }}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 ${
                i === activeFloor
                  ? 'border-[#00e599]/40 bg-[rgba(0,229,153,0.07)]'
                  : 'border-white/5 bg-[var(--bg2)] hover:border-white/10'
              }`}
            >
              <span
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '22px',
                  letterSpacing: '.04em',
                  color: i === activeFloor ? '#00e599' : 'var(--txt3)',
                  lineHeight: 1,
                  transition: 'color .3s',
                }}
              >
                {f.shortLabel}
              </span>
              <div className="text-left">
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '.1em',
                    color: i === activeFloor ? '#00e599' : 'var(--txt3)',
                    textTransform: 'uppercase',
                    transition: 'color .3s',
                  }}
                >
                  {f.label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--txt3)', letterSpacing: '.06em' }}>
                  {f.pageCount} renders
                </div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Main content area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFloor}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* Left: PDF viewer — takes 2 cols */}
            <div className="md:col-span-2">
              <FloorViewer
                floor={floor}
                activePage={activePage}
                setActivePage={setActivePage}
              />
            </div>

            {/* Right: Info panel */}
            <div className="flex flex-col gap-4">
              {/* Description */}
              <div className="card" style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '10px',
                    letterSpacing: '.14em', color: '#00e599',
                    marginBottom: '10px', textTransform: 'uppercase',
                  }}
                >
                  Space Brief
                </div>
                <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.8, marginBottom: '16px' }}>
                  {floor.description}
                </p>

                {/* Rooms */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '10px',
                    letterSpacing: '.12em', color: 'var(--txt3)',
                    marginBottom: '8px', textTransform: 'uppercase',
                  }}
                >
                  Spaces
                </div>
                <div className="flex flex-wrap gap-2">
                  {floor.rooms.map(r => (
                    <span key={r} className="tag tag-green" style={{ fontSize: '11px' }}>{r}</span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="card">
                <div
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '10px',
                    letterSpacing: '.12em', color: 'var(--txt3)',
                    marginBottom: '10px', textTransform: 'uppercase',
                  }}
                >
                  Design Highlights
                </div>
                <ul className="space-y-2">
                  {floor.highlights.map(h => (
                    <li key={h} className="flex items-start gap-2" style={{ fontSize: '12px', color: 'var(--txt2)' }}>
                      <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#00e599' }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Material palette */}
              <div className="card">
                <div
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '10px',
                    letterSpacing: '.14em', color: 'var(--txt3)',
                    marginBottom: '12px', textTransform: 'uppercase',
                  }}
                >
                  Material Palette
                </div>
                <div className="flex gap-3">
                  {floor.palette.map((c, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                      <div
                        className="w-full rounded-lg border"
                        style={{ height: 36, background: c, borderColor: 'rgba(255,255,255,0.1)' }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)', fontSize: '8px',
                          color: 'var(--txt3)', letterSpacing: '.04em', textAlign: 'center',
                        }}
                      >
                        {floor.paletteNames[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Project stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Renders', value: '21' },
            { label: 'Floors Designed', value: '3' },
            { label: 'Rooms', value: '10' },
            { label: 'Design Style', value: 'Modern' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-xl p-4 text-center"
              style={{ background: 'var(--bg2)', border: '1px solid var(--line)' }}
            >
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px', color: '#00e599', letterSpacing: '.03em', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '.12em', color: 'var(--txt3)', textTransform: 'uppercase', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
