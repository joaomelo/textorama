import { ref, onMounted, onBeforeUnmount } from "vue";

export function useWidth() {
  const width = ref(window.innerWidth);
  const handle = () => (width.value = window.innerWidth);

  onMounted(() => addEventListener("resize", handle));
  onBeforeUnmount(() => removeEventListener("resize", handle));

  return width;
}
