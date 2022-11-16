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
          const newContent = editorView.state.doc.toString();
          if (textRecord.content.value === newContent) return;
          textRecord.content.value = newContent;
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
  <div ref="parent"></div>
</template>
