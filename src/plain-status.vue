<script setup>
import { inject } from "vue";
import BarBase from "./bar-base.vue";

const version = inject("version");
const textRecord = inject("text-record");
</script>
<template>
  <BarBase class="bar">
    <template #start>
      <p>{{ version }}</p>
    </template>
    <template #end>
      <p>
        {{ textRecord.fileName.value || "not linked to file" }}
        ({{ textRecord.status.value }})
      </p>
    </template>
  </BarBase>
</template>

<style scoped>
.bar {
  color: var(--va-text-inverted);
  background-color: var(--va-primary);
}
</style>
