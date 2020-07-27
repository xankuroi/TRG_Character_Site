<template>
  <div class="inventory">
    <div class="title">
      <slot name="title" />
    </div>
    <div class="button-container">
      <button v-if="showExpander" @click="$emit('toggle', false)">
        <font-awesome-icon :icon="['fas', 'compress-alt']" style="transform: rotate(45deg)" />
      </button>
      <button v-if="showExpander" @click="$emit('toggle', true)">
        <font-awesome-icon :icon="['fas', 'arrows-alt-h']" />
      </button>
    </div>
    <slot />
    <div class="clear" />
  </div>
</template>

<script>
export default {
  props: {
    showExpander: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.inventory {
  border: 2px solid var(--border-color);
  border-radius: 3px;
  display: block;
  margin: 15px 0;
  padding: 5px;
  padding-top: 15px;
  position: relative;
}

.title {
  background: var(--background-color);
  padding: 0 3px;
  position: absolute;
  top: -10px;
}

.button-container {
  background: var(--background-color);
  padding: 0 3px;
  position: absolute;
  top: -10px;
  right: 3px;
}
</style>