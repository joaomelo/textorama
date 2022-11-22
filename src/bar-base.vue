<template>
  <div class="wrapper">
    <div class="content">
      <div class="desktop"><slot name="start"></slot></div>
      <div><slot name="end"></slot></div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 4px;
}

.content {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  max-width: var(--max-width);
  flex: 1;
}

.desktop {
  display: none;
}

@media (min-width: 480px) {
  .content {
    justify-content: space-between;
  }

  .desktop {
    display: initial;
  }
}
</style>
