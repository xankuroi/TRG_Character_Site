<template>
  <div class="inventory">
    <div class="title">
      <slot name="title" />
    </div>
    <slot />
    <div class="clear" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.inventory {
  border: 2px solid var(--border-color);
  border-radius: 3px;
  display: block;
  margin: 15px 0;
  padding: 5px;
  padding-top: 15px;
  position: relative;
}

.title {
  background: var(--background-color);
  padding: 0 3px;
  position: absolute;
  top: -10px;
}
</style>