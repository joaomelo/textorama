import { onMounted, onUnmounted } from "vue";

export function useResize({ split, target, inverted = false }) {
  let x = null;

  const handleMouseMove = (e) => {
    const delta = (e.clientX - x) * (inverted ? -1 : 1);
    const width = target.value.getBoundingClientRect().width;
    const newWidth = width + delta;
    target.value.style.width = `${newWidth}px`;
    x = e.clientX;
  };

  const handleMouseStop = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseStop);
    x = null;
  };

  const handleMouseDown = (e) => {
    x = e.clientX;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseStop);
  };

  const handleDoubleClick = (e) => {
    target.value.style.width = 0;
  };

  onMounted(() => {
    if (!split?.value) return;
    add(split.value, "mousedown", handleMouseDown);
    add(split.value, "dblclick", handleDoubleClick);
  });
  onUnmounted(() => {
    if (!split?.value) return;
    remove(split.value, "mousedown", handleMouseDown);
    remove(split.value, "dblclick", handleDoubleClick);
  });
}

function add(el, e, handle) {
  el.addEventListener(e, handle);
}

function remove(el, e, handle) {
  el.removeEventListener(e, handle);
}
