<template>
  <TabContent :color="data.Color">
    <template v-slot:title>
      {{ data.Name }}
    </template>
    <template v-slot:hero>
      <div class="image-container pull-left">
        <img :src="data['Image URL']" />
      </div>
      <div class="stat-block">
        <div class="flex">
          <StatTile :stats="mergedStats.HP" :color="data.Color" :name="'HP'">
            <template v-slot:before>
              <b :style="hpColor">{{ data.HP.current }}</b>
              <span class="text-smaller">/</span>
            </template>
          </StatTile>
          <StatTile
            :stats="mergedStats.ATK"
            :color="data.Color"
            :name="'ATK'"
          />
        </div>
        <div class="flex">
          <StatTile
            :stats="mergedStats.DEF"
            :color="data.Color"
            :name="'DEF'"
          />
          <StatTile
            :stats="{ brv: data.BRV }"
            :color="data.Color"
            :name="'BRV'"
          />
          <StatTile
            v-if="data.Role === 'Player'"
            :stats="{ sync: data.SYNC }"
            :color="data.Color"
            :name="'SYNC'"
          >
            <template v-slot:after>% </template>
          </StatTile>
        </div>
      </div>
      <div class="deck">
        <template v-for="pin in data.Pins.equipped">
          <Pin class="pull-left" :data="pin" :key="pin.ID" />
        </template>
        <template v-for="index in 6 - data.Pins.equipped.length">
          <div class="circle pull-left" :key="index"></div>
        </template>
      </div>
      <div class="threads">
        <Thread
          class="pull-left"
          v-for="thread in data.Threads.equipped"
          :data="thread"
          :key="thread.ID"
        />
      </div>
    </template>
    <template v-slot:content>
      <div class="inventory">
        <Food
          v-for="food in data.Food"
          class="pull-left"
          :data="food"
          :key="food.ID"
        />
        <Pin
          v-for="pin in data.Pins.unequipped"
          class="pull-left"
          :data="pin"
          :key="pin.ID"
        />
        <Thread
          v-for="thread in data.Threads.unequipped"
          class="pull-left"
          :data="thread"
          :key="thread.ID"
        />
      </div>
    </template>
  </TabContent>
</template>

<script>
import TabContent from "./TabContent";
import Food from "./Food";
import Pin from "./Pin";
import Thread from "./Thread";
import StatTile from "./StatTile";

export default {
  components: {
    TabContent,
    StatTile,
    Food,
    Pin,
    Thread
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    role() {
      return this.data.Role;
    },
    hpColor() {
      const curr = this.data.HP.current;
      const max = this.sum(this.data.HP) - curr;
      if (curr / max > 0.5) {
        return { color: "green" };
      } else if (curr / max < 0.25) {
        return { color: "red" };
      }
      return { color: "goldenrod" };
    },
    equippedStats() {
      return Object.values(this.data.Threads.equipped).reduce(
        (total, thread) => {
          ["HP", "ATK", "DEF"].forEach((stat, index) => {
            let c =
              this.data.Pronouns === "He/Him"
                ? "M"
                : this.data.Pronouns === "She/Her"
                ? "F"
                : "T";
            let suffix = index ? "" : `_${index}`;
            total[stat] += (thread[stat] || 0) + (thread[c + suffix] || 0);
          });
          return total;
        },
        { HP: 0, ATK: 0, DEF: 0 }
      );
    },
    mergedStats() {
      let stats = {};
      ["HP", "ATK", "DEF"].forEach(stat => {
        stats[stat] = {
          ...this.data[stat],
          Threads: this.equippedStats[stat]
        };
      });
      return stats;
    }
  },
  methods: {
    sum(statsObject) {
      return Object.values(statsObject).reduce((s, x) => s + x);
    }
  }
};
</script>

<style scoped>
.inventory {
  width: 100%;
}

.image-container {
  display: inline-block;
  height: 200px;
  width: 200px;
}

.stat-block {
  height: 200px;
}

.stat-block .flex {
  display: inline-flex;
  margin-bottom: 5px;
}

.deck {
  display: inline-block;
  overflow: visible;
}

.threads {
  display: inline-block;
}
</style>
