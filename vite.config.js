import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        },
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "safari-pinned-tab.svg",
        ],
        manifest: createManifest(mode),
        // devOptions: {
        //   enabled: true,
        // },
      }),
    ],
    root: "src",
    envDir: "../",
    publicDir: "../assets",
    build: {
      outDir: "../dist",
      assetsDir: ".",
      emptyOutDir: true,
      sourcemap: true,
    },
  };
});

function createManifest(mode) {
  const name = `Textorama${mode === "development" ? " (dev)" : ""}`;
  const android192 = {
    src: "/android-chrome-192x192.png",
    sizes: "192x192",
    type: "image/png",
  };
  const android512 = {
    src: "/android-chrome-512x512.png",
    sizes: "512x512",
    type: "image/png",
  };
  return {
    name,
    short_name: name,
    description:
      "Textorama is a modest text editor. It works with plain text files in your file system.",
    categories: ["productivity", "utilities"],
    start_url: "/",
    id: "/",
    theme_color: "#154EC1",
    background_color: "#ffffff",
    display: "standalone",
    lang: "en",
    orientation: "portrait",
    icons: [
      android192,
      android512,
      {
        ...android512,
        purpose: "any maskable",
      },
    ],
    screenshots: [
      {
        src: "screenshot-1.png",
        sizes: "464x821",
        type: "image/png",
      },
      {
        src: "screenshot-2.png",
        sizes: "1310x932",
        type: "image/png",
      },
    ],
    file_handlers: [
      {
        action: "/",
        launch_type: "multiple-clients",
        accept: {
          "text/plain": [".txt", ".md"],
        },
        icons: [android192],
      },
    ],
  };
}
