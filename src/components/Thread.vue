<template>
  <div :class="[size, 'pin']">
    <img :src="publicPath + 'pins/Pin_001.png'" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: "small"
    }
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }
};
</script>

<style scoped>
.pin {
  display: inline-block;
}
.small {
  height: 50px;
  width: 50px;
}
</style>
