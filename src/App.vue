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
export default {
  name: "App",
  components: {
    CharacterSheets: () => import("./pages/CharacterSheets"),
    Index: () => import("./pages/Index")
  },
  data() {
    return {
      activeIndex: 0,
      keyPresent: !!window.publishKey
    };
  }
};
</script>

<style>
/* Component styles */
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

#app {
  color: #2c3e50;
  font-family: Montserrat;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin: 0 auto;
  max-width: 1024px;
}

/* Global styles */
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

/* Utility classes */
.clear {
  clear: both;
}

.flex {
  align-items: center;
  display: flex;
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
