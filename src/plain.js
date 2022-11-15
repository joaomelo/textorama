import { ref, computed, watch } from "vue";
import welcome from "../README.md?raw";

export class Plain {
  static options = {
    types: [
      {
        description: "Text files",
        accept: { "text/plain": [".txt", ".md"] },
      },
    ],
  };

  constructor() {
    this.link = ref(null);
    this.fileName = computed(() => {
      if (!this.link.value) return null;
      return this.link.value.name;
    });
    this.status = ref("dirty");
    this.content = ref(welcome);
    watch(this.content, () => {
      this.status.value = "dirty";
    });
  }

  async new() {
    this.content.value = null;
    await this.saveAs();
    this.status.value = "clean";
  }

  async open() {
    const [handle] = await showOpenFilePicker(this.options);
    this.link.value = handle;

    const file = await handle.getFile();
    this.content.value = await file.text();

    this.status.value = "clean";
  }

  async save() {
    if (!this.link.value) return;

    const stream = await this.link.value.createWritable();
    stream.write(this.content.value);
    stream.close();

    this.status.value = "clean";
  }

  async saveAs() {
    this.link.value = await showSaveFilePicker(this.options);
    await this.save();
  }
}
