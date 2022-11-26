<script setup>
import { computed, inject } from "vue";
import BarBase from "./bar-base.vue";

const textRecord = inject("text-record");
const isSaveButtonDisabled = computed(
  () => !textRecord.fileLink.value || textRecord.status.value === "clean"
);
</script>

<template>
  <BarBase class="bar">
    <template #start>
      <h1 class="va-h3 title">plain</h1>
    </template>
    <template #end>
      <div class="buttons">
        <va-button
          id="new"
          icon="note_add"
          gradient
          @click="() => textRecord.new()"
        >
          new
        </va-button>
        <va-button
          id="open"
          icon="file_open"
          gradient
          @click="() => textRecord.open()"
        >
          open
        </va-button>
        <va-button
          v-if="textRecord.supportsFiles"
          id="save"
          icon="save"
          gradient
          :disabled="isSaveButtonDisabled"
          @click="() => textRecord.save()"
        >
          save
        </va-button>
        <va-button
          id="save-as"
          icon="save_as"
          gradient
          @click="() => textRecord.saveAs()"
        >
          {{ textRecord.supportsFiles ? "save as" : "download" }}
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
