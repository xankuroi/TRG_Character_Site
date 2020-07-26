<template>
  <div
    class="item-container"
    ref="self"
    :class="[shape, expanded ? 'expanded' : '']"
    @click="toggleExpand"
    @mouseover="onMouseover"
  >
    <img class="img" :src="url" />
    <div class="info-container" :style="containerStyle" ref="content">
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
    background: {
      type: String,
      default: ""
    },
    shape: {
      type: String,
      default: "square"
    }
  },
  data() {
    return {
      expanded: false,
      maxWidth: 0,
      scroller: null,
      prevLeft: 0,
      smoothScroll: false,
      loops: -3
    };
  },
  computed: {
    containerStyle() {
      let style = {};
      if (this.background) {
        style.background = this.background;
      }
      if (this.smoothScroll) {
        style["scroll-behavior"] = "smooth";
      }
      style.width = this.maxWidth - 90 + "px";
      return style;
    }
  },
  methods: {
    toggleExpand() {
      this.maxWidth = this.$refs.self.parentNode.clientWidth;
      if (this.expanded) {
        this.$refs.content.scrollLeft = 0;
      }
      this.clearTimers();
      this.expanded = !this.expanded;
      if (this.expanded && this.diff() > 0) {
        this.setAutoScroll();
      }
    },
    scrollLeft() {
      return this.$refs.content.scrollLeft;
    },
    contentWidth() {
      const children = [...this.$refs.content.children];
      return children.reduce((acc, curr) => acc + curr.offsetWidth, 0);
    },
    autoScroll() {
      this.$refs.content.scrollLeft += 1;
      if (this.$refs.content.scrollLeft === this.prevLeft) {
        this.clearTimers();
        this.loops += 1;
        this.smoothScroll = true;
        this.scroller = setTimeout(() => {
          this.$refs.content.scrollLeft = 0;
          this.clearTimers();
          if (this.loops < 1) {
            this.scroller = setTimeout(this.setAutoScroll, 500);
          }
        }, 500);
      } else {
        this.prevLeft = this.$refs.content.scrollLeft;
      }
    },
    clearTimers() {
      clearInterval(this.scroller);
      clearTimeout(this.scroller);
      this.scroller = null;
    },
    setAutoScroll() {
      this.smoothScroll = false;
      this.scroller = setInterval(this.autoScroll, 3500 / this.diff());
    },
    diff() {
      return this.contentWidth() + 150 - this.maxWidth;
    },
    onMouseover() {
      if (this.diff() > 0 && this.loops > 0) {
        this.loops = 0;
        if (this.expanded && !this.scroller) {
          this.setAutoScroll();
        }
      }
    }
  },
  mounted() {
    this.maxWidth = this.$refs.self.parentNode.clientWidth;
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
  user-select: none;
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
