<script setup>
import { ref, onMounted } from "vue";
import { EditorView, basicSetup } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";

const editor = ref(null);

onMounted(() => {
  const view = new EditorView({
    extensions: [basicSetup, markdown()],
    parent: editor.value,
  });
  console.log({ view });
});
</script>
<template>
  <div class="app">
    <div>toolbar</div>
    <div ref="editor"></div>
    <div>statusbar</div>
  </div>
</template>

<style>
.app {
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
}
</style>
