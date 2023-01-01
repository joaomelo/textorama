<script setup>
import { ref } from "vue";
import { useResize } from "./use-resize";
import ViewEditor from "./view-editor.vue";
import ViewExplorer from "./view-explorer.vue";

defineProps({
  handles: {
    type: Object,
    default: null,
  },
});

const leftSplit = ref(null);
const leftBuffer = ref(null);
useResize({ split: leftSplit, target: leftBuffer });

const rightSplit = ref(null);
const rightBuffer = ref(null);
useResize({ split: rightSplit, target: rightBuffer, inverted: true });
</script>
<script>
export default {
  inheritAttrs: false,
};
</script>
<template>
  <div class="dashboard">
    <div ref="leftBuffer" class="buffer">
      <ViewExplorer :handles="handles" />
    </div>
    <div ref="leftSplit" class="split left"></div>
    <div class="editor"><ViewEditor v-bind="$attrs" /></div>
    <div ref="rightSplit" class="split right"></div>
    <div ref="rightBuffer" class="buffer"></div>
  </div>
</template>

<style scoped>
.dashboard {
  /* flex was the solution to restrict the editor height under the main boundaries */
  display: flex;
  max-height: 100%;
  min-height: 100%;
}

.editor {
  flex: 1;
}

.split {
  --border-width: 1px;
  --border-style: dashed;
  --border-color: var(--va-primary);
  width: 8px;
  cursor: col-resize;
  user-select: none;
}

.split:hover {
  --border-style: solid;
  --border-width: 2px;
}

.split.left {
  border-right: var(--border-width) var(--border-style) var(--border-color);
}
.split.right {
  border-left: var(--border-width) var(--border-style) var(--border-color);
}

.buffer {
  width: 16px;
}

.split,
.buffer {
  display: none;
}

@media (min-width: 640px) {
  .split,
  .buffer {
    display: revert;
  }
}
</style>
