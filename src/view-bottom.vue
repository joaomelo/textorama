<script setup>
import BaseBar from "./base-bar.vue";

const props = defineProps({
  version: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    default: null,
  },
});
</script>
<template>
  <BaseBar class="bar">
    <template #start>
      <p>{{ props.version }}</p>
    </template>
    <template #end>
      <p>
        {{ props.fileName || "not linked to file" }}
        ({{ props.status }})
      </p>
    </template>
  </BaseBar>
</template>

<style scoped>
.bar {
  color: var(--va-text-inverted);
  background-color: var(--va-primary);
}
</style>
