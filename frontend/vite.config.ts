import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0'
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'lucide-react'],
          'vendor-react-query': ['@tanstack/react-query'],
          'vendor-utils': ['axios', 'clsx', 'tailwind-merge'],
          'vendor-visx': ['@visx/axis', '@visx/curve', '@visx/event', '@visx/grid', '@visx/group', '@visx/legend', '@visx/responsive', '@visx/scale', '@visx/shape', '@visx/tooltip'],
        }
      }
    }
  }
})
