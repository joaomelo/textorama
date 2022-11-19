import { ref, computed } from "vue";
import { fileOpen } from "https://unpkg.com/browser-fs-access";

export class TextRecord {
  constructor(initialContent = "") {
    this.content = ref(initialContent);
    this.status = ref("dirty");

    this.fileLink = ref(null);
    this.fileName = computed(() => {
      if (!this.fileLink.value) return null;
      return this.fileLink.value.name;
    });
  }

  static options = {
    types: [
      {
        description: "Text files",
        accept: { "text/plain": [".txt", ".md"] },
      },
    ],
  };

  async open() {
    const blob = await fileOpen({
      mimeTypes: ["text/plain"],
      extensions: [".txt", ".md"],
      description: "Text files",
    });

    this.fileLink.value = blob.handle;
    console.log({ blob });

    // this.content.value = await file.text();

    this.status.value = "clean";

    // const [handle] = await showOpenFilePicker(this.options);
    // this.fileLink.value = handle;

    // const file = await handle.getFile();
    // this.content.value = await file.text();

    // this.status.value = "clean";
  }

  async new() {
    this.content.value = "";
    await this.saveAs();
  }

  async saveAs() {
    this.fileLink.value = await showSaveFilePicker(this.options);
    await this.save();
  }

  async save() {
    if (!this.fileLink.value) return;

    const stream = await this.fileLink.value.createWritable();
    stream.write(this.content.value);
    stream.close();

    this.status.value = "clean";
  }

  draft(newContent) {
    const a = this.content.value.replaceAll(/\r\n/gm, "\n");
    const b = newContent.replaceAll(/\r\n/gm, "\n");
    const areEqual = a === b;
    if (areEqual) return;

    this.content.value = newContent;
    this.status.value = "dirty";
  }
}
