<template>
  <TabContent :color="data.Color">
    <template #hero>
      <div class="hero">
        <div class="info-container">
          <div class="image-container noshrink">
            <img :src="data['Image URL']" />
          </div>
          <CharacterInfo
            class="flex-col flex-grow"
            :data="data"
            @goto="$emit('goto', data.Partner)"
          />
          <CharacterDetails v-show="show === 'info'" class="info" :data="data" />
          <template v-if="!isPlayer(data) || $overrides.enableNoiseBlockForPlayers">
            <NoiseInfo v-show="show === 'noise'" class="info" :data="data" :mirror="mirror" />
            <div class="noise-container" v-show="show === 'noise'">
              <div class="container-redux">
                <img :src="data.Noise['Image URL']" />
              </div>
            </div>
          </template>
        </div>
        <div class="tab-container">
          <span class="tab" :class="{ active: !show }" @click="show = false">
            <font-awesome-icon :icon="['fas', 'address-card']" />
          </span>
          <span class="tab" :class="{ active: show === 'info' }" @click="show = 'info'">
            <font-awesome-icon :icon="['fas', 'sticky-note']" />
          </span>
          <span
            v-if="!isPlayer(data) || $overrides.enableNoiseBlockForPlayers"
            class="tab"
            :class="{ active: show === 'noise' }"
            @click="show = 'noise'"
          >
            <font-awesome-icon :icon="['fas', 'wave-square']" />
          </span>
        </div>
      </div>
    </template>
    <template #content>
      <Inventory
        v-if="data.Pins.equipped.length > 0"
        ref="equipped_pins"
        :expanded="false"
        @toggle="handleToggle('equipped_pins', $event)"
      >
        <template #title>Equipped Pins</template>
        <Pin
          v-for="(pin, index) in data.Pins.equipped"
          class="pull-left"
          :data="pin"
          :atk="data.ATK.total"
          :key="data.Name + 'pin' + index"
        />
      </Inventory>
      <Inventory
        v-if="data.Threads.equipped.length > 0"
        ref="equipped_threads"
        :expanded="false"
        @toggle="handleToggle('equipped_threads', $event)"
      >
        <template #title>Equipped Threads</template>
        <Thread
          v-for="thread in data.Threads.equipped"
          :data="thread"
          :key="data.Name + 'thread' + thread.ID"
        />
      </Inventory>
      <Inventory
        v-if="data.Food.length > 0"
        ref="food"
        :expanded="false"
        @toggle="handleToggle('food', $event)"
      >
        <template #title>Food</template>
        <Food
          v-for="food in data.Food"
          class="pull-left"
          :data="food"
          :key="data.Name + food.Name"
        />
      </Inventory>
      <Inventory
        v-if="data.Pins.unequipped.length + data.Threads.unequipped.length > 0"
        ref="inventory"
        :expanded="false"
        @toggle="handleToggle('inventory', $event)"
      >
        <template #title>Inventory</template>
        <Pin
          v-for="(pin, index) in data.Pins.unequipped"
          class="pull-left"
          :data="pin"
          :atk="data.ATK.total"
          :key="data.Name + 'pin' + pin.ID + index"
        />
        <Thread
          v-for="(thread, index) in data.Threads.unequipped"
          class="pull-left"
          :data="thread"
          :key="data.Name + 'thread' + thread.ID + index"
        />
      </Inventory>
      <Inventory v-if="data.Swag.length > 0" :showExpander="false">
        <template #title>Swag</template>
        <div
          v-for="(swag, index) in data.Swag"
          :key="data.Name + 'swag' + index"
          class="text-small"
        >
          <i>{{ swag.name }}</i>
          <span class="text-small" v-if="swag.d">&nbsp;- {{ swag.d }}</span>
        </div>
      </Inventory>
    </template>
  </TabContent>
</template>

<script>
import TabContent from "./TabContent";
import CharacterInfo from "./CharacterInfo";
import CharacterDetails from "./CharacterDetails";
import NoiseInfo from "./NoiseInfo";
import Inventory from "./Inventory";
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
    Inventory,
    Food,
    Pin,
    Thread,
  },
  mixins: [isPlayer],
  props: {
    data: {
      type: Object,
      required: true,
    },
    mirror: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleToggle(refName, event) {
      let elem = this.$refs[refName];
      elem.$children.forEach((item) => {
        item.$children[0].toggleExpand(event);
      });
    },
  },
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

.image-container {
  display: inline-block;
  height: 200px;
  text-align: center;
  width: 200px;
}

.noise-container {
  display: none;
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

@media (max-width: 600px) {
  .image-container {
    display: none;
  }

  .noise-container {
    display: block;
  }
}
</style>
