'use client'
import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const pos       = useRef({ x: 0, y: 0 })
  const ring      = useRef({ x: 0, y: 0 })
  const rafRef    = useRef<number>(0)
  // FIX: don't render custom cursor on touch/mobile devices — they have no mouse pointer
  const [isPointerDevice, setIsPointerDevice] = useState(false)

  useEffect(() => {
    // matchMedia('(hover: hover)') is true on desktop (mouse), false on touch screens
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setIsPointerDevice(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsPointerDevice(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!isPointerDevice) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top  = `${e.clientY}px`
      }
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18
      ring.current.y += (pos.current.y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`
        ringRef.current.style.top  = `${ring.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnter = () => document.body.classList.add('cursor-hover')
    const onLeave = () => document.body.classList.remove('cursor-hover')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isPointerDevice])

  // Don't mount the DOM nodes at all on touch devices
  if (!isPointerDevice) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor"
        style={{
          background: 'var(--cursor-color)',
          boxShadow: '0 0 8px var(--cursor-color)',
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ borderColor: 'var(--cursor-ring-color)' }}
      />
    </>
  )
}
