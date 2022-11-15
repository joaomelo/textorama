<script setup>
defineProps({ fileName: { type: String, default: null } });
</script>
<template>
  <div bottom class="status">
    <p class="#fff">{{ fileName || "no file" }}</p>
  </div>
</template>

<style scoped>
.status {
  color: var(--va-text-inverted);
  background-color: var(--va-primary);
}
</style>
