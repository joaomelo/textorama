<script setup>
import { inject } from "vue";
const plain = inject("plain");
</script>

<template>
  <div class="bar">
    <h1 class="va-h3">Plain</h1>
    <div class="buttons">
      <va-button icon="note_add" gradient @click="plain.new">New</va-button>
      <va-button icon="file_open" gradient @click="plain.open">
        Open
      </va-button>
      <va-button
        icon="save"
        gradient
        :disabled="!plain.link"
        @click="plain.save"
      >
        Save
      </va-button>
      <va-button icon="save_as" gradient @click="plain.saveAs">
        Save As
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
</style>
