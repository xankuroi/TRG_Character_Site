<template>
  <div id="app">
    <Index v-if="weeks" :weeks="weeks" />
    <template v-else>
      <CharacterSheets />
      <div class="clear text-smaller popover-container">
        <font-awesome-icon
          class="icon"
          :icon="['fas', 'info-circle']"
          :style="{ color: 'var(--border-color)' }"
        />
        <div class="popover">
          Changes may take up to five minutes to reflect in the sheet.
          <br />Please report any issues to #hacklab or #meta in the TRG
          Discord.
          <br />
          <span class="text-smaller">Site creds: Xan (@xankuroi).</span>
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
    Index: () => import("./pages/Index"),
  },
  data() {
    return {
      weeks: JSON.parse(window.weeks),
    };
  },
  beforeMount() {
    let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (localStorage.theme === "light") {
      dark = false;
    }
    document.body.setAttribute("data-theme", dark ? "dark" : "light");
  },
};
</script>

<style>
/* Set up & component styles  */
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Girassol&display=swap");

body[data-theme="light"] {
  --text-color: #2c3e50;
  --background-color: #fff;
  --border-color: #b3b3b3;
  --item-info-default-color: rgb(180, 180, 180);
}

body[data-theme="dark"] {
  --text-color: #dee4e7;
  --background-color: #222;
  --border-color: #666;
  --item-info-default-color: #eee;
}

#app {
  text-align: left;
  margin: 0 auto;
  max-width: 1024px;
}

.popover {
  background: var(--background-color);
  bottom: 10px;
  border-radius: 3px;
  left: 10px;
  max-width: 0;
  overflow: hidden;
  position: absolute;
}

.popover-container {
  position: relative;
}

.icon:hover ~ .popover {
  border: 1px solid var(--border-color);
  max-width: max-content;
  padding: 3px;
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
