<script setup>
defineProps({ fileName: { type: String, default: null } });
</script>
<template>
  <div>{{ fileName || "no file" }}</div>
</template>
