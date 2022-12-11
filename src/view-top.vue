<script setup>
import { computed, inject } from "vue";
import BaseBar from "./base-bar.vue";

const textRecord = inject("text-record");

const handleOpen = () => textRecord.open();
const handleNew = () => textRecord.newAs();
const handleSaveAs = () => textRecord.saveAs();
const handleSave = () => textRecord.save();

const isSaveButtonDisabled = computed(() => !textRecord.fileHandle.value);
</script>

<template>
  <BaseBar class="bar">
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
          v-if="textRecord.canLink"
          id="save"
          icon="save"
          gradient
          :disabled="isSaveButtonDisabled"
          @click="handleSave"
        >
          save
        </va-button>
        <va-button id="save-as" icon="save_as" gradient @click="handleSaveAs">
          {{ textRecord.canLink ? "save as" : "download" }}
        </va-button>
      </div>
    </template>
  </BaseBar>
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
