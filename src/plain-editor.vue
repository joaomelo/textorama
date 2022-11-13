<script setup>
import { ref, onMounted, watch } from "vue";
import { EditorView, basicSetup } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";

const props = defineProps({ content: { type: String, default: "" } });
const emit = defineEmits(["update:content"]);

const parent = ref(null);
let editorView = null;

onMounted(() => {
  editorView = new EditorView({
    extensions: [
      basicSetup,
      markdown(),
      EditorView.updateListener.of((v) => {
        if (v.docChanged) {
          const content = editorView.state.doc.toString();
          if (props.content === content) return;
          emit("update:content", content);
        }
      }),
    ],
    parent: parent.value,
  });
});

watch(
  () => props.content,
  (newContent) => {
    if (newContent === editorView.state.doc.toString()) return;
    const update = editorView.state.update({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: newContent,
      },
    });
    editorView.update([update]);
  }
);
</script>
<template>
  <va-card outlined>
    <div ref="parent"></div>
  </va-card>
</template>
