import { ref, computed } from "vue";
import {
  canLink,
  newTextFile,
  saveToThisTextFile,
  openTextFile,
  openThisTextFile,
} from "./files";

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
    const content = "";
    if (canLink) {
      const { success, handle } = await newTextFile(content);
      if (!success) return;
      this.fileHandle.value = handle;
    }
    this.clean(content);
  }

  async saveAs() {
    const content = this.content.value;

    const { success, handle } = await newTextFile(content);
    if (!success) return;

    this.fileHandle.value = handle;
    this.clean();
  }

  async save() {
    const content = this.content.value;
    const handle = this.fileHandle.value;

    const { success } = await saveToThisTextFile({ content, handle });
    if (!success) return;

    this.clean();
  }

  async openAs() {
    const { success, content, handle } = await openTextFile();
    if (!success) return;

    if (canLink) {
      this.fileHandle.value = handle;
    }

    this.clean(content);
  }

  async open(handle) {
    const { success, content } = await openThisTextFile(handle);
    if (!success) return;

    this.fileHandle.value = handle;
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
