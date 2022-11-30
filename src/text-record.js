import { ref, computed } from "vue";
import { supported } from "browser-fs-access";

export class TextRecord {
  constructor(initialContent) {
    this.content = ref(null);
    this.status = ref(null);

    this.fileHandle = ref(null);
    this.fileName = computed(() => {
      if (!this.fileHandle.value) return null;
      return this.fileHandle.value.name;
    });

    this.open(initialContent);
  }

  async open(source = "") {
    let handle, content;
    if (supported && source instanceof FileSystemFileHandle) {
      handle = source;
      const file = await source.getFile();
      content = await file.text();
    } else if (typeof source === "string") {
      handle = null;
      content = source;
    } else {
      throw new Error("Opens only 'FileSystemFileHandle' or 'string'");
    }

    this.fileHandle.value = handle;
    this.content.value = content;
    this.status.value = "clean";
  }

  async save(source) {
    if (supported && source instanceof FileSystemFileHandle) {
      this.fileHandle.value = source;
    }

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
