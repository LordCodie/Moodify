import path from "path"
// import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import strip from "@rollup/plugin-strip"

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
    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true
    //   }
    // }
    esbuild: {
      drop: ['console', 'debugger']
    },
    rollupOptions: {
      plugins: [
        strip({
          include: ["**/*.(js|ts|jsx|tsx)"],
          functions: ["console.*"],
          debugger: true,
        })
      ]
    }
  },
  server: {
    proxy: {
      '/api/spotify': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/spotify/, '')
      }
    },
    watch: {
      ignored: ['**/node_modules/**','**/dist/**'],
      usePolling: true,
      interval: 500
    }
  }
})
