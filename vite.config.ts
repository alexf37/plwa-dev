import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "src",
  base: "/xrk4np/",
  publicDir: "../public",
  build: {
    outDir: "../apache/xrk4np/public_html",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        hw0: resolve(__dirname, "src/hw0/homework0.html"),
        hw1: resolve(__dirname, "src/hw1/index.html"),
        hw2: resolve(__dirname, "src/hw2/index.html"),
        hw3: resolve(__dirname, "src/hw3/index.html"),
        notfound: resolve(__dirname, "src/404/index.html"),
      },
    },
  },
});
