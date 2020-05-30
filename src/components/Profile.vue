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
          <CharacterInfo class="flex-col flex-grow" :data="data" />
          <CharacterDetails
            v-show="show === 'info'"
            class="info"
            :data="data"
          />
          <NoiseInfo
            v-if="!isPlayer(data)"
            v-show="show === 'noise'"
            class="info"
            :data="data"
          />
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
            v-if="!isPlayer(data)"
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
        <template v-for="(pin, index) in data.Pins.equipped">
          <Pin class="pull-left" :data="pin" :key="data.Name + 'pin' + index" />
        </template>
        <template v-for="index in 6 - data.Pins.equipped.length">
          <div
            class="circle pull-left"
            :key="data.Name + 'pin' + (6 - index)"
          ></div>
        </template>
      </div>
      <div class="gear">
        <Thread
          class="pull-left"
          v-for="thread in data.Threads.equipped"
          :data="thread"
          :key="data.Name + 'thread' + thread.ID"
        />
      </div>
      <div class="inventory">
        <Food
          v-for="food in data.Food"
          class="pull-left"
          :data="food"
          :key="data.Name + food.ID"
        />
        <Pin
          v-for="(pin, index) in data.Pins.unequipped"
          class="pull-left"
          :data="pin"
          :key="data.Name + 'pin' + pin.ID + index"
        />
        <Thread
          v-for="(thread, index) in data.Threads.unequipped"
          class="pull-left"
          :data="thread"
          :key="data.Name + 'thread' + thread.ID + index"
        />
      </div>
    </template>
  </TabContent>
</template>

<script>
import TabContent from "./TabContent";
import CharacterInfo from "./CharacterInfo";
import CharacterDetails from "./CharacterDetails";
import NoiseInfo from "./NoiseInfo";
import Food from "./Food";
import Pin from "./Pin";
import Thread from "./Thread";
import { isPlayer } from "./mixins/utilities";

export default {
  components: {
    TabContent,
    CharacterInfo,
    CharacterDetails,
    NoiseInfo,
    Food,
    Pin,
    Thread
  },
  mixins: [isPlayer],
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
  }
};
</script>

<style scoped>
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
  height: 200px;
  position: absolute;
  width: 100%;
  flex-wrap: wrap;
}

.deck {
  display: inline-block;
  overflow: visible;
}

.threads {
  display: inline-block;
}
</style>
