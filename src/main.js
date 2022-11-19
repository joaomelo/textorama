import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createApp } from "vue";
import { createVuesticEssential, VaButton } from "vuestic-ui";
import "vuestic-ui/styles/essential.css";
import "vuestic-ui/styles/typography.css";
import "vuestic-ui/styles/reset.css";

import welcome from "../README.md?raw";
import pck from "../package.json";

import App from "./app.vue";
import { TextRecord } from "./text-record";

export function initApp(elementId) {
  console.info(pck.version);
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  };
  const firebase = initializeApp(firebaseConfig);
  getAnalytics(firebase);

  const app = createApp(App);

  const textRecord = new TextRecord(welcome);
  app.provide("text-record", textRecord);

  app.use(
    createVuesticEssential({
      components: { VaButton },
    })
  );
  app.mount(elementId);
}
