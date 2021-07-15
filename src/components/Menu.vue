<template>
  <div>
    <div v-if="show" class="menu text-small">
      <div class="clear" />
      <template v-if="Object.keys(additionalLinks).length > 0">
        Reference
        <ul>
          <li
            v-for="(link, text, index) in additionalLinks"
            :key="'link' + index"
          >
            <a :href="link">{{ text }}</a>
          </li>
        </ul>
      </template>
      Links
      <ul>
        <li><a href="/">Other Weeks</a></li>
        <li><a href="https://shibuyasgamearchives.tumblr.com">Archives</a></li>
        <li><a href="https://discord.gg/swmtaTW">Discord</a></li>
        <li><a href="https://shibuyasgame.tumblr.com">Tumblr</a></li>
        <li><a href="https://twitter.com/shibuyasgame">Twitter</a></li>
      </ul>
      Options
      <ul>
        <li>
          Toggle light/dark:
          <button @click="toggleTheme()">
            <font-awesome-icon :icon="['fas', 'adjust']" />
          </button>
        </li>
      </ul>
    </div>
    <button class="menu-button" :class="{ active: show }" @click="show = !show">
      <font-awesome-icon :icon="['fas', 'stream']" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return { show: false, additionalLinks: {} };
  },
  methods: {
    toggleTheme() {
      localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";
      document.body.setAttribute("data-theme", localStorage.theme);
    },
  },
  mounted() {
    this.additionalLinks = JSON.parse(window.additionalLinks);
  },
};
</script>

<style scoped>
.menu {
  background: var(--background-color);
  height: 100%;
  min-height: 300px;
  padding: 10px;
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  z-index: 666;
}

.menu-button {
  border-radius: 25%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 777;
}

.menu-button:hover,
.menu-button.active {
  background: var(--border-color);
  color: var(--background-color);
}
</style>
