<template>
  <div>
    <img src="{{ imageURL }}" />
  </div>
</template>

<script>
export default {
  props: {
    imageURL: {
      type: String,
      default: "https://via.placehold.it/200x200" // TODO: replace with actual placeholder
    }
  }
};
</script>