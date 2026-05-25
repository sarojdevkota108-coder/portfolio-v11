'use client'
import { useEffect } from 'react'

export function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100
      bar.style.width = `${pct}%`
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <div id="scroll-progress" />
}
