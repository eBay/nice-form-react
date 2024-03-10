import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
  base: 'antd',
  plugins: [react()],
  build: {
    outDir: '../../gh-pages/antd',
  },
});
