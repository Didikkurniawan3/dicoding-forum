import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,         // Ini akan mengaktifkan describe, it, expect secara global
    environment: 'jsdom',  // Ini dibutuhkan untuk testing React (karena DOM)
    setupFiles: './vitest.setup.js', // Opsional untuk jest-dom
  },
});
