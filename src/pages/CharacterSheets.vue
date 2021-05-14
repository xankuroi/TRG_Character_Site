<template>
  <div class="container">
    <div class="top-row text-smaller noselect">
      Show tabs:
      <div
        class="fade cursor"
        :class="{ active: showPlayers }"
        @click="toggle('showPlayers')"
      >Players</div>
      <div
        class="fade cursor"
        :class="{ active: showReapers }"
        @click="toggle('showReapers')"
      >Reapers</div>
      <button style="float: right">
        <font-awesome-icon :icon="['fas', 'adjust']" @click="toggleTheme()" />
      </button>
    </div>
    <div class="button-container text-smaller">
      <button @click="loadData">
        <font-awesome-icon :icon="['fas', 'sync']" />
      </button>
      <div class="button-popover">reload data</div>
    </div>
    <div class="tab-container-container">
      <div class="tab-container">
        <Tab :active="activeIndex === -1" @click="handleTabSelection(-1)">
          <font-awesome-icon :icon="['fas', 'list-alt']" />
        </Tab>
        <simplebar class="tab-scroll-container">
          <Tab
            v-for="(sheet, index) in playerSheets"
            v-show="loaded && showPlayers"
            :name="sheet.Name"
            :active="activeIndex === index"
            :color="sheet.Color.color"
            :key="'tp-' + index"
            @click="handleTabSelection(index)"
          />
          <div
            v-show="loaded && showPlayers && showReapers"
            style="color: var(--border-color); background: var(--border-color);"
          >.</div>
          <Tab
            v-for="(sheet, index) in reaperSheets"
            v-show="loaded && showReapers"
            :name="sheet.Name"
            :active="activeIndex === index + pLen"
            :color="sheet.Color.color"
            :key="'tr-' + index"
            @click="handleTabSelection(index + pLen)"
          />
        </simplebar>
      </div>
    </div>
    <h1 class="header" :style="activeData.Color">{{ activeData.Name }}</h1>
    <simplebar class="content-container">
      <Loader v-show="!loaded" />
      <template v-if="loaded">
        <TabContent v-show="activeIndex === -1" :key="'overview'">
          <template #title>Overview</template>
          <template #hero>
            <table class="overview-table">
              <tr>
                <th class="text-left">Name</th>
                <th>HP</th>
                <th>ATK</th>
                <th>DEF</th>
                <th>C/P</th>
              </tr>
              <OverviewRow
                v-for="(sheet, index) in playerSheets"
                :sheet="sheet"
                :key="'ovp-' + index"
                @click="handleTabSelection(index)"
              />
              <OverviewRow
                v-for="(sheet, index) in reaperSheets"
                :sheet="sheet"
                :key="'ovr-' + index"
                @click="handleTabSelection(index + pLen)"
              />
            </table>
          </template>
        </TabContent>
        <Profile
          v-for="(sheet, index) in playerSheets"
          v-show="activeIndex === index"
          :data="sheet"
          :mirror="mirror"
          :key="'pp-' + index"
          @goto="handleGoto($event)"
        />
        <Profile
          v-for="(sheet, index) in reaperSheets"
          v-show="activeIndex === index + pLen"
          :data="sheet"
          :mirror="mirror"
          :key="'pr-' + index"
        />
      </template>
    </simplebar>
  </div>
</template>

<script>
import Loader from "../components/Loader";
import OverviewRow from "../components/OverviewRow";
import Profile from "../components/Profile";
import Tab from "../components/Tab";
import TabContent from "../components/TabContent";
import simplebar from "simplebar-vue";
import { processSpreadsheet } from "../components/mixins/processSheets";
import "simplebar/dist/simplebar.min.css";

