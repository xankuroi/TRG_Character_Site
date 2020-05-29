<template>
  <TabContent :color="data.Color">
    <template v-slot:title>
      {{ data.Name }}
    </template>
    <template v-slot:hero>
      <div class="hero">
        <div class="info-container">
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
            <StatBlock :data="data" @goto="$emit('goto', $event)" />
          </div>
          <div v-show="show === 'info'" class="info text-small">
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
          </div>
          <div v-show="show === 'noise'" v-if="!isPlayer" class="info">
            {{ data.Noise.Name }}
            {{ data.Noise.Species }}
            <img :src="data.Noise['Image URL']" />
            <StatTile :stats="noiseStats.HP" :name="'HP'" :color="data.Color" />
            <StatTile
              :stats="noiseStats.ATK"
              :name="'ATK'"
              :color="data.Color"
            />
            <StatTile
              :stats="noiseStats.DEF"
              :name="'DEF'"
              :color="data.Color"
            />

            {{ data.Noise.Abilities }}
          </div>
        </div>
        <div class="tab-container">
          <span class="tab" :class="{ active: !show }" @click="show = false">
            <font-awesome-icon :icon="['fas', 'address-card']" />
          </span>
          <span
            class="tab"
            :class="{ active: show === 'info' }"
            @click="show = 'info'"
          >
            <font-awesome-icon :icon="['fas', 'sticky-note']" />
          </span>
          <span
            v-if="!isPlayer"
            class="tab"
            :class="{ active: show === 'noise' }"
            @click="show = 'noise'"
          >
            <font-awesome-icon :icon="['fas', 'wave-square']" />
          </span>
        </div>
      </div>
    </template>
    <template v-slot:content>
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
      show: false
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

.active {
  color: var(--color);
}

.tab {
  background: var(--background-color);
  color: var(--border-color);
  cursor: pointer;
  padding: 0 5px;
}

.tab:hover,
.active {
  color: var(--color);
}

.tab-container {
  position: absolute;
  bottom: -9px;
}

.flex {
  align-items: baseline;
  justify-content: space-between;
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

.hero {
  position: relative;
  margin-bottom: 10px;
}

.info-container {
  border-bottom: 1px solid var(--border-color);
  display: flex;
  height: 200px;
  width: 100%;
  padding-bottom: 10px;
  position: relative;
}

.info {
  background: var(--background-color);
  display: flex;
  height: 200px;
  overflow: hidden;
  position: absolute;
  width: 100%;
}

.info h4:first-child {
  margin: 0;
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
