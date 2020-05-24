<template>
  <ul class="list">
    <template v-for="week in weeks">
      <li :key="week + '-player'">
        <a :href="publicPath + week + '/players.html'"> {{ week }} Players </a>
      </li>
      <li :key="week + '-reaper'">
        <a :href="publicPath + week + '/reapers.html'"> {{ week }} Reapers </a>
      </li>
    </template>
  </ul>
</template>

<script>
import { publicPath } from "../components/mixins/utilities";
export default {
  mixins: [publicPath],
  data() {
    return {
      weeks: window.weeks
    };
  }
};
</script>

<style scoped>
.list {
  list-style-type: none;
  line-height: 2em;
}
</style>
