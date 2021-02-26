<template>
  <Item :url="url" background="#dfc38e">
    <template #info>
      <div>
        <div>
          <b>{{ data.Name }}</b>
        </div>
        <div class="text-small">
          <template v-if="data.HEAL">Heal {{ data.HEAL }}</template>
          <template v-if="data.HEAL && boosts">||</template>
          <template v-if="boosts">{{ boosts }}</template>
        </div>
      </div>
    </template>
    <template #after>
      <div class="amt">x{{ data.n || 1 }}</div>
      <div v-if="noImage" class="item-name">{{ data.Name }}</div>
    </template>
  </Item>
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
  "Crepe",
];
export default {
  components: {
    Item,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      default: "small",
    },
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  computed: {
    boosts() {
      let tokens = [];
      ["BRV", "HP", "ATK", "DEF", "SYNC"].forEach((stat) => {
        if (this.data[stat]) {
          tokens.push(`${this.data[stat]} ${stat}`);
        }
      });
      return tokens.join(", ");
    },
    noImage() {
      return !withIcons.includes(this.data.Name);
    },
    url() {
      if (this.noImage) {
        return `${this.publicPath}food/default.png`;
      }
      return `${this.publicPath}food/${this.data.Name.replace(/"/g, "")}.png`;
    },
  },
};
</script>

<style scoped>
.amt {
  bottom: -5px;
  color: white;
  cursor: pointer;
  font-size: 0.9em;
  left: 7px;
  position: absolute;
  text-shadow: 2px 2px 0 black, -1px -1px 0 grey, 1px -1px 0 grey,
    -1px 1px 0 grey, 1px 1px 0 grey;
  z-index: 3;
}

.item-name{
  background: rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  font-size: 11px;
  font-weight: bold;
  max-height: 42px;
  overflow: hidden;
  padding: 0 2px;
  position: absolute;
  text-shadow: 2px 2px 0 black, -1px -1px 0 dimgray, 1px -1px 0 dimgrey,
    -1px 1px 0 dimgrey, 1px 1px 0 dimgrey;
  top: 50%;
  transform: translate(-50%, -50%);
  white-space: normal;
  z-index: 3;
}
</style>
