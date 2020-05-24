<template>
  <div class="tile">
    <b :style="color">{{ name }}</b>
    <slot></slot>
    <span v-if="total">{{ total }}</span>
    <span v-if="additional" class="add flex">
      <span class="text-smaller">▲</span>
      {{ additional }}
    </span>
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
    total() {
      return this.sum(this.stats) - (this.stats.current || 0);
    },
    additional() {
      return this.total - this.stats.raw;
    }
  },
  methods: {
    sum(statsObject) {
      return Object.values(statsObject).reduce((s, x) => s + x);
    }
  }
};
</script>

<style scoped>
.tile {
  align-items: center;
  border: 2px solid lightgray;
  border-radius: 3px;
  display: flex;
  padding: 0 3px;
  margin: 0 2px;
}

.tile b:first-child {
  margin-right: 5px;
}

.add {
  color: green;
  font-size: 0.8em;
}
</style>
