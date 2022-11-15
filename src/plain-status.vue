<script setup>
import { inject } from "vue";
const plain = inject("plain");
</script>
<template>
  <div class="status">
    <p>{{ plain.fileName || "no file" }}</p>
    <p>{{ plain.status }}</p>
  </div>
</template>

<style scoped>
.status {
  color: var(--va-text-inverted);
  background-color: var(--va-primary);
  display: flex;
  justify-content: space-between;
}
</style>
