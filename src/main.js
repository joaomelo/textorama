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

export async function initApp(elementId) {
  const app = createApp(App);

  initSentry({ app, version });

  const textRecord = new TextRecord();
  textRecord.dirty(welcome);
  // updateIfLaunchedByFile(textRecord);
  app.provide("text-record", textRecord);
  app.provide("version", version);

  const vuestic = createVuesticEssential({
    components: { VaButton },
  });
  app.use(vuestic);

  app.mount(elementId);
}

function initSentry({ app, version }) {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      app,
      release: version,
      environment: import.meta.env.MODE,
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        new BrowserTracing({
          tracePropagationTargets: ["localhost", "textorama.online", /^\//],
        }),
      ],
      tracesSampleRate: 0.2,
    });
  }
}

// function updateIfLaunchedByFile(textRecord) {
//   if (!("launchQueue" in window)) return;
//   if (!("files" in LaunchParams.prototype)) return;

//   // setConsumer does not triggers if the app is not launched by file, so it is not a good place to branch what to do in every launch situation
//   launchQueue.setConsumer((launchParams) => {
//     if (launchParams.files.length <= 0) return;
//     const fileHandle = launchParams.files[0];
//     textRecord.open(fileHandle);
//   });
// }
