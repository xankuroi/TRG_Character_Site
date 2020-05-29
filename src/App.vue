<template>
  <div id="app">
    <Index v-if="weeks[0]" :weeks="weeks" />
    <template v-else>
      <CharacterSheets />
      <div class="clear text-smaller" :style="{ opacity: 0.6 }">
        Site creds: Xan (@xankuroi). Please report any issues to #hacklab or
        #meta in the TRG Discord.
      </div>
    </template>
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
      weeks: window.weeks.split(",")
    };
  }
};
</script>

<style>
/* Set up & component styles  */
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

:root {
  --text-color: #2c3e50;
  --background-color: #fff;
  --border-color: lightgray;
}
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #dee4e7;
    --background-color: #222;
    --border-color: #666;
  }
}

#app {
  text-align: left;
  margin: 0 auto;
  max-width: 1024px;
}

/* Global styles */
body {
  background: var(--background-color);
  color: var(--text-color);
  font-family: Montserrat;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: #29abdf;
  text-decoration: none;
}

a:hover {
  color: var(--text-color);
}

img {
  height: 100%;
  max-width: 100%;
}

button {
  background: none;
  border: none;
  color: var(--border-color);
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  transition: 0.2s;
}

button:hover {
  color: var(--text-color);
}

/* Utility classes */
.clear {
  clear: both;
}

.cursor {
  cursor: pointer;
}

.fade {
  opacity: 0.5;
  transition: 0.2s;
}

.fade:hover {
  opacity: 1;
}

.flex {
  align-items: center;
  display: flex;
}

.text-left {
  text-align: left;
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
