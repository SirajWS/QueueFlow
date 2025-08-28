import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(() => ({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    port: 4000,          // << fix auf 4000
    strictPort: true,    // fail, wenn 4000 belegt ist
    host: true,
    hmr: process.env.TAURI_PLATFORM
      ? { protocol: "ws", host: "localhost", port: 4000 }
      : undefined,
  },
  clearScreen: false,
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: process.env.TAURI_PLATFORM === "windows" ? "chrome105" : "safari13",
    minify: process.env.TAURI_DEBUG ? false : "esbuild",
    sourcemap: !!process.env.TAURI_DEBUG,
  },
}));
