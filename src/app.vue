<script setup>
import { watch, computed, ref } from "vue";
import ViewTop from "./view-top.vue";
import ViewBottom from "./view-bottom.vue";
import ViewEditor from "./view-editor.vue";

const props = defineProps({
  version: {
    type: String,
    required: true,
  },
  textRecord: {
    type: Object,
    required: true,
  },
});

const unload = () => "Are you sure want to leave before saving?";
watch(props.textRecord.status, (status) => {
  window.onbeforeunload = status === "clean" ? null : unload;
});

const handleNew = () => props.textRecord.newAs();
const handleOpen = () => props.textRecord.openAs();
const handleSaveAs = () => props.textRecord.saveAs();
const handleSave = () => props.textRecord.save();

const showSearch = ref(false);
const handleSearch = () => (showSearch.value = true);
const handleChanged = (newContent) => props.textRecord.dirty(newContent);

const hasLink = computed(() => !props.textRecord.fileHandle.value);
</script>
<template>
  <div class="app">
    <header>
      <ViewTop
        :can-link="!!props.textRecord.canLink"
        :has-link="hasLink"
        @new="handleNew"
        @open="handleOpen"
        @save-as="handleSaveAs"
        @save="handleSave"
        @search="handleSearch"
      />
    </header>
    <main>
      <ViewEditor
        :show-search="showSearch"
        :content="props.textRecord.content.value"
        @changed="handleChanged"
      />
    </main>
    <footer>
      <ViewBottom
        :version="props.version"
        :file-name="props.textRecord.fileName.value"
        :status="props.textRecord.status.value"
      />
    </footer>
  </div>
</template>

<style scoped>
.app {
  position: relative;
  height: 100vh;
  --header-size: 64px;
  --footer-size: 16px;
  --max-width: 1024px;
}

header,
main,
footer {
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
}

header {
  top: 0;
  height: var(--header-size);
}

main {
  top: var(--header-size);
  bottom: var(--footer-size);
}

footer {
  bottom: 0px;
  height: var(--footer-size);
}
</style>
