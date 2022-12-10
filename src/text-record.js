import { ref, computed } from "vue";
import { canLink, saveTextFileAs, openTextFile } from "./files";

export class TextRecord {
  constructor() {
    this.canLink = canLink;

    this.fileHandle = ref(null);
    this.fileName = computed(() => {
      if (!this.fileHandle.value) return null;
      return this.fileHandle.value.name;
    });

    this.status = ref(null);
    this.content = ref(null);
  }

  async newAs() {
    const newContent = "";
    if (canLink) {
      const { success, handle } = await saveTextFileAs(newContent);
      if (!success) return;
      this.fileHandle.value = handle;
    }
    this.clean(newContent);
  }

  async saveAs() {
    const newContent = this.content.value;
    const { success, handle } = await saveTextFileAs(newContent);
    if (success) {
      this.fileHandle.value = handle;
      this.clean();
    }
  }

  async open() {
    const { success, content, handle } = await openTextFile();
    if (!success) return;

    if (canLink) {
      this.fileHandle.value = handle;
    }
    this.clean(content);
  }

  dirty(newContent) {
    if (this.content.value) {
      const a = this.content.value.replaceAll(/\r\n/gm, "\n");
      const b = newContent.replaceAll(/\r\n/gm, "\n");
      if (a === b) return;
    }

    this.content.value = newContent;
    this.status.value = "dirty";
  }

  clean(newContent) {
    if (newContent || newContent === "") {
      this.content.value = newContent;
    }
    this.status.value = "clean";
  }
}
