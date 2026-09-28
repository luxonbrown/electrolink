import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Split long-lived vendor code out of the app chunk so a UI-only change
        // doesn't invalidate React / Swiper / Motion in the browser cache.
        // Rolldown's native API is `advancedChunks`, not Rollup's `manualChunks`.
        advancedChunks: {
          groups: [
            { name: 'react', test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/ },
            { name: 'motion', test: /[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/ },
            { name: 'carousel', test: /[\\/]node_modules[\\/]swiper/ },
          ],
        },
      },
    },
  },
})
