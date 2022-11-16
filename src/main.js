import { createApp } from "vue";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

import welcome from "../README.md?raw";

import App from "./app.vue";
import { TextRecord } from "./text-record";

export function initApp(elementId) {
  const app = createApp(App);

  const textRecord = new TextRecord(welcome);
  app.provide("text-record", textRecord);

  app.use(createVuestic());
  app.mount(elementId);
}
