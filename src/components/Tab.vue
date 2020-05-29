<template>
  <div
    class="tab"
    :class="{ active: active }"
    :style="tabStyle"
    @click="$emit('click')"
  >
    <template v-if="name">
      {{ name }}
    </template>
    <slot v-else />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    color: {
      type: String
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tabStyle() {
      let c = this.color
        ? this.color
        : getComputedStyle(document.documentElement).getPropertyValue(
            "--text-color"
          );
      let style = { color: c };
      if (this.active) {
        style["border-color"] = c;
      }
      return style;
    }
  }
};
</script>

<style scoped>
.tab {
  border-bottom: 3px solid transparent;
  cursor: pointer;
  display: inline-block;
  font-family: Montserrat, sans-serif;
  font-weight: bold;
  margin: 10px;
  opacity: 0.5;
  transition: 0.2s;
}

.tab:hover {
  opacity: 1;
}
</style>
