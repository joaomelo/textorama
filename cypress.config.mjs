import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "k3zc22",
  fixturesFolder: "e2e/fixtures",
  screenshotsFolder: "e2e/screenshots",
  videosFolder: "e2e/videos",
  downloadsFolder: "e2e/downloads",
  e2e: {
    baseUrl: "http://127.0.0.1:5173",
    supportFile: "e2e/support/e2e.js",
    specPattern: "e2e/**/*.spec.js",
    experimentalSessionAndOrigin: true,
    experimentalRunAllSpecs: true,
  },
});
