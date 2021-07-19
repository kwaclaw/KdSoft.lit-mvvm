import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 41000,
    open: true,
    hmr: { protocol: 'ws' },
    cors: true
  }
});
