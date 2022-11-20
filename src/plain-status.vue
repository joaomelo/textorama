<script setup>
import { inject } from "vue";
const version = inject("version");

const textRecord = inject("text-record");
</script>
<template>
  <div class="status">
    <p>
      {{ textRecord.fileName.value || "not linked to file" }}
      ({{ textRecord.status.value }})
    </p>
    <p>{{ version }}</p>
  </div>
</template>

<style scoped>
.status {
  color: var(--va-text-inverted);
  background-color: var(--va-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 8px;
}
</style>
