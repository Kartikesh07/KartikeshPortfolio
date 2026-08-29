/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#060608',
          900: '#0A0A0C', // Base background
          850: '#0D0D10', // Deep secondary
          800: '#121216',
          700: '#16161A', // Surface charcoal
          600: '#1E1E24',
          500: '#2A2A33',
        },
        ember: {
          DEFAULT: '#FF6B1A', // Primary dominant accent
          glow: '#FF8533',
          dark: '#CC4E08',
          amber: '#E8863A',
          dim: 'rgba(255, 107, 26, 0.15)',
          ultraDim: 'rgba(255, 107, 26, 0.05)',
        },
        cinematic: {
          white: '#EDEAE4', // Warm off-white headings
          silver: '#C5C3BC',
          muted: '#8A8A92', // Muted body
          darkMuted: '#52525A',
          border: 'rgba(255, 255, 255, 0.08)',
          borderBright: 'rgba(255, 255, 255, 0.18)',
        }
      },
      fontFamily: {
        cinematic: ['"Bebas Neue"', 'Oswald', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'ember-glow': '0 0 35px rgba(255, 107, 26, 0.35)',
        'ember-glow-lg': '0 0 65px rgba(255, 107, 26, 0.5), 0 0 20px rgba(255, 107, 26, 0.25)',
        'hud-panel': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'card-lift': '0 16px 36px -10px rgba(0, 0, 0, 0.8), 0 0 24px rgba(255, 107, 26, 0.15)',
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        'vignette-radial': 'radial-gradient(ellipse at center, transparent 40%, rgba(6, 6, 8, 0.85) 100%)',
        'ember-gradient': 'linear-gradient(135deg, #FF6B1A 0%, #E8863A 100%)',
      },
      clipPath: {
        'chamfer': 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
        'chamfer-sm': 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
        'tag': 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
        'slanted': 'polygon(0 0, 100% 0, 96% 100%, 0 100%)',
      }
    },
  },
  plugins: [],
}