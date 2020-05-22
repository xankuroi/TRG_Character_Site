<template>
  <Item
    :url="url"
    :shape="'circle'"
    :expanderStyle="{ background: colors[data.Brand] }"
  >
    <template v-slot:info>
      <div>
        <div class="flex">
          <span class="text-smaller">{{ data.ID }}</span
          ><b> {{ data.Name }}</b>
        </div>
        <div class="text-small">
          <span v-if="data.ATK">({{ data.ATK }})</span>
          <span v-if="data.Extras"> {{ data.Extras }}</span>
          <span v-else> Attack once.</span>
        </div>
      </div>
      <img
        v-if="hasLogo.includes(data.Brand)"
        :src="publicPath + `logos/${data.Brand}.png`"
      />
      <div
        v-else
        :style="{
          color: fontColors[data.Brand],
          fontFamily: fontFamilies[data.Brand],
          padding: '10px'
        }"
      >
        {{ data.Brand }}
      </div>
    </template>
  </Item>
</template>

<script>
import { brandData } from "./mixins/brandData";
import Item from "./Item";

export default {
  mixins: [brandData],
  components: {
    Item
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  computed: {
    url() {
      const id = this.data.ID.replace("#", "");
      if (Number(id) > 300) {
        return this.publicPath + `pins/default.png`;
      }
      return this.publicPath + `pins/${id} ${this.data.Name}.png`;
    }
  }
};
</script>
