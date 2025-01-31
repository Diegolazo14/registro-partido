import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: ".", 
  build: {
    outDir: "dist", // Se asegura de que los archivos vayan a "dist/"
    emptyOutDir: true, // Limpia la carpeta "dist" antes de cada build
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "public/index.html"),  // Asegura que index.html se compile
        match: path.resolve(__dirname, "public/match.html"),
        profile: path.resolve(__dirname, "public/profile.html")
      }
    }
  },
  server: {
    port: 5173 // Puerto para desarrollo local
  }
});
