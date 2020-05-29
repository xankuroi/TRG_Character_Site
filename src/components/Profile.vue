<template>
  <TabContent :color="data.Color">
    <template v-slot:title>
      {{ data.Name }}
    </template>
    <template v-slot:hero>
      <div v-show="!showNoise" class="top-flex">
        <div class="image-container pull-left">
          <img :src="data['Image URL']" />
        </div>
        <div class="info flex-col">
          <div>{{ data.Name }} // {{ data.Age }} // {{ data.Pronouns }}</div>
          <div
            v-if="data.Role === 'Player'"
            @click="$emit('goto', data.Partner)"
          >
            <font-awesome-icon
              :icon="['fas', 'handshake']"
              :style="data.Color"
            />
            <span class="fade cursor"> {{ data.Partner }}</span>
          </div>
          <div v-else>
            <font-awesome-icon
              :icon="['fas', 'briefcase']"
              :style="data.Color"
            />
            {{ data.Position }}
          </div>
          <template v-if="data.Role === 'Player'">
            <h4 :style="data.Color">Entry Fee</h4>
            <p>{{ data["Entry Fee"] }}</p>
            <h4 :style="data.Color">Reason to Live</h4>
            <p>{{ data["Reason to Live"] }}</p>
          </template>
          <h4 :style="data.Color">Personality</h4>
          <p>{{ data.Personality }}</p>
        </div>
        <div class="mun flex-col">
          <font-awesome-icon :icon="['fas', data.OwO ? data.OwO : 'user']" />
          {{ data.Mun }}
          <font-awesome-icon :icon="['fas', 'clock']" />
          {{ data.Timezone }}
          {{ data.Discord }}
        </div>
      </div>

      <div v-show="showNoise" v-if="data.Role === 'Reaper'">
        {{ data.Noise.Name }}
        {{ data.Noise.Species }}
        <img :src="data.Noise['Image URL']" />
        <StatTile :stats="noiseStats.HP" :name="'HP'" :color="data.Color" />
        <StatTile :stats="noiseStats.ATK" :name="'ATK'" :color="data.Color" />
        <StatTile :stats="noiseStats.DEF" :name="'DEF'" :color="data.Color" />

        {{ data.Noise.Abilities }}
      </div>
    </template>
    <template v-slot:content>
      <StatBlock :data="data" @goto="$emit('goto', $event)" />
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
import StatBlock from "./StatBlock";
import StatTile from "./StatTile";

export default {
  components: {
    TabContent,
    StatBlock,
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
  data() {
    return {
      showNoise: false
    };
  },
  computed: {
    noiseStats() {
      let moddedData = this.data.Noise;
      ["HP", "ATK", "DEF"].forEach(stat => {
        moddedData[stat].total = Object.values(moddedData[stat]).reduce(
          (acc, curr) => acc + curr,
          0
        );
      });
      return moddedData;
    }
  }
};
</script>

<style scoped>
h4 {
  margin-bottom: 0;
}

p {
  margin-top: 0;
}

.top-flex {
  display: flex;
}

.flex-col {
  flex-grow: 1;
}
.mun {
  max-width: 200px;
}

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
}

.threads {
  display: inline-block;
}
</style>
