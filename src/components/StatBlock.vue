<template>
  <div class="stat-block">
    <button type="button" v-clipboard:copy="data.CP" @click="toast(data.Name)">
      <font-awesome-icon class="fade" :icon="['fas', 'copy']" :style="data.Color" />
    </button>
    <div class="flex">
      <StatTile :stats="data.HP" :color="data.Color" :name="'HP'">
        <template v-slot:before>
          <b :style="hpColor">{{ data.HP.current }}</b>
          <span class="text-smaller">/</span>
        </template>
      </StatTile>
      <StatTile :stats="data.ATK" :color="data.Color" :name="'ATK'" />
    </div>
    <div class="flex">
      <StatTile :stats="data.DEF" :color="data.Color" :name="'DEF'" />
      <StatTile
        v-if="data.BRV !== undefined"
        :stats="{ total: data.BRV }"
        :color="data.Color"
        :name="'BRV'"
      />
      <StatTile
        v-if="data.Role === 'Player'"
        :stats="{ total: data.SYNC }"
        :color="data.Color"
        :name="'SYNC'"
      >
        <template v-slot:after>%</template>
      </StatTile>
    </div>
    <div class="flex" style="float:right;">
      <StatTile :stats="{ total: data.PP }" :color="data.Color" :name="'PP'" />
      <StatTile :stats="{ total: data.Yen }" :color="data.Color" :name="'¥'" />
    </div>
  </div>
</template>

<script>
import StatTile from "./StatTile";
import { toast } from "./mixins/utilities";

export default {
  components: {
    StatTile
  },
  mixins: [toast],
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    hpColor() {
      const curr = this.data.HP.current;
      const max = this.data.HP.total;
      if (curr / max < 1) {
        return { color: "goldenrod" };
      } else if (curr / max < 0.25) {
        return { color: "red" };
      }
      return { color: "green" };
    }
  }
};
</script>

<style scoped>
.stat-block .flex {
  display: inline-flex;
  margin: 5px 0;
}
</style>
