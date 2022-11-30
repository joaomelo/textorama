<script setup>
import { computed, inject } from "vue";
import { supported, fileOpen, fileSave } from "browser-fs-access";
import BarBase from "./bar-base.vue";

const textRecord = inject("text-record");

const mimeType = "text/plain";
const options = {
  mimeTypes: [mimeType],
  extensions: [".txt", ".md"],
  description: "Text files",
  fileName: "Untitled.txt",
};

const handleOpen = async () => {
  const file = await fileOpen(options);
  if (supported) {
    await textRecord.open(file.handle);
  } else {
    const content = await file.text();
    await textRecord.open(content);
  }
};

const handleNew = async () => {
  if (supported) {
    const fileHandle = await fileSave(
      new Blob([""], { type: mimeType }),
      options
    );
    await textRecord.open(fileHandle);
  } else {
    await textRecord.open("");
  }
};

const isSaveButtonDisabled = computed(() => !textRecord.fileHandle.value);

const contentAsBlob = () =>
  new Blob([textRecord.content.value], { type: mimeType });
const handleSave = async () => {
  console.log({ "textRecord.fileHandle.value": textRecord.fileHandle.value });
  await fileSave(contentAsBlob(), options, textRecord.fileHandle.value);
  textRecord.save();
};
const handleSaveAs = async () => {
  const maybeFileHandle = await fileSave(contentAsBlob(), options);
  textRecord.save(maybeFileHandle);
};
</script>

<template>
  <BarBase class="bar">
    <template #start>
      <h1 class="va-h3 title">Textorama</h1>
    </template>
    <template #end>
      <div class="buttons">
        <va-button id="new" icon="note_add" gradient @click="handleNew">
          new
        </va-button>
        <va-button id="open" icon="file_open" gradient @click="handleOpen">
          open
        </va-button>
        <va-button
          v-if="supported"
          id="save"
          icon="save"
          gradient
          :disabled="isSaveButtonDisabled"
          @click="handleSave"
        >
          save
        </va-button>
        <va-button id="save-as" icon="save_as" gradient @click="handleSaveAs">
          {{ supported ? "save as" : "download" }}
        </va-button>
      </div>
    </template>
  </BarBase>
</template>

<style scoped>
.bar {
  border-bottom: var(--va-primary) solid 2px;
  padding-block: 4px;
}

.title {
  color: var(--va-primary);
  margin: 0;
}

.buttons {
  display: flex;
  gap: 4px;
}
</style>
