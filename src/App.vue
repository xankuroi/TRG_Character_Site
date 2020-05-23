<template>
  <div id="app">
    <template v-if="keyPresent">
      <CharacterSheets />
      <div class="clear text-smaller">
        Site creds: Xan (@xankuroi). Please report any issues to #hacklab or
        #meta in the TRG Discord.
      </div>
    </template>
    <Index v-else />
  </div>
</template>

<script>
import CharacterSheets from "./pages/CharacterSheets.vue";
import Index from "./pages/Index.vue";

export default {
  name: "App",
  components: {
    CharacterSheets,
    Index
  },
  data() {
    return {
      keyPresent: !!window.publishKey
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap");

#app {
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin-top: 60px;
}

a {
  color: #29abdf;
  text-decoration: none;
}

a:hover {
  color: #2c3e50;
}

img {
  height: 100%;
  max-width: 100%;
}

.flex {
  align-items: center;
  display: flex;
}

.clear {
  clear: both;
}

.list {
  list-style-type: none;
  line-height: 2em;
}

.text-small {
  font-size: 0.85em;
}

.text-smaller {
  font-size: 0.8em;
}

.pull-left {
  float: left;
}
</style>
