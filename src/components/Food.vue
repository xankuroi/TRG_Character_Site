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
            <template v-if="data.HEAL && data.Boosts">|| </template>
            <template v-if="data.Boosts">{{ data.Boosts }}</template>
          </div>
        </div>
      </template>
      <template v-slot:after>
        <div class="amt">x{{ data.n }}</div>
        <div v-if="noImage" class="item-name">{{ data.Name }}</div>
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
    noImage() {
      return !withIcons.includes(this.data.Name);
    },
    url() {
      if (this.noImage) {
        return `${this.publicPath}food/default.png`;
      }
      return `${this.publicPath}food/${this.data.Name}.png`;
    }
  }
};
</script>

<style scoped>
.amt {
  bottom: -5px;
  color: white;
  cursor: pointer;
  font-size: 0.9em;
  position: absolute;
  right: -5px;
  text-shadow: 2px 2px 0 black, -1px -1px 0 grey, 1px -1px 0 grey,
    -1px 1px 0 grey, 1px 1px 0 grey;
}

.item-name {
  color: white;
  cursor: pointer;
  position: absolute;
  font-size: 11px;
  white-space: normal;
  text-align: center;
  font-weight: bold;
  text-shadow: 2px 2px 0 black, -1px -1px 0 dimgray, 1px -1px 0 dimgrey,
    -1px 1px 0 dimgrey, 1px 1px 0 dimgrey;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
