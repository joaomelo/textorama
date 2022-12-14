<script setup>
import { watch, computed, ref } from "vue";
import ViewTop from "./view-top.vue";
import ViewBottom from "./view-bottom.vue";
import ViewDashboard from "./view-dashboard.vue";

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

const handleNew = () => props.textRecord.new();
const handleOpen = () => props.textRecord.openAs();
const handleSaveAs = () => props.textRecord.saveAs();
const handleSave = () => props.textRecord.save();

const showSearch = ref(false);
const handleSearch = () => (showSearch.value = !showSearch.value);
const handleChanged = (newContent) => props.textRecord.dirty(newContent);

const handles = ref(null);

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
      <ViewDashboard
        :show-search="showSearch"
        :content="props.textRecord.content.value"
        :handles="handles"
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
  --header-size: 50px;
  --footer-size: 16px;
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
