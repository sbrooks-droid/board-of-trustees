import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Board of Trustees — Flint Hill design system project.
// Dev server runs on port 3103 (homepage 3000, Upper School 3100, Apply & Engage 3101,
// Tuition & Financial Aid 3102) so all can run side by side.
export default defineConfig({
  // Production is served from SFTP /home/board-of-trustees, which maps to the
  // web path /home/board-of-trustees/ (e.g. https://flinthillstg.wpenginepowered.com/home/board-of-trustees/),
  // so asset URLs must include that full folder. Dev stays at localhost:3103.
  base: process.env.NODE_ENV === 'production' ? '/home/board-of-trustees/' : './',
  plugins: [react()],
});
