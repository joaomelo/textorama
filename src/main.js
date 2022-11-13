import { EditorView, basicSetup } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";

let view = new EditorView({
  extensions: [basicSetup, markdown()],
  parent: document.body,
});
