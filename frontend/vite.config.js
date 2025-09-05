  import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Ecommerce-Application/',  // 👈 must match repo name exactly
})
