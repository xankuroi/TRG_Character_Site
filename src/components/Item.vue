<template>
  <div class="item-container" :class="[shape, expanded ? 'expanded' : '']" @click="toggleExpand">
    <img class="img" :src="url" />
    <div class="info-container" :style="expanderStyle" ref="content">
      <slot name="info" />
    </div>
    <div class="after">
      <slot name="after" />
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
      expanded: false,
      pageWidth: window.width,
      position: 0
    };
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    handleResize() {
      this.pageWidth = window.innerWidth;
      this.position = this.$refs.content.getBoundingClientRect().x;
    }
  },
  mounted() {
    this.handleResize();
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style scoped>
.img {
  top: 0;
  left: 0;
  position: absolute;
  z-index: 1;
}

.img:hover {
  cursor: pointer;
}

.text-smaller {
  margin-right: 0.5em;
}

.item-container {
  display: inline-block;
  height: 48px;
  position: relative;
  margin-bottom: 2px;
  margin-left: 5px;
  min-width: 48px;
  white-space: nowrap;
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
  top: 0;
  transition: 0.2s;
  width: max-content;
  z-index: -1;
}

.expanded .info-container {
  padding-left: 55px;
  max-width: max-content;
  z-index: 2;
}

.circle .info-container {
  border-radius: 48px;
}

.circle {
  background: var(--border-color);
  border-radius: 48px;
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

.after {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 24px;
}
</style>
