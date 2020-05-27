<template>
  <TabContent :color="data.Color">
    <template v-slot:title>
      {{ data.Name }}
    </template>
    <template v-slot:hero>
      <div class="image-container pull-left">
        <img :src="data['Image URL']" />
      </div>
      <StatBlock :data="data" @goto="$emit('goto', $event)" />
      <div class="info">
        <template v-if="data.Role === 'Player'">
          <h4 :style="data.Color">Entry Fee</h4>
          <p>{{ data["Entry Fee"] }}</p>
          <h4 :style="data.Color">Reason to Live</h4>
          <p>{{ data["Reason to Live"] }}</p>
        </template>
        <h4 :style="data.Color">Personality</h4>
        <p>{{ data.Personality }}</p>
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
import StatBlock from "./StatBlock";

export default {
  components: {
    TabContent,
    StatBlock,
    Food,
    Pin,
    Thread
  },
  props: {
    data: {
      type: Object,
      required: true
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
