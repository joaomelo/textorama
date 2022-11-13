import { createApp } from "vue";
import App from "./app.vue";

export function initApp(elementId) {
  const app = createApp(App);
  app.mount(elementId);
}
