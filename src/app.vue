<script setup>
import { ref } from "vue";
import PlainBar from "./plain-bar.vue";
import PlainEditor from "./plain-editor.vue";
import PlainStatus from "./plain-status.vue";
import { open, save, saveAs } from "./file";

const fileHandle = ref(null);
const content = ref(null);

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
    <PlainBar
      :save-disabled="!fileHandle"
      @open="handleOpen"
      @save="handleSave"
      @save-as="handleSaveAs"
    />
    <PlainEditor v-model:content="content" />
    <PlainStatus :file-name="fileHandle?.name" />
  </div>
</template>

<style>
.app {
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
}
</style>
