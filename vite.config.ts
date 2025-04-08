import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://super-abuelo.github.io/admin-helper/",
  plugins: [react()],
})

