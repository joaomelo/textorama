<script setup>
import { useWidth } from "./use-width";
import { useShortcut } from "./use-shortcut";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  shortcut: {
    type: Function,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["action"]);

useShortcut({
  is: props.shortcut,
  on: () => emit("action"),
});

const width = useWidth();
</script>

<template>
  <va-button
    :id="props.id"
    :icon="icon"
    gradient
    :disabled="props.disabled"
    class="button"
    @click="emit('action')"
  >
    {{ width > 480 ? props.label : "" }}
  </va-button>
</template>
