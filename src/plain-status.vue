<script setup>
defineProps({ fileName: { type: String, default: null } });
</script>
<template>
  <va-app-bar bottom class="bar">
    <p class="#fff">{{ fileName || "no file" }}</p>
  </va-app-bar>
</template>

<style scoped>
.bar {
  color: var(--va-text-inverted);
}
</style>
