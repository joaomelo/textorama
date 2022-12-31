<template>
  <div class="content">
    <div class="desktop"><slot name="start"></slot></div>
    <div><slot name="end"></slot></div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-inline: 4px;
}

.desktop {
  display: none;
}

@media (min-width: 640px) {
  .content {
    justify-content: space-between;
  }

  .desktop {
    display: initial;
  }
}
</style>
