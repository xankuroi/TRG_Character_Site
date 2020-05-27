<template>
  <div class="stat-block">
    <div>{{ data.Name }} // {{ data.Age }} // {{ data.Pronouns }}</div>
    <div v-if="data.Role === 'Player'" @click="$emit('goto', data.Partner)">
      <font-awesome-icon :icon="['fas', 'handshake']" :style="data.Color" />
      <span class="fade cursor"> {{ data.Partner }}</span>
    </div>
    <div v-else>
      <font-awesome-icon :icon="['fas', 'briefcase']" :style="data.Color" />
      {{ data.Position }}
    </div>
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
        <template v-slot:after>% </template>
      </StatTile>
    </div>
    <div class="flex">
      <StatTile :stats="{ total: data.Yen }" :color="data.Color" :name="'¥'" />
      <StatTile
        v-if="data.Role === 'Player'"
        :stats="{ total: data.PP }"
        :color="data.Color"
        :name="'PP'"
      />
    </div>
  </div>
</template>

<script>
import StatTile from "./StatTile";

export default {
  components: {
    StatTile
  },
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
  height: 200px;
}

.stat-block .flex {
  display: inline-flex;
  margin-bottom: 5px;
}
</style>
