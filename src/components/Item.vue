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
      default: "circle"
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
  }
};
</script>

<style>
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

.item-container img {
  height: 100%;
}

.info-container {
  align-items: center;
  color: black;
  display: flex;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: 0.2s;
  width: max-content;
  z-index: -1;
}

.circle .info-container {
  border-radius: 48px;
  max-width: 26px;
  padding-left: 10px;
  padding-right: 10px;
}

.circle img:hover + .info-container,
.circle .info-container:hover,
.circle.expanded .info-container {
  padding-left: 60px;
  max-width: 400px;
}

img:hover {
  cursor: pointer;
}

img:hover + .info-container,
.info-container:hover,
.expanded .info-container {
  max-width: 400px;
}
</style>
