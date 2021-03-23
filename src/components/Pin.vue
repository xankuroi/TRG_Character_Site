<template>
  <Item :url="url" shape="circle" :background="colors[data.Brand]">
    <template #info>
      <div>
        <div class="flex">
          <span class="text-smaller">{{ data.ID }}</span>
          <b>{{ data.Name }}</b>
          <font-awesome-icon v-if="data.r" class="boost-indicator" :icon="['fas', 'certificate']" />
          <font-awesome-icon v-if="data.d" class="boost-indicator" :icon="['fas', 'compact-disc']" />
        </div>
        <div class="text-small">
          <span v-if="data.ATK">{{ data.ATK }} ({{ totalAttack }})&nbsp;</span>
          <span v-if="data.Extras">{{ data.Extras }}</span>
          <span v-else>Attack once.</span>
        </div>
      </div>
      <img v-if="hasLogo.includes(data.Brand)" :src="publicPath + `logos/${data.Brand}.png`" />
      <div
        v-else
        :style="{
          color: fontColors[data.Brand],
          fontFamily: fontFamilies[data.Brand],
          padding: '10px'
        }"
      >{{ data.Brand.startsWith('Unbranded') ? '' : data.Brand }}</div>
    </template>
  </Item>
</template>

<script>
import { brandData } from "./mixins/utilities";
import Item from "./Item";

export default {
  mixins: [brandData],
  components: {
    Item,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    atk: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  computed: {
    color() {
      let color = this.fontColors[this.data.Brand];
      if (color) {
        return color.substring(1);
      }
      return null;
    },
    url() {
      if (this.$legacyPinImages) {
        const id = this.data.ID.replace("#", "");
        if (Number(id) < 300) {
          return this.publicPath + `pins/${id} ${this.data.Name}.png`;
        }
      }
      if (this.data.ImgSM) {
        return this.data.ImgSM;
      }
      return `https://avatars.dicebear.com/api/jdenticon/${
        this.data.Name
      }.svg?radius=50&background=%23${this.color || "fff"}`;
    },
    totalAttack() {
      let subtotal = this.data.ATK + this.atk;
      if (this.data.r) {
        subtotal = Math.ceil(subtotal * 1.5);
      }
      if (this.data.d) {
        subtotal += 10;
      }
      return subtotal;
    },
  },
};
</script>

<style scoped>
.boost-indicator {
  font-size: 0.7em;
  margin-left: 2px;
}
</style>
