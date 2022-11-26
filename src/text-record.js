import { ref, computed } from "vue";
import { fileOpen, fileSave, supported } from "browser-fs-access";

export class TextRecord {
  constructor(initialContent = "") {
    this.supportsFiles = supported;

    this.content = ref(initialContent);
    this.status = ref("dirty");

    this.fileLink = ref(null);
    this.fileName = computed(() => {
      if (!this.fileLink.value) return null;
      return this.fileLink.value.name;
    });
  }

  static mimeType = "text/plain";
  static options = {
    mimeTypes: [TextRecord.mimeType],
    extensions: [".txt", ".md"],
    description: "Text files",
    fileName: "Untitled.txt",
  };

  async open() {
    const file = await fileOpen(TextRecord.options);

    this.fileLink.value = file.handle;
    this.content.value = await file.text();
    this.status.value = "clean";
  }

  async new() {
    this.content.value = "";
    if (this.supportsFiles) {
      await this.saveAs();
    }
  }

  async saveAs() {
    this.fileLink.value = await fileSave(
      new Blob([this.content.value], { type: TextRecord.mimeType }),
      TextRecord.options
    );
    this.status.value = "clean";
  }

  async save() {
    if (!this.supportsFiles || !this.fileLink.value) return;

    await fileSave(
      new Blob([this.content.value], { type: "text/plain" }),
      TextRecord.options,
      this.fileLink.value
    );

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
