<script setup>
import { ref, onMounted, watch, inject } from "vue";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";

const textRecord = inject("text-record");

const parent = ref(null);
let editorView = null;
onMounted(() => {
  const initialState = EditorState.create({
    extensions: [
      basicSetup,
      EditorView.lineWrapping,
      markdown(),
      EditorView.updateListener.of((v) => {
        if (v.docChanged) {
          textRecord.dirty(editorView.state.doc.toString());
        }
      }),
    ],
    doc: textRecord.content.value,
  });

  editorView = new EditorView({
    parent: parent.value,
    state: initialState,
  });
});

watch(textRecord.content, (newContent) => {
  if (newContent === editorView.state.doc.toString()) return;
  const update = editorView.state.update({
    changes: {
      from: 0,
      to: editorView.state.doc.length,
      insert: newContent,
    },
  });
  editorView.update([update]);
});
</script>
<template>
  <div ref="parent" class="parent"></div>
</template>
<style scoped>
.parent {
  max-width: var(--max-width);
  max-height: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin: auto;
}
.parent :deep(.cm-editor) {
  flex-grow: 1;
}
</style>
