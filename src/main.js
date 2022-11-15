import { createApp } from "vue";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

import App from "./app.vue";
import { Plain } from "./plain";

export function initApp(elementId) {
  const app = createApp(App);

  const plain = new Plain();
  app.provide("plain", plain);

  app.use(createVuestic());
  app.mount(elementId);
}
