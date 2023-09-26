import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "web/src",
  base: "/xrk4np",
  publicDir: "../public",
  build: {
    outDir: "../www/xrk4np",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "web", "src/index.html"),
        hw0: resolve(__dirname, "web", "src/hw0/homework0.html"),
        hw1: resolve(__dirname, "web", "src/hw1/index.html"),
        hw2: resolve(__dirname, "web", "src/hw2/index.html"),
        hw3: resolve(__dirname, "web", "src/hw3/index.html"),
        notfound: resolve(__dirname, "web", "src/404/index.html"),
      },
    },
  },
});