export default {
  components: {
    Loader,
    OverviewRow,
    Profile,
    Tab,
    TabContent,
    simplebar,
  },
  data() {
    const pathTokens = window.location.pathname.split("/");
    return {
      activeIndex: -1,
      keys: window.sheetKeys,
      sheetStatuses: [false],
      sheetsByUrl: {},
      showPlayers: true,
      showReapers: true,
      week: pathTokens[1] === "characters" ? pathTokens[2] : pathTokens[1],
      mirror: false,
      reloadTimer: null,
      version: null
    };
  },
  computed: {
    loaded() {
      return this.sheetStatuses.every(Boolean);
    },
    sheets() {
      return Object.values(this.sheetsByUrl)
              .reduce((acc, sheets) => acc.concat(sheets), []);
    },
    playerSheets() {
      return this.sheets.filter(sheet => sheet.Role === "Player");
    },
    reaperSheets() {
      return this.sheets.filter(sheet => sheet.Role === "Reaper");
    },
    pLen() {
      return Object.keys(this.playerSheets).length;
    },
    rLen() {
      return Object.keys(this.reaperSheets).length;
    },
    urls() {
      // Must use a CORS proxy because the download link redirects and
      // said redirect doesn't include CORS headers thanks Google.
      // Maybe they'll fix it https://issuetracker.google.com/issues/36759302
      const gs =
        "https://birbot-3961.appspot.com/" +
        "https://docs.google.com/spreadsheets/d/e/KEY/pub?output=xlsx";
      return this.keys.map(key => gs.replace("KEY", key));
    },
    activeData() {
      if (this.loaded) {
        if (this.activeIndex > this.pLen + this.rLen) {
          return this.reaperSheets[this.rLen - 1];
        } else if (this.activeIndex >= this.pLen) {
          return this.reaperSheets[this.activeIndex - this.pLen];
        } else if (this.activeIndex > 0) {
          return this.playerSheets[this.activeIndex];
        }
      }
      return { Color: {}, Name: "Overview" };
    },
  },
  methods: {
    checkVersion() {
      return fetch("https://birbot-3961.appspot.com/https://github.com/shibuyasgame/characters/commits/gh-pages")
        .then((resp) => resp.text())
        .then((text) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');
          let test = doc.querySelector("a[href*='/shibuyasgame/characters/commit/'].btn").text.trim();
          return test;
        })
        .catch(() => false);
    },
    loadSheets(url, index) {
      processSpreadsheet(url)
        .then(data => {
          this.$set(this.sheetsByUrl, url, data.sheets);
          this.mirror = data.mirror;
        })
        .then(() => this.$nextTick(() => this.$set(this.sheetStatuses, index, true)))
    },
    loadData() {
      this.checkVersion().then((version) => {
        if (version) {
          if (this.version === null) { this.version = version; }
          else if (this.version != version) { location.reload(); }
        }
      }).finally(() => {
        this.sheetStatuses = Array(this.urls.length).fill(false);
        this.urls.forEach((url, index) => this.loadSheets(url, index));
      });
    },
    reloadData() {
      clearTimeout(this.reloadTimer);
      this.loadData();
      this.reloadTimer = setTimeout(this.reloadData, 600000);
    },
    handleGoto(name) {
      this.activeIndex = this.playerSheets.findIndex(
        (data) => data.Name === name
      );

      this.updateStoredIndex();
    },
    toggle(showKey) {
      this[showKey] = !this[showKey];
    },
    toggleTheme() {
      localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";
      document.body.setAttribute("data-theme", localStorage.theme);
    },
    handleTabSelection(index) {
      this.activeIndex = index;
      this.updateStoredIndex();
    },
    updateStoredIndex() {
      localStorage.activeIndices = JSON.stringify(
        Object.assign(this.getStoredIndices(), {
          [this.week]: this.activeIndex,
        })
      );
    },
    getStoredIndices() {
      return JSON.parse(localStorage.activeIndices);
    },
  },
  mounted() {
    this.reloadData();
    if (!localStorage.activeIndices) {
      localStorage.activeIndices = "{}";
    }
    if (this.getStoredIndices()[this.week]) {
      this.activeIndex = Number(this.getStoredIndices()[this.week]);
    }
    this.$nextTick(() => {
      let horizontalElements = document.querySelectorAll(
        ".tab-scroll-container"
      );
      for (let element of horizontalElements)
        element.onwheel = (event) => {
          event.preventDefault();
          let elementToScroll = element.querySelector(
            ".simplebar-content-wrapper"
          );

          clearTimeout(elementToScroll.timer);
          elementToScroll.timer = setTimeout(() => {
            elementToScroll.scrollTo({
              left:
                event.deltaY > 0
                  ? elementToScroll.scrollLeft + 250
                  : elementToScroll.scrollLeft - 250,
              behavior: "smooth",
            });
          }, 20);
        };
    });
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
}

.top-row div {
  border: 2px solid transparent;
  border-radius: 4px;
  display: inline-block;
  margin-right: 2px;
  padding: 2px;
}

.top-row .active {
  border-color: var(--border-color);
  border-radius: 8px;
}

.button-container {
  background: var(--background-color);
  border-radius: 25%;
  position: absolute;
  right: -3px;
  top: 78px;
  z-index: 2;
}

.button-popover {
  background: var(--background-color);
  border-radius: 10px;
  color: var(--background-color);
  max-width: 0;
  overflow: hidden;
  padding: 2px 5px;
  position: absolute;
  right: 15px;
  top: -1px;
  transition: 0.2s;
  white-space: nowrap;
  width: 80px;
  z-index: -1;
}

.button-container button:hover + .button-popover {
  color: var(--text-color);
  max-width: 100px;
}

.content-container {
  border: 3px solid var(--border-color);
  border-radius: 5px;
  padding: 10px;
  min-height: 300px;
  height: 75vh;
  position: relative;
}

.header {
  background: var(--background-color);
  border-radius: 5px;
  margin: 0;
  padding: 0 5px;
  position: absolute;
  top: 2em;
  left: 10px;
  z-index: 666;
}

.tab-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  width: 100%;
  position: absolute;
  z-index: 1000;
}

.tab-container-container {
  height: 60px;
  position: relative;
}

.tab-scroll-container {
  flex-grow: 1;
  min-width: 0;
}

.overview-table {
  text-align: center;
  width: 100%;
}

@media (max-width: 450px) {
  .overview-table {
    font-size: 0.85em;
  }

  .content-container {
    padding: 10px 0;
  }
}
</style>

<style>
/* Global styles */
img {
  max-height: 100%;
  max-width: 100%;
}

p {
  font-size: 0.9em;
  margin-top: 0;
}

h4 {
  margin: 0;
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

@media (max-width: 600px) {
  .hide-small {
    display: none;
  }
}

.tab-container .simplebar-content {
  display: flex;
  flex-wrap: nowrap;
}

.simplebar-scrollbar:before {
  background: var(--border-color);
}

.simplebar-track.simplebar-horizontal .simplebar-scrollbar::before {
  height: 5px;
  bottom: -2px;
}

/* Utility classes */
.active {
  opacity: 1 !important;
}

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

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-grow {
  flex-grow: 1;
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

.inline-block {
  display: inline-block;
}

.nowrap {
  display: flex;
  flex-wrap: nowrap;
}

.noshrink {
  flex-shrink: 0;
}

.noselect {
  user-select: none;
}
</style>
