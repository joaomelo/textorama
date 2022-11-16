<script setup>
import { inject } from "vue";
const textRecord = inject("text-record");
</script>
<template>
  <div class="status">
    <p>{{ textRecord.fileName.value || "no file" }}</p>
    <p>{{ textRecord.status.value }}</p>
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
