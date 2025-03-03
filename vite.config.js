// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { bc_url } from './src/components/app';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: bc_url, // Backend base URL
        changeOrigin: true,
        secure: true, // Use true if deploying to HTTPS
      },
    },
  },
});
