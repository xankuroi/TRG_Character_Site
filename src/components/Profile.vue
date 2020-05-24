<template>
  <TabContent :color="color">
    <template v-slot:title>
      {{ data.Name }}
    </template>
    <template v-slot:hero>
      <div class="image-container pull-left">
        <img :src="data['Image URL']" />
      </div>
      <div class="stat-block flex">
        <StatTile :stats="data.HP" :color="color" :name="'HP'">
          <slot>
            <b :style="hpColor">{{ data.HP.current }}</b>
            <span class="text-smaller">/</span>
          </slot>
        </StatTile>
        <StatTile :stats="data.ATK" :color="color" :name="'ATK'" />
        <StatTile :stats="data.DEF" :color="color" :name="'DEF'" />
        <StatTile :stats="{ brv: data.BRV }" :color="color" :name="'BRV'" />
      </div>
      <div class="deck">
        <template v-for="pin in equipped.pins">
          <Pin class="pull-left" :data="pin" :key="pin.ID" />
        </template>
        <template v-for="index in 6 - equipped.pins.length">
          <div class="circle pull-left" :key="index"></div>
        </template>
      </div>
      <div>
        <Thread
          class="pull-left"
          v-for="thread in equipped.threads"
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
          v-for="pin in inventory.pins"
          class="pull-left"
          :data="pin"
          :key="pin.ID"
        />
        <Thread
          v-for="thread in inventory.threads"
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
import { color } from "./mixins/utilities";

export default {
  components: {
    TabContent,
    StatTile,
    Food,
    Pin,
    Thread
  },
  mixins: [color],
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return { rawColor: this.data.Color };
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
    equipped() {
      return {
        pins: this.getEquipped(this.data.Pins),
        threads: this.getEquipped(this.data.Threads)
      };
    },
    inventory() {
      return {
        pins: this.getUnequipped(this.data.Pins),
        threads: this.getUnequipped(this.data.Threads),
        food: this.data.Food
      };
    }
  },
  methods: {
    getEquipped(items) {
      return items.filter(item => item.n).sort((a, b) => a.n > b.n);
    },
    getUnequipped(items) {
      return items.filter(item => !item.n);
    },
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

.deck {
  display: inline-block;
  overflow: visible;
  height: 200px;
}
</style>
