import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // It should point to a 'dist' folder at the root
  },
  plugins: [react()],
})
