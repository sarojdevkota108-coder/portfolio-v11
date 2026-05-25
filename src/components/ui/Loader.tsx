'use client'
import { useEffect, useRef } from 'react'

export function Loader() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      ref.current?.classList.add('hidden')
      document.body.style.overflow = ''
    }, 2200)
    document.body.style.overflow = 'hidden'
    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={ref} className="loader" style={{ background: 'var(--loader-bg)' }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <span
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(56px,10vw,112px)',
            letterSpacing: '0.05em',
            color: 'transparent',
            WebkitTextStroke: '1px var(--line2)',
            display: 'block',
          }}
        >
          SAROJ DEVKOTA
        </span>
        <span
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(56px,10vw,112px)',
            letterSpacing: '0.05em',
            color: 'var(--txt)',
            position: 'absolute',
            left: 0,
            top: 0,
            clipPath: 'inset(0 100% 0 0)',
            animation: 'loaderReveal 1.5s cubic-bezier(0.77,0,0.18,1) forwards 0.3s',
            display: 'block',
          }}
        >
          SAROJ DEVKOTA
        </span>
      </div>

      <div
        style={{
          width: '200px',
          height: '1px',
          background: 'var(--line)',
          marginTop: '28px',
          overflow: 'hidden',
          borderRadius: '1px',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'var(--loader-bar)',
            width: '0',
            animation: 'loaderBar 1.6s ease forwards',
          }}
        />
      </div>

      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '.2em',
          color: 'var(--txt3)',
          marginTop: '16px',
          animation: 'fadeIn 0.5s ease forwards 0.8s',
          opacity: 0,
        }}
      >
        KATHMANDU · NEPAL
      </span>

      <style>{`
        @keyframes loaderReveal {
          to { clip-path: inset(0 0% 0 0); }
        }
        @keyframes loaderBar {
          to { width: 100%; }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
