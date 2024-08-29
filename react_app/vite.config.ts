// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
 
export default defineConfig({
  plugins: [react()],
  base: '/react/',  // Set the base path to match your Yii route
  build: {
    outDir: '../web/react',  // Ensure this matches where your Yii can access the build
    emptyOutDir: true,
    manifest: true,
  },
});