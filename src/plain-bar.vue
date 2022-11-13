<script setup>
const props = defineProps({
  saveDisabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["open", "save", "save-as"]);
</script>

<template>
  <div class="bar">
    <button @click="emit('open')">Open</button>
    <button :disabled="props.saveDisabled" @click="emit('save')">Save</button>
    <button @click="emit('save-as')">Save As</button>
  </div>
</template>

<style>
.bar {
  display: flex;
  gap: 8px;
}
</style>
