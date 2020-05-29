<template>
  <div>
    <ul class="list">
      <li class="text-smaller">
        W15 and W16 sheets are separated into players and reapers for legacy
        reasons. Additionally, they do not have a dark theme available.
      </li>
      <li><a :href="publicPath + 'W15/players.html'"> W15 Players </a></li>
      <li><a :href="publicPath + 'W15/reapers.html'"> W15 Reapers </a></li>
    </ul>
    <ul class="list">
      <li><a :href="publicPath + 'W16/players.html'"> W16 Players </a></li>
      <li><a :href="publicPath + 'W16/reapers.html'"> W16 Reapers </a></li>
    </ul>
    <ul class="list" style="line-height:2em;">
      <li v-for="week in weeks" :key="week">
        <a :href="publicPath + week">{{ week }} Characters</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { publicPath } from "../components/mixins/utilities";
export default {
  mixins: [publicPath],
  props: {
    weeks: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.list {
  list-style-type: none;
}
</style>
