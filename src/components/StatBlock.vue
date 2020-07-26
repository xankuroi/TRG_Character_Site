<template>
  <div class="stat-block">
    <button type="button" v-clipboard:copy="data.CP" @click="toast(data.Name)">
      <font-awesome-icon :icon="['fas', 'copy']" :style="data.Color" />
    </button>
    <div class="stat-content">
      <div>
        <StatTile :stats="data.HP" :color="data.Color" :name="'HP'">
          <template v-slot:before>
            <b :style="hpColor">{{ data.HP.current }}</b>
            <span class="text-smaller">/</span>
          </template>
        </StatTile>
        <StatTile :stats="data.ATK" :color="data.Color" :name="'ATK'" />
        <StatTile :stats="data.DEF" :color="data.Color" :name="'DEF'" />
        <StatTile
          v-if="data.Role === 'Player'"
          :stats="{ total: data.SYNC }"
          :color="data.Color"
          :name="'SYNC'"
        >
          <template v-slot:after>%</template>
        </StatTile>
      </div>
      <div>
        <StatTile
          v-if="data.BRV !== undefined"
          :stats="{ total: data.BRV }"
          :color="data.Color"
          :name="'BRV'"
        />
        <StatTile :stats="{ total: data.PP }" :color="data.Color" :name="'PP'" />
        <StatTile :stats="{ total: data.Yen }" :color="data.Color" :name="'¥'" />
      </div>
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
.stat-block {
  display: flex;
  height: 150px;
}

.stat-content {
  align-items: center;
  display: inline-flex;
  justify-content: space-between;
  margin: 5px 0;
  flex-grow: 1;
}
button {
  flex-grow: 0;
}
</style>
