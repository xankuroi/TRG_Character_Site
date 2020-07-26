<template>
  <div class="tile">
    <b :style="color">{{ name }}</b>
    <div style="display: inline-block;">
      <slot name="before" />
      {{ stats.total }}
      <slot name="after" />
      <span v-if="additional" class="add flex">
        <span class="text-smaller">▲</span>
        {{ additional }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      default: () => {
        return { raw: 0, training: 0, misc: 0 };
      }
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: Object,
      required: true
    }
  },
  computed: {
    additional() {
      return this.stats.total - this.stats.raw;
    }
  }
};
</script>

<style scoped>
.tile {
  align-items: center;
  border: 2px solid var(--border-color);
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  padding: 0 3px;
  margin: 0 2px;
}

.tile b:first-child {
  margin-right: 10px;
}

.flex {
  display: inline-flex;
}

.add {
  color: green;
  font-size: 0.8em;
}
</style>
