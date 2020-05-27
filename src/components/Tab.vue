<template>
  <div
    class="tab"
    :class="{ active: active }"
    :style="tabStyle"
    @click="$emit('click')"
  >
    {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
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
      let c = this.color ? this.color : "#2c3e50";
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
  border-bottom: 3px solid rgba(0, 0, 0, 0);
  cursor: pointer;
  display: inline-block;
  font-family: Montserrat, sans-serif;
  font-weight: bold;
  margin: 10px;
  opacity: 0.5;
  transition: 0.2s;
}

.active,
.tab:hover {
  opacity: 1;
}
</style>
