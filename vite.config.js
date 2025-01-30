import { defineConfig } from "vite";
import path from "path";
import { mainModule } from "process";

export default defineConfig({
  root: ".", 
  build: {
    outDir: "dist", // Se asegura de que los archivos vayan a "dist/"
    emptyOutDir: true, // Limpia la carpeta "dist" antes de cada build
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      }
      
    }
  },
  server: {
    port: 5175 // Puerto para desarrollo local
  }
});
