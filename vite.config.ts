import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

function resIn(dir: string) {
  return resolve(__dirname, "src", dir);
}

const filesToInclude = [
  "index.html",
  "hw0/homework0.html",
  "hw1/index.html",
  "hw2/index.html",
  "hw2/styles/main.css",
  "hw3/index.html",
  "hw6/index.html",
  "hw7/index.html",
  "splash/splash.html",
];

const rollupInputs: Record<string, string> = filesToInclude.reduce(
  (prevv, curv, curi) => ({
    ...prevv,
    [curi]: resIn(curv),
  }),
  {},
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "src",
  base: "/xrk4np/",
  publicDir: "../public",
  build: {
    outDir: "../apache/xrk4np/public_html",
    emptyOutDir: true,
    manifest: true,
    sourcemap: true,
    cssCodeSplit: true,
    rollupOptions: {
      input: rollupInputs,
    },
  },
});
