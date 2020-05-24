<template>
  <div class="tab-content">
    <h1 class="header" :style="color">
      <slot name="title"></slot>
    </h1>
    <div class="hero">
      <slot name="hero"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style scoped>
.tab-content {
  padding: 10px;
  position: relative;
}

.header {
  background: white;
  border-radius: 5px;
  margin: 0;
  padding: 0 5px;
  position: absolute;
  top: -1em;
  left: -5px;
}
</style>
