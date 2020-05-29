<template>
  <TabContent :color="data.Color">
    <template v-slot:title>
      {{ data.Name }}
    </template>
    <template v-slot:hero>
      <div v-show="!showNoise" class="top-flex">
        <div class="image-container noshrink">
          <img :src="data['Image URL']" />
        </div>
        <div class="flex-grow flex-col" style="padding-left: 10px">
          <div class="flex">
            <div class="flex-col">
              <div>
                {{ data["Full Name"] }}
                <span class="text-small"> - {{ data.Age }} - </span>
                <span class="text-smaller">
                  {{ data.Pronouns }}
                </span>
              </div>
              <div v-if="isPlayer" @click="$emit('goto', data.Partner)">
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
            </div>
            <div class="mun noshrink">
              <div class="flex">
                <div class="nowrap">
                  <font-awesome-icon
                    :icon="['fas', data.OwO ? data.OwO : 'user']"
                    :style="data.Color"
                  />
                  <span class="text-small">
                    {{ data.Mun }}
                  </span>
                </div>
                <div v-if="data.Timezone" class="nowrap">
                  <font-awesome-icon
                    :icon="['fas', 'clock']"
                    :style="data.Color"
                  />
                  <span class="text-small">
                    {{ data.Timezone }}
                  </span>
                </div>
              </div>
              <div v-if="data.Discord" class="nowrap">
                <font-awesome-icon
                  :icon="['fab', 'discord']"
                  :style="data.Color"
                />
                <span class="text-small">
                  {{ data.Discord }}
                </span>
              </div>
            </div>
          </div>
          <simplebar data-simplebar-auto-hide="false" class="sb text-small">
            <div>
              <template v-if="isPlayer">
                <h4 :style="data.Color">Entry Fee</h4>
                <p>{{ data["Entry Fee"] }}</p>
                <h4 :style="data.Color">Reason to Live</h4>
                <p>{{ data["Reason to Live"] }}</p>
              </template>
              <h4 :style="data.Color">Personality</h4>
              <p>{{ data.Personality }}</p>
            </div>
            <div>
              <h4 :style="data.Color">Appearance</h4>
              <p>{{ data.Appearance }}</p>
            </div>
          </simplebar>
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
import simplebar from "simplebar-vue";

export default {
  components: {
    TabContent,
    StatBlock,
    StatTile,
    Food,
    Pin,
    Thread,
    simplebar
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
    },
    isPlayer() {
      return this.data.Role === "Player";
    }
  }
};
</script>

<style scoped>
h4 {
  margin-bottom: 0;
}

p {
  font-size: 0.9em;
  margin-top: 0;
}

.top-flex {
  display: flex;
  height: 200px;
  width: 100%;
}

.flex {
  align-items: baseline;
  justify-content: space-between;
}

.sb {
  display: flex;

  height: 160px;
  padding-left: 10px;
}

.mun {
  max-width: 250px;
}

.mun div {
  margin-bottom: 2px;
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

<style>
/* .info .simplebar-content {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
} */

.sb .simplebar-content {
  display: flex;
}
.sb .simplebar-content > div {
  width: 50%;
}
</style>
