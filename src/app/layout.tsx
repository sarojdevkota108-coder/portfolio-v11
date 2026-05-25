import type { Metadata } from 'next'
import './globals.css'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Loader } from '@/components/ui/Loader'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { ThemeProvider } from '@/context/ThemeContext'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'
import { ThemeScript } from '@/components/ui/ThemeScript'

export const metadata: Metadata = {
  title: 'Saroj Devkota — Web Developer · Interior Designer · Network Engineer',
  description:
    'Multidisciplinary professional: Web Developer, Interior Designer, and Network Engineer based in Kathmandu, Nepal. Building digital experiences, beautiful spaces, and resilient networks.',
  keywords: ['Saroj Devkota', 'Web Developer', 'Interior Designer', 'Network Engineer', 'Kathmandu', 'Nepal', 'Full Stack', 'Django', 'React'],
  // FIX: og:url matches the actual live domain
  openGraph: {
    title: 'Saroj Devkota — Web Developer · Interior Designer · Network Engineer',
    description: 'Building Digital Experiences, Beautiful Spaces & Resilient Networks.',
    url: 'https://www.saroj-devkota.com.np',
    siteName: 'Saroj Devkota',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saroj Devkota',
    description: 'Web Developer · Interior Designer · Network Engineer',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <Loader />
          <CustomCursor />
          <ScrollProgress />
          <ThemeSwitcher />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
