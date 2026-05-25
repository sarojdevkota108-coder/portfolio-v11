import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#04040a',
          2: '#090912',
          3: '#0f0f1a',
          4: '#161622',
        },
        brand: {
          blue:   '#4f7fff',
          cyan:   '#00d4ff',
          green:  '#00e599',
          amber:  '#ffaa00',
          violet: '#a78bfa',
          rose:   '#ff6b8a',
        },
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'cursive'],
        sans:    ['var(--font-jakarta)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow':    'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'float':         'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'glow':          'glow 2s ease-in-out infinite alternate',
        'scroll-hint':   'scrollHint 1.5s ease-in-out infinite',
        'grid-move':     'gridMove 20s linear infinite',
        'particle':      'particle 8s linear infinite',
        'spin-slow':     'spin 20s linear infinite',
        'marquee':       'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px rgba(0,212,255,0.2)' },
          to:   { boxShadow: '0 0 30px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.2)' },
        },
        scrollHint: {
          '0%,100%': { transform: 'translateY(0)', opacity: '1' },
          '50%':     { transform: 'translateY(8px)', opacity: '0.4' },
        },
        gridMove: {
          from: { backgroundPosition: '0 0' },
          to:   { backgroundPosition: '80px 80px' },
        },
        particle: {
          '0%':   { transform: 'translateY(100vh) translateX(0)', opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { transform: 'translateY(-100px) translateX(60px)', opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-glow':        'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(79,127,255,0.08) 0%, transparent 70%)',
        'section-fade':     'linear-gradient(to bottom, transparent, #04040a)',
      },
    },
  },
  plugins: [],
}
export default config
