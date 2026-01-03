import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    // This allows process.env.API_KEY to be replaced with the actual value during the build process
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
  },
});