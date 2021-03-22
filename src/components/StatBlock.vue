<template>
  <div class="stat-block">
    <button type="button" v-clipboard:copy="data.CP" @click="toast(data.Name)">
      <font-awesome-icon :icon="['fas', 'copy']" :style="data.Color" />
    </button>
    <div class="stat-content">
      <div>
        <StatTile v-if="!hide.HP" :stats="data.HP" :color="data.Color" :name="names.HP">
          <template #before>
            <b :style="hpColor">{{ data.HP.current }}</b>
            <span class="text-smaller">/</span>
          </template>
        </StatTile>
        <StatTile v-if="!hide.ATK" :stats="data.ATK" :color="data.Color" :name="names.ATK" />
        <StatTile v-if="!hide.DEF" :stats="data.DEF" :color="data.Color" :name="names.DEF" />
        <StatTile
          v-if="data.Role === 'Player' && !hide.SYNC"
          :stats="{ total: data.SYNC }"
          :color="data.Color"
          :name="names.SYNC"
        >
          <template #after>%</template>
        </StatTile>
      </div>
      <div>
        <StatTile
          v-if="data.BRV !== undefined && !hide.BRV"
          :stats="{ total: data.BRV }"
          :color="data.Color"
          :name="names.BRV"
        />
        <StatTile v-if="!hide.PP" :stats="{ total: data.PP }" :color="data.Color" :name="names.PP" />
        <StatTile v-if="!hide.Yen" :stats="{ total: data.Yen }" :color="data.Color" :name="names.Yen" />
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
    },
    names() {
      return {
        HP: this.$overrides?.HP?.name ?? "HP",
        ATK: this.$overrides?.ATK?.name ?? "ATK",
        DEF: this.$overrides?.DEF?.name ?? "DEF",
        SYNC: this.$overrides?.SYNC?.name ?? "SYNC",
        PP: this.$overrides?.PP?.name ?? "PP",
        BRV: this.$overrides?.BRV?.name ?? "BRV",
        Yen: this.$overrides?.Yen?.name ?? "¥"
      }
    },
    hide() {
      return {
        HP: this.$overrides?.HP?.hide,
        ATK: this.$overrides?.ATK?.hide,
        DEF: this.$overrides?.DEF?.hide,
        SYNC: this.$overrides?.SYNC?.hide,
        PP: this.$overrides?.PP?.hide,
        BRV: this.$overrides?.BRV?.hide,
        Yen: this.$overrides?.Yen?.hide,
      }
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
