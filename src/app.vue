<script setup>
import { inject, watch } from "vue";
import ViewTop from "./view-top.vue";
import ViewBottom from "./view-bottom.vue";
import ViewEditor from "./view-editor.vue";

const textRecord = inject("text-record");
const unload = () => "Are you sure want to leave before saving?";
watch(textRecord.status, (status) => {
  window.onbeforeunload = status === "clean" ? null : unload;
});
</script>
<template>
  <div class="app">
    <header><ViewTop /></header>
    <main><ViewEditor /></main>
    <footer><ViewBottom /></footer>
  </div>
</template>

<style scoped>
.app {
  position: relative;
  height: 100vh;
  --header-size: 64px;
  --footer-size: 16px;
  --max-width: 1024px;
}

header,
main,
footer {
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
}

header {
  top: 0;
  height: var(--header-size);
}

main {
  top: var(--header-size);
  bottom: var(--footer-size);
}

footer {
  bottom: 0px;
  height: var(--footer-size);
}
</style>
