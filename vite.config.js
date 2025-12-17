import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "src",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@js": path.resolve(__dirname, "src/dignisi/js"),
      "@img": path.resolve(__dirname, "src/dignisi/images"),
      "@styles": path.resolve(__dirname, "src/dignisi/styles"),
    },
  },

  build: {
    outDir: "../dist",
    emptyOutDir: true,
    minify: "esbuild",
    target: "esnext",
    sourcemap: false,

    rollupOptions: {
      input: {
        "en/index": path.resolve(__dirname, "src/en/index.html"),
        "ru/index": path.resolve(__dirname, "src/ru/index.html"),
        "hy/index": path.resolve(__dirname, "src/hy/index.html"),
      },

      output: {
        manualChunks: {
          chart: ["chart.js", "chartjs-plugin-datalabels"],
        },
      },
    },
  },
});
