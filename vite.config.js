import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import md from "vite-plugin-markdown";

export default defineConfig({
  plugins: [vue()],
  root: "src",
  envDir: "../",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
