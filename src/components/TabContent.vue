<template>
  <div class="tab-content">
    <slot name="hero" />
    <div class="content">
      <slot name="content" />
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

@media (max-width: 450px) {
  .tab-content {
    padding: 10px 5px;
  }
}
</style>
