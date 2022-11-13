import { createApp } from "vue";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

import App from "./app.vue";

export function initApp(elementId) {
  const app = createApp(App);
  app.use(createVuestic());
  app.mount(elementId);
}
