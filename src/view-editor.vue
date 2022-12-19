<script setup>
import { ref, onMounted, watch } from "vue";
import {
  drawSelection,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, historyKeymap, history } from "@codemirror/commands";
import {
  bracketMatching,
  defaultHighlightStyle,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import {
  highlightSelectionMatches,
  openSearchPanel,
  closeSearchPanel,
} from "@codemirror/search";
import { closeBrackets, autocompletion } from "@codemirror/autocomplete";
import { markdown } from "@codemirror/lang-markdown";

const props = defineProps({
  showSearch: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["changed"]);

const parent = ref(null);
let editorView = null;
onMounted(() => {
  const initialState = EditorState.create({
    extensions: [
      lineNumbers(),
      EditorView.lineWrapping,
      highlightActiveLineGutter(),
      history(),
      drawSelection(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      markdown(),
      EditorView.updateListener.of((v) => {
        if (v.docChanged) {
          emit("changed", editorView.state.doc.toString());
        }
      }),
    ],
    doc: props.content,
  });

  editorView = new EditorView({
    parent: parent.value,
    state: initialState,
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

watch(
  () => props.showSearch,
  (newShowSearch) => {
    if (newShowSearch) {
      openSearchPanel(editorView);
    } else {
      closeSearchPanel(editorView);
    }
  }
);
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
