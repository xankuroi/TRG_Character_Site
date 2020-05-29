<template>
  <div class="container">
    <div class="button-container text-smaller">
      <button v-on:click="loadData">
        <font-awesome-icon :icon="['fas', 'sync']" />
      </button>
      <div class="button-popover">reload data</div>
    </div>
    <div class="tab-container flex">
      <Tab :name="'Overview'" :active="activeIndex === -1" @click="activeIndex = -1" />
      <div class="tab-scroll-container">
        <template v-for="(sheet, index) in playerSheets">
          <Tab
            :name="sheet.Name"
            :active="activeIndex === index"
            :color="sheet.Color.color"
            :key="'tp-' + index"
            @click="activeIndex = index"
          />
        </template>
        <template v-for="(sheet, index) in reaperSheets">
          <Tab
            :name="sheet.Name"
            :active="activeIndex === index + pLen"
            :color="sheet.Color.color"
            :key="'tr-' + index"
            @click="activeIndex = index + pLen"
          />
        </template>
      </div>
    </div>
    <div class="content-container">
      <Loader v-show="!loaded" />
      <template v-if="loaded">
        <TabContent v-show="activeIndex === -1" :key="'overview'">
          <template v-slot:title>Overview</template>
          <template v-slot:hero>
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
                @click="activeIndex = index"
              />
              <OverviewRow
                v-for="(sheet, index) in reaperSheets"
                :sheet="sheet"
                :key="'ovr-' + index"
                @click="activeIndex = index + pLen"
              />
            </table>
          </template>
        </TabContent>
        <Profile
          v-for="(sheet, index) in playerSheets"
          v-show="activeIndex === index"
          :data="sheet"
          :key="'pp-' + index"
          @goto="handleGoto"
        />
        <Profile
          v-for="(sheet, index) in reaperSheets"
          v-show="activeIndex === index + pLen"
          :data="sheet"
          :key="'pr-' + index"
          @goto="handleGoto"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader";
import OverviewRow from "../components/OverviewRow";
import Profile from "../components/Profile";
import Tab from "../components/Tab";
import TabContent from "../components/TabContent";
import { processSpreadsheet } from "../components/mixins/processSheets";

export default {
  components: {
    OverviewRow,
    Profile,
    Tab,
    TabContent,
    Loader
  },
  data() {
    const gs = "https://docs.google.com/spreadsheets/d/e/KEY/pub?output=xlsx";
    return {
      activeIndex: -1,
      playersURL: gs.replace("KEY", window.playerKey),
      reapersURL: gs.replace("KEY", window.reaperKey),
      ploaded: false,
      rloaded: false,
      playerSheets: {},
      reaperSheets: {}
    };
  },
  computed: {
    loaded() {
      return this.ploaded && this.rloaded;
    },
    pLen() {
      return Object.keys(this.playerSheets).length;
    }
  },
  methods: {
    loadData() {
      this.ploaded = false;
      this.rloaded = false;
      processSpreadsheet(this.playersURL)
        .then(stuff => (this.playerSheets = stuff.sheets))
        .then(() => this.$nextTick(() => (this.ploaded = true)));
      processSpreadsheet(this.reapersURL)
        .then(stuff => (this.reaperSheets = stuff.sheets))
        .then(() => this.$nextTick(() => (this.rloaded = true)));
    },
    handleGoto(name) {
      this.activeIndex = this.playerSheets.findIndex(
        data => data.Name === name
      );
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
}

.button-container {
  background: var(--background-color);
  border-radius: 25%;
  position: absolute;
  right: -3px;
  top: 55px;
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
  min-height: 500px;
  height: 80vh;
  position: relative;
}

.tab-container {
  box-sizing: border-box;
  padding: 10px;
  overflow: auto;
  width: 90%;
}

.tab-scroll-container {
  overflow: hidden;
  white-space: nowrap;
}

.overview-table {
  text-align: center;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
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
@media (max-width: 600px) {
  .hide-small {
    display: none;
  }
}
</style>