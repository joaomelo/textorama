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
    <h1 class="va-h3">Plain</h1>
    <div class="buttons">
      <va-button icon="note_add" gradient @click="emit('new')">New</va-button>
      <va-button icon="file_open" gradient @click="emit('open')">
        Open
      </va-button>
      <va-button
        icon="save"
        gradient
        :disabled="props.saveDisabled"
        @click="emit('save')"
      >
        Save
      </va-button>
      <va-button icon="save_as" gradient @click="emit('save-as')">
        Save As
      </va-button>
    </div>
  </div>
</template>

<style scoped>
.bar {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.buttons {
  display: flex;
  gap: 4px;
}
</style>
