import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows 0.0.0.0
    port: 4173,
    strictPort: false,
    preview: {
      allowedHosts: [
        'ecommerce-application-2-162t.onrender.com'
      ]
    }
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 4173,
    strictPort: false,
    allowedHosts: [
      'ecommerce-application-2-162t.onrender.com'
    ]
  }
});
