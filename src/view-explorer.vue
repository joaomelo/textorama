<script setup>
import { watch } from "vue";

const props = defineProps({
  handles: {
    type: Object,
    default: null,
  },
});

watch(
  () => props.handles,
  (handles) => console.log({ handles })
);
</script>
<template>
  <div>
    <div v-if="!!handles">
      <div v-for="h in handles" :key="h.path">
        {{ h.path }}
      </div>
    </div>
  </div>
</template>
