import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Set the server to listen on all network interfaces
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true
    },
    // We need to set HMR host to localhost so that Vite client
    // can connect to the Vite server correctly from within Docker containers
    // That's why WS is disabled in NGINX
    hmr: {
      host: 'localhost',
      clientPort: 5173,
      protocol: 'ws'
    },
  }
})