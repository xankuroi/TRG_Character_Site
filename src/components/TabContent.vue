<template>
  <div>
    <div class="hero">
      <div class="image-container pull-left">
        <img :src="data['Image URL']" />
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
    </div>

    <div class="inventory clear">
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
        v-for="thread in equipped.threads"
        class="pull-left"
        :data="thread"
        :key="thread.ID"
      />
    </div>
  </div>
</template>

<script>
import Food from "./Food.vue";
import Pin from "./Pin.vue";
import Thread from "./Thread.vue";

export default {
  components: {
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
      return this.data.role;
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
    }
  }
};
</script>

<style>
.inventory {
  width: 100%;
}
.image-container {
  display: inline-block;
  height: 300px;
  width: 300px;
  border: 1px solid black;
}

.deck {
  display: inline-block;
  overflow: visible;
  width: 60px;
  height: 300px;
}

.pull-left {
  float: left;
}

.circle {
  background: lightgrey;
  border-radius: 48px;
  border: 1px solid grey;
  box-sizing: border-box;
  height: 48px;
  margin-bottom: 2px;
  margin-left: 4px;
  width: 48px;
}
</style>
