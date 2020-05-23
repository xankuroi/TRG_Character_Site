<template>
  <div>
    <Item :url="url" :expanderStyle="{ background: '#dfc38e' }">
      <template v-slot:info>
        <div>
          <div>
            <b>{{ data.Name }}</b>
          </div>
          <div class="text-small">
            <template v-if="data.HEAL">Heal {{ data.HEAL }} </template>
            <template v-if="data.HEAL && data.Boosts">||</template>
            <template v-if="data.Boosts">{{ data.Boosts }}</template>
          </div>
        </div>
      </template>
      <template v-slot:after>
        <div class="amt">x{{ data.n }}</div>
      </template>
    </Item>
  </div>
</template>

<script>
import Item from "./Item";
const withIcons = [
  "Hamburger",
  "Double Burger",
  "French Fries",
  "Hot Dog",
  "Special Dog",
  "Donuts",
  "Muffin Set",
  "Nuggets",
  "Salad",
  'The "Tatsumi" Burger',
  "Definitivo Chili Dog",
  "Cola",
  "OJ",
  "Coffee",
  "House Blend",
  "Minestrone",
  "Corn Chowder",
  "Bouillabaisse",
  "Pumpkin Soup",
  "Shoyu Ramen",
  "Miso Ramen",
  "Shio Ramen",
  "Tonkotsu Ramen",
  "Shadow Steak Ramen",
  "Mystic Ramen",
  "Absolute Shadow Ramen",
  "Insta-Noodles",
  "HP Tablets",
  "ATK Capsules",
  "DEF Medicine",
  "Sync Bar",
  "Ginseng",
  "Curious Mushrooms",
  "Cordyceps",
  "Viper Drink",
  "Royal Jelly Q10",
  "Mako Sinnergy",
  "BRAVE+",
  "Vanilla Soft Serve",
  "Soft Serve Swirl",
  "Pancakes",
  "Crepe"
];
export default {
  components: {
    Item
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: "small"
    }
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  computed: {
    url() {
      if (withIcons.includes(this.data.Name)) {
        return `${this.publicPath}food/${this.data.Name}.png`;
      }
      return `${this.publicPath}food/default.png`;
    }
  }
};
</script>

<style scoped>
.amt {
  bottom: 0;
  color: white;
  font-size: 0.9em;
  position: absolute;
  right: -0.2em;
  text-shadow: 2px 2px 0 black, -1px -1px 0 grey, 1px -1px 0 grey,
    -1px 1px 0 grey, 1px 1px 0 grey;
}
</style>
