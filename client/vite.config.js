import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // 👈 Fixes `global is not defined`
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      util: 'util',
      events: 'events',
      assert: 'assert',
      buffer: 'buffer',
      process: 'process/browser',
    },
  },
  optimizeDeps: {
    include: ['process', 'buffer'],
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
})
