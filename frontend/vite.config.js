import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 4173,
    strictPort: true,
  },
  preview: {
    allowedHosts: [
      "ecommerce-application-2-162t.onrender.com"
    ]
  },
  base: "./",
});
