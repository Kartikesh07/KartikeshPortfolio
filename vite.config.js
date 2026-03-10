import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
const base = process.env.VITE_BASE ?? (process.env.VERCEL ? '/' : '/KartikeshPortfolio/')

export default defineConfig({
  // Use `VITE_BASE` env to override. On Vercel `process.env.VERCEL` is set,
  // so defaults to root `/`. For GitHub Pages builds use `/KartikeshPortfolio/`.
  base,
  plugins: [
    tailwindcss(),
    react(),
  ],
})
