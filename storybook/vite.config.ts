import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'app/store': path.resolve(__dirname, '../../app/store'),
      '@lib': path.resolve(__dirname, '../app/lib'),
      app: path.resolve(__dirname, '../../../app'),
      '@': path.resolve(__dirname, '..'),
    },
  },
  optimizeDeps: {
    exclude: [

      'DocsRenderer', // You can try excluding DocsRenderer or any other related dependency

    ],
  },
});
