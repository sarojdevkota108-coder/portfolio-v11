'use client'
import { useEffect, useState } from 'react'
import { NAV_LINKS, SOCIALS } from '@/data/portfolio'
import { cn } from '@/lib/utils'
import { IconMenu2, IconX, IconBrandGithub } from '@tabler/icons-react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const [active,   setActive]   = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id) }) },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    setOpen(false)
    // Slight delay lets the menu close animation finish before scrolling
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <nav
        className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300')}
        style={scrolled ? {
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--nav-border)',
        } : { background: 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-3"
            style={{ cursor: 'pointer' }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
              style={{
                background: 'var(--nav-brand-bg)',
                boxShadow: 'var(--nav-brand-shadow)',
              }}
            >
              SD
            </div>
            <span className="hidden sm:block text-sm font-bold tracking-tight"
              style={{ color: 'var(--txt)', fontFamily: 'var(--font-jakarta)' }}>
              Saroj Devkota
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className={cn(
                  'px-3 py-2 rounded-lg text-[12px] font-medium transition-all duration-200 relative',
                )}
                style={{
                  color: active === l.href ? 'var(--txt)' : 'var(--txt2)',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  if (active !== l.href) {
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--txt)'
                    ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--glass-bg)'
                  }
                }}
                onMouseLeave={e => {
                  if (active !== l.href) {
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--txt2)'
                    ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                  }
                }}
              >
                {active === l.href && (
                  <span
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </button>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-2">
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] transition-all"
              style={{ color: 'var(--txt2)', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--txt)'; (e.currentTarget as HTMLAnchorElement).style.background = 'var(--glass-bg)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--txt2)'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}
            >
              <IconBrandGithub size={14} />
            </a>
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden md:flex btn-primary text-xs px-4 py-2"
            >
              Get in touch
            </button>
            {/* Hamburger — min 44px tap target */}
            <button
              className="md:hidden rounded-lg transition"
              style={{
                color: 'var(--txt2)',
                cursor: 'pointer',
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <IconX size={20} /> : <IconMenu2 size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — full-screen overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          style={{
            background: 'var(--mobile-menu-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            paddingTop: '64px', // navbar height
          }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-6 pb-16">
            {NAV_LINKS.map(l => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-2xl font-bold transition"
                style={{
                  color: active === l.href ? 'var(--txt)' : 'var(--txt2)',
                  fontFamily: 'var(--font-bebas)',
                  letterSpacing: '.08em',
                  cursor: 'pointer',
                  padding: '12px 32px',   // 44px+ tap target vertically
                  minHeight: '48px',
                }}
                onTouchEnd={e => { e.preventDefault(); scrollTo(l.href) }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-primary mt-4"
              style={{ cursor: 'pointer' }}
            >
              Get in touch
            </button>
          </div>
        </div>
      )}
    </>
  )
}
