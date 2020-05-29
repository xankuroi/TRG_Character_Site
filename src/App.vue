<template>
  <div id="app">
    <Index v-if="weeks[0]" :weeks="weeks" />
    <template v-else>
      <CharacterSheets />
      <div
        class="clear text-smaller popover-container"
        :style="{ opacity: 0.6, position: 'absolute' }"
      >
        <font-awesome-icon :icon="['fas', 'info-circle']" />
        <div class="popover">
          Changes may take up to five minutes to reflect in the sheet.<br />Please
          report any issues to #hacklab or #meta in the TRG Discord.<br />Site
          creds: Xan (@xankuroi).
        </div>
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

.popover {
  background: var(--background-color);
  bottom: 10px;
  left: 10px;
  max-width: 0;
  overflow: hidden;
  position: absolute;
  width: 90vw;
}

.popover-container:hover .popover {
  max-width: 100vw;
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
</style>
