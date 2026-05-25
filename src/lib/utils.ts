import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

export const COLOR_MAP: Record<string, string> = {
  blue:   '#4f7fff',
  cyan:   '#00d4ff',
  green:  '#00e599',
  amber:  '#ffaa00',
  violet: '#a78bfa',
  rose:   '#ff6b8a',
}

export const COLOR_BG_MAP: Record<string, string> = {
  blue:   'rgba(79,127,255,0.08)',
  cyan:   'rgba(0,212,255,0.08)',
  green:  'rgba(0,229,153,0.08)',
  amber:  'rgba(255,170,0,0.08)',
  violet: 'rgba(167,139,250,0.08)',
  rose:   'rgba(255,107,138,0.08)',
}

export const STATUS_CONFIG: Record<string, { label: string; colorClass: string }> = {
  done:     { label: 'Completed',   colorClass: 'tag-green' },
  prog:     { label: 'In Progress', colorClass: 'tag-amber' },
  upcoming: { label: 'Upcoming',    colorClass: 'tag-violet' },
}
