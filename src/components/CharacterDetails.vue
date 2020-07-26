<template>
  <simplebar class="text-small flex-col">
    <div class="flex">
      <template v-if="isPlayer(data)">
        <div class="flex block">
          <div>
            <h4 :style="data.Color">Entry Fee</h4>
            <p>{{ data["Entry Fee"] }}</p>
          </div>
          <div>
            <h4 :style="data.Color">Personality</h4>
            <p>{{ data.Personality }}</p>
          </div>
        </div>
        <div class="block">
          <h4 :style="data.Color">Reason to Live</h4>
          <p>{{ data["Reason to Live"] }}</p>
        </div>
      </template>
    </div>
    <div>
      <h4 :style="data.Color">Appearance</h4>
      <p>{{ data.Appearance }}</p>
    </div>
    <div class="image-container">
      <img :src="data['Image URL']" />
    </div>
  </simplebar>
</template>

<script>
import { isPlayer } from "./mixins/utilities";
import simplebar from "simplebar-vue";

export default {
  components: {
    simplebar
  },
  mixins: [isPlayer],
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.flex {
  align-items: start;
  flex-wrap: wrap;
}

.flex > div {
  flex-grow: 1;
  margin-right: 5px;
}

.flex-color {
  flex-wrap: wrap;
}

.image-container {
  display: none;
}

.block {
  min-width: 40%;
}

@media (max-width: 600px) {
  .image-container {
    display: block;
    height: 200px;
    margin: 0 auto;
    width: 200px;
  }
}
</style>
