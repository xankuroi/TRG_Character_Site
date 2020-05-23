<template>
  <div @click="toggleExpand">
    <div class="item-container" :class="[shape, expanded ? 'expanded' : '']">
      <img :src="url" />
      <div class="info-container" :style="expanderStyle">
        <slot name="info"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    expanderStyle: {
      type: Object
    },
    shape: {
      type: String,
      default: "square"
    }
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.item-container {
  display: inline-block;
  height: 48px;
  position: relative;
  margin-bottom: 2px;
  margin-left: 5px;
  min-width: 48px;
  white-space: nowrap;
}

.item-container:hover,
.expanded {
  z-index: 2;
}

.info-container {
  align-items: center;
  color: black;
  display: flex;
  height: 100%;
  left: 1px;
  max-width: 26px;
  overflow: hidden;
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;
  top: 0;
  transition: 0.2s;
  width: max-content;
  z-index: -1;
}

.circle .info-container {
  border-radius: 48px;
}

.circle {
  background: lightgrey;
  border-radius: 48px;
  box-sizing: border-box;
  height: 48px;
  margin-bottom: 2px;
  margin-left: 4px;
  width: 48px;
}

.square .info-container {
  --notchSize: 7px;

  clip-path: polygon(
    0% var(--notchSize),
    var(--notchSize) 0%,
    calc(100% - var(--notchSize)) 0%,
    100% var(--notchSize),
    100% calc(100% - var(--notchSize)),
    calc(100% - var(--notchSize)) 100%,
    var(--notchSize) 100%,
    0% calc(100% - var(--notchSize))
  );
}

img:hover {
  cursor: pointer;
}

img:hover + .info-container,
.info-container:hover,
.expanded .info-container {
  padding-left: 55px;
  max-width: 400px;
}

.text-smaller {
  margin-right: 0.5em;
}
</style>
