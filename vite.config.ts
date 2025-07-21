import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "brotliCompress", // ou 'gzip'
      ext: ".br", // extensão gerada
      threshold: 1024, // só comprime arquivos maiores que 1KB
    }),
    visualizer(),
  ],
});
