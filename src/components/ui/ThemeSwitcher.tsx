'use client'
import { useState, useEffect } from 'react'
import { useTheme, Theme } from '@/context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

const THEMES: { id: Theme; label: string; icon: string; desc: string }[] = [
  { id: 'colorful',   label: 'Colorful',   icon: '✦', desc: 'Vibrant Futuristic' },
  { id: 'dark-gold',  label: 'Dark Gold',  icon: '◆', desc: 'Luxury Dark'        },
  { id: 'light-gold', label: 'Light Gold', icon: '◇', desc: 'Elegant Light'      },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const active = THEMES.find(t => t.id === theme) ?? THEMES[0]

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '24px',
        zIndex: 9995,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
      }}
    >
      {/* Theme options panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'var(--switcher-bg)',
              border: '1px solid var(--switcher-border)',
              borderRadius: '16px',
              padding: '8px',
              boxShadow: 'var(--switcher-shadow)',
              backdropFilter: 'blur(20px)',
              minWidth: '180px',
            }}
          >
            {THEMES.map((t, i) => {
              const isActive = t.id === theme
              return (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => { setTheme(t.id); setOpen(false) }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    background: isActive ? 'var(--switcher-active-bg)' : 'transparent',
                    transition: 'background 0.18s',
                    textAlign: 'left',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'var(--switcher-hover-bg)'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                  }}
                >
                  <span style={{
                    width: '28px', height: '28px',
                    borderRadius: '7px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px',
                    background: isActive ? 'var(--switcher-icon-active)' : 'var(--switcher-icon-bg)',
                    color: isActive ? 'var(--switcher-icon-active-color)' : 'var(--switcher-icon-color)',
                    border: '1px solid var(--switcher-icon-border)',
                    flexShrink: 0,
                  }}>
                    {t.icon}
                  </span>
                  <div>
                    <div style={{
                      fontSize: '12px', fontWeight: 600,
                      color: isActive ? 'var(--switcher-label-active)' : 'var(--switcher-label)',
                      fontFamily: 'var(--font-jakarta)',
                      lineHeight: 1.2,
                    }}>
                      {t.label}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: 'var(--switcher-desc)',
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '.04em',
                      marginTop: '1px',
                    }}>
                      {t.desc}
                    </div>
                  </div>
                  {isActive && (
                    <span style={{
                      marginLeft: 'auto',
                      width: '6px', height: '6px',
                      borderRadius: '50%',
                      background: 'var(--switcher-active-dot)',
                      boxShadow: '0 0 6px var(--switcher-active-dot)',
                      flexShrink: 0,
                    }} />
                  )}
                </motion.button>
              )
            })}

            {/* Label */}
            <div style={{
              padding: '6px 12px 2px',
              fontSize: '9px',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'var(--switcher-desc)',
              fontFamily: 'var(--font-mono)',
            }}>
              Theme
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(!open)}
        title="Switch theme"
        style={{
          width: '46px', height: '46px',
          borderRadius: '14px',
          border: '1px solid var(--switcher-btn-border)',
          background: 'var(--switcher-btn-bg)',
          backdropFilter: 'blur(20px)',
          boxShadow: 'var(--switcher-btn-shadow)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '17px',
          color: 'var(--switcher-btn-icon)',
          transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.span
          key={active.icon}
          initial={{ rotate: -20, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {active.icon}
        </motion.span>
      </motion.button>
    </div>
  )
}
