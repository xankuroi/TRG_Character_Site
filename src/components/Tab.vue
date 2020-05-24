<template>
  <div class="tab" @click="$emit('click')">
    {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
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
  border-bottom: 3px solid black;
  opacity: 1;
}
</style>
