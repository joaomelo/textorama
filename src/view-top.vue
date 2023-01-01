<script setup>
import ActionButton from "./action-button.vue";
import BaseBar from "./base-bar.vue";

const props = defineProps({
  canLink: {
    type: Boolean,
    default: false,
  },
  hasLink: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["new", "open", "save-as", "save", "search"]);
</script>

<template>
  <BaseBar class="bar">
    <template #start>
      <h1 class="va-h3 title">Textorama</h1>
    </template>
    <template #end>
      <div class="buttons">
        <ActionButton
          id="new"
          label="new"
          icon="note_add"
          :shortcut="(e) => e.key === 'n' && e.altKey"
          @action="emit('new')"
        />
        <ActionButton
          id="open"
          label="open"
          icon="file_open"
          :shortcut="(e) => e.key === 'o' && (e.ctrlKey || e.metaKey)"
          @action="emit('open')"
        />
        <ActionButton
          v-if="props.canLink"
          id="save"
          label="save"
          icon="save"
          :disabled="props.hasLink"
          :shortcut="(e) => e.key === 's' && (e.ctrlKey || e.metaKey)"
          @action="emit('save')"
        />
        <ActionButton
          id="save-as"
          :label="props.canLink ? 'save as' : 'download'"
          icon="save_as"
          :shortcut="(e) => e.key === 'd' && (e.ctrlKey || e.metaKey)"
          @action="emit('save-as')"
        />
        <ActionButton
          id="search"
          label="search"
          icon="search"
          :shortcut="(e) => e.key === 'f' && (e.ctrlKey || e.metaKey)"
          @action="emit('search')"
        />
      </div>
    </template>
  </BaseBar>
</template>

<style scoped>
.bar {
  border-bottom: var(--va-primary) solid 2px;
  padding-block: 4px;
}

.title {
  color: var(--va-primary);
  margin: 0;
}

.buttons {
  display: flex;
  gap: 4px;
}
</style>
