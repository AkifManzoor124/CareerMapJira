import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './', // Your project root
  build: {
    outDir: 'dist', // or whatever Forge expects
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://jobtrajectory.atlassian.net/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
