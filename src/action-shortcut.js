import { onMounted, onBeforeUnmount } from "vue";

export function useShortcut({ is, on }) {
  const handle = (e) => {
    if (is(e)) {
      e.preventDefault();
      on(e);
    }
  };

  onMounted(() => {
    document.addEventListener("keydown", handle);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("keydown", handle);
  });
}
