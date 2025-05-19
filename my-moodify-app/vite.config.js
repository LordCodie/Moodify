import path from "path"
// import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(), 
    // tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    proxy: {
      '/spotify': {
        target: 'https://accounts.spotify.com/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/spotify/, '')
      }
    },
    watch: {
      ignored: ['**/node_modules/**','**/dist/**'],
      usePolling: true,
      interval: 500
    }
  }
})
