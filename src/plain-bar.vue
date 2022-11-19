<script setup>
import { computed, inject } from "vue";
const textRecord = inject("text-record");
const isSaveButtonDisabled = computed(
  () => !textRecord.fileLink.value || textRecord.status.value === "clean"
);
</script>

<template>
  <div class="bar">
    <h1 class="va-h3">Plain</h1>
    <div class="buttons">
      <va-button icon="note_add" gradient @click="() => textRecord.new()">
        New
      </va-button>
      <va-button icon="file_open" gradient @click="() => textRecord.open()">
        Open
      </va-button>
      <va-button
        v-if="textRecord.supportsFiles"
        icon="save"
        gradient
        :disabled="isSaveButtonDisabled"
        @click="() => textRecord.save()"
      >
        Save
      </va-button>
      <va-button icon="save_as" gradient @click="() => textRecord.saveAs()">
        {{ textRecord.supportsFiles ? "Save As" : "Download" }}
      </va-button>
    </div>
  </div>
</template>

<style scoped>
.bar {
  padding-inline: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: var(--va-primary) solid 2px;
}

.buttons {
  display: flex;
  gap: 4px;
}

h1 {
  color: var(--va-primary);
}
</style>
