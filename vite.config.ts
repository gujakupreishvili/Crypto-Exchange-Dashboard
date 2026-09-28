import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';

const fromSrc = (dir: string) => fileURLToPath(new URL(`./src/${dir}`, import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fromSrc(''),
      '@components': fromSrc('components'),
      '@data': fromSrc('data'),
      '@hooks': fromSrc('hook'),
      '@lib': fromSrc('lib'),
      '@services': fromSrc('services'),
      '@store': fromSrc('store'),
      '@types': fromSrc('types'),
    },
  },
});
