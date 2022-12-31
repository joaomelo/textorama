<script setup>
import { ref } from "vue";
import { useResize } from "./use-resize";
import ViewEditor from "./view-editor.vue";

const left = ref(null);
const explorer = ref(null);
useResize({ split: left, target: explorer });

const right = ref(null);
const buffer = ref(null);
useResize({ split: right, target: buffer, inverted: true });
</script>
<script>
export default {
  inheritAttrs: false,
};
</script>
<template>
  <div class="dashboard">
    <div ref="explorer" class="explorer"></div>
    <div ref="left" class="left split"></div>
    <div class="editor"><ViewEditor v-bind="$attrs" /></div>
    <div ref="right" class="right split"></div>
    <div ref="buffer" class="buffer"></div>
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
  border-left: 1px dashed var(--va-primary);
  width: 4px;
  cursor: col-resize;
  user-select: none;
}
</style>
