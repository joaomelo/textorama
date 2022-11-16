import { ref, computed, watch } from "vue";

export class TextRecord {
  constructor(initialContent = null) {
    this.content = ref(initialContent);
    this.status = ref("dirty");
    watch(this.content, () => {
      this.status.value = "dirty";
    });

    this.fileLink = ref(null);
    this.fileName = computed(() => {
      if (!this.fileLink.value) return null;
      return this.fileLink.value.name;
    });

    this.canSave = computed(() => {
      if (!this.fileLink.value) return false;
      return this.status.value === "dirty";
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
    const [handle] = await showOpenFilePicker(this.options);
    this.fileLink.value = handle;

    const file = await handle.getFile();
    this.content.value = await file.text();

    this.status.value = "clean";
  }

  async new() {
    this.content.value = null;
    await this.saveAs();
  }

  async saveAs() {
    this.fileLink.value = await showSaveFilePicker(this.options);
    await this.save();
  }

  async save() {
    if (!this.canSave.value) return;

    const stream = await this.fileLink.value.createWritable();
    stream.write(this.content.value);
    stream.close();

    this.status.value = "clean";
  }
}
