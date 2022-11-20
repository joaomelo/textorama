<script setup>
import { computed, inject } from "vue";
const textRecord = inject("text-record");
const isSaveButtonDisabled = computed(
  () => !textRecord.fileLink.value || textRecord.status.value === "clean"
);
</script>

<template>
  <div class="bar">
    <h1 class="va-h3 title">plain</h1>
    <div class="buttons">
      <va-button icon="note_add" gradient @click="() => textRecord.new()">
        new
      </va-button>
      <va-button icon="file_open" gradient @click="() => textRecord.open()">
        open
      </va-button>
      <va-button
        v-if="textRecord.supportsFiles"
        icon="save"
        gradient
        :disabled="isSaveButtonDisabled"
        @click="() => textRecord.save()"
      >
        save
      </va-button>
      <va-button icon="save_as" gradient @click="() => textRecord.saveAs()">
        {{ textRecord.supportsFiles ? "save as" : "download" }}
      </va-button>
    </div>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: var(--va-primary) solid 2px;
  padding: 4px;
}

.title {
  color: var(--va-primary);
  margin: 0;
  display: none;
}

@media (min-width: 480px) {
  .bar {
    justify-content: space-between;
  }

  .title {
    display: initial;
  }
}

.buttons {
  display: flex;
  gap: 4px;
}
</style>
