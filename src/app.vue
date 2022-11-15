<script setup>
import { ref } from "vue";
import PlainBar from "./plain-bar.vue";
import PlainEditor from "./plain-editor.vue";
import PlainStatus from "./plain-status.vue";
import { open, save, saveAs } from "./file";

const fileHandle = ref(null);
const content = ref(null);

const handleNew = async () => {
  const newContent = null;
  fileHandle.value = await saveAs(newContent);
  content.value = newContent;
};

const handleOpen = async () => {
  const payload = await open();
  fileHandle.value = payload.handle;
  content.value = payload.content;
};

const handleSave = async () => {
  await save({ handle: fileHandle.value, content: content.value });
};

const handleSaveAs = async () => {
  fileHandle.value = await saveAs(content.value);
};
</script>
<template>
  <div class="app">
    <header>
      <PlainBar
        :save-disabled="!fileHandle"
        @new="handleNew"
        @open="handleOpen"
        @save="handleSave"
        @save-as="handleSaveAs"
      />
    </header>
    <main>
      <PlainEditor v-model:content="content" />
    </main>
    <footer>
      <PlainStatus :file-name="fileHandle?.name" />
    </footer>
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
