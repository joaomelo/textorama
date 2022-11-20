import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

import { createApp } from "vue";
import { createVuesticEssential, VaButton } from "vuestic-ui";
import "vuestic-ui/styles/essential.css";
import "vuestic-ui/styles/typography.css";
import "vuestic-ui/styles/reset.css";

import welcome from "../README.md?raw";
import { version } from "../package.json";

import App from "./app.vue";
import { TextRecord } from "./text-record";

export function initApp(elementId) {
  const app = createApp(App);

  app.provide("version", version);

  if (import.meta.env.PROD) {
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

    Sentry.init({
      release: version,
      app,
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        new BrowserTracing({
          tracePropagationTargets: ["localhost", "plain.melo.plus", /^\//],
        }),
      ],
      tracesSampleRate: 0.2,
    });
  }

  const textRecord = new TextRecord(welcome);
  app.provide("text-record", textRecord);

  const vuestic = createVuesticEssential({
    components: { VaButton },
  });
  app.use(vuestic);

  app.mount(elementId);
}
