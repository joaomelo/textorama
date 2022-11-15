<script setup>
import PlainBar from "./plain-bar.vue";
import PlainEditor from "./plain-editor.vue";
import PlainStatus from "./plain-status.vue";
</script>
<template>
  <div class="app">
    <header><PlainBar /></header>
    <main><PlainEditor /></main>
    <footer><PlainStatus /></footer>
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  --header-size: 64px;
  --footer-size: 16px;
}

header,
footer {
  overflow: hidden;
}

main {
  overflow-y: scroll;
}

header,
main,
footer {
  position: absolute;
  left: 0;
  right: 0;
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
