<script setup>
import { computed, inject } from "vue";
import ActionButton from "./action-button.vue";
import BaseBar from "./base-bar.vue";

const textRecord = inject("text-record");
const isSaveButtonDisabled = computed(() => !textRecord.fileHandle.value);
</script>

<template>
  <BaseBar class="bar">
    <template #start>
      <h1 class="va-h3 title">Textorama</h1>
    </template>
    <template #end>
      <div class="buttons">
        <ActionButton
          id="new"
          label="new"
          icon="note_add"
          :shortcut="(e) => e.key === 'n' && e.altKey"
          @action="() => textRecord.newAs()"
        />
        <ActionButton
          id="open"
          label="open"
          icon="file_open"
          :shortcut="(e) => e.key === 'o' && (e.ctrlKey || e.metaKey)"
          @action="() => textRecord.openAs()"
        />
        <ActionButton
          v-if="textRecord.canLink"
          id="save"
          label="save"
          icon="save"
          :disabled="isSaveButtonDisabled"
          :shortcut="(e) => e.key === 's' && (e.ctrlKey || e.metaKey)"
          @action="() => textRecord.save()"
        />
        <ActionButton
          id="save-as"
          :label="textRecord.canLink ? 'save as' : 'download'"
          icon="save_as"
          :shortcut="(e) => e.key === 'd' && (e.ctrlKey || e.metaKey)"
          @action="() => textRecord.saveAs()"
        />
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
