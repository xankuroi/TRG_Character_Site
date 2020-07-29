<template>
  <Item :url="url" shape="circle" :background="colors[data.Brand]">
    <template #info>
      <div>
        <div class="flex">
          <span class="text-smaller">{{ data.ID }}</span>
          <b>{{ data.Name }}</b>
          <span v-if="data.d" class="text-smaller" style="margin-left: 0.5em;">w/ CD</span>
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
      const id = this.data.ID.replace("#", "");
      if (Number(id) > 300) {
        return `https://avatars.dicebear.com/api/jdenticon/${
          this.data.Name
        }.svg?radius=50&background=%23${this.color || "fff"}`;
      }
      return this.publicPath + `pins/${id} ${this.data.Name}.png`;
    },
    totalAttack() {
      if (this.data.d) {
        return this.data.ATK + this.atk + 10;
      }
      return this.data.ATK + this.atk;
    },
  },
};
</script>
