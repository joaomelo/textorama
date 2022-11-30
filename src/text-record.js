import { ref, computed } from "vue";

export class TextRecord {
  constructor(initialContent) {
    this.content = ref(null);
    this.status = ref(null);

    this.fileLink = ref(null);
    this.fileName = computed(() => {
      if (!this.fileLink.value) return null;
      return this.fileLink.value.name;
    });
    this.fileHandle = computed(() => {
      if (!this.fileLink.value) return null;
      return this.fileLink.value.handle;
    });

    this.open(initialContent);
  }

  async open(source = "") {
    if (source instanceof File) {
      this.fileLink.value = source;
    } else if (source instanceof FileSystemFileHandle) {
      this.fileLink.value = await source.getFile();
    } else {
      this.fileLink.value = null;
    }

    if (this.fileLink.value) {
      this.content.value = await this.fileLink.value.text();
    } else {
      this.content.value = source;
    }

    this.status.value = "clean";
  }

  async save(source) {
    if (source instanceof File) {
      this.fileLink.value = source;
    } else if (source instanceof FileSystemFileHandle) {
      this.fileLink.value = await source.getFile();
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
