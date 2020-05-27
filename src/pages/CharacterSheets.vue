<template>
  <div>
    <button v-on:click="loadData">
      Reload
    </button>
    <div class="tab-container">
      <Tab
        :name="'Overview'"
        :active="activeIndex === -1"
        @click="activeIndex = -1"
      />
      <template v-for="(sheet, index) in sheets">
        <Tab
          :name="sheet.Name"
          :active="activeIndex === index"
          :color="sheet.Color.color"
          :key="index"
          @click="activeIndex = index"
        />
      </template>
    </div>
    <div class="content-container">
      <Loader v-show="!loaded" />
      <template v-if="loaded">
        <TabContent v-show="activeIndex === -1" :key="'overview'">
          <template v-slot:title>Overview</template>
          <template v-slot:hero>
            <table class="overview-table">
              <tr>
                <th>Name</th>
                <th>HP</th>
                <th>ATK</th>
                <th>DEF</th>
                <th>C/P</th>
              </tr>
              <tr v-for="(sheet, index) in sheets" :key="'ov-' + index">
                <td>
                  <span :style="sheet.Color">█ </span>
                  {{ sheet.Name }}
                </td>
                <td>
                  {{ sheet.HP.current }}/{{ sheet.HP.total }}
                  <span class="hide-small">HP</span>
                </td>
                <td>
                  {{ sheet.ATK.total }} <span class="hide-small">ATK</span>
                </td>
                <td>
                  {{ sheet.DEF.total }} <span class="hide-small">DEF</span>
                </td>
                <td>
                  <button type="button" v-clipboard:copy="sheet.CP">
                    Click!
                  </button>
                </td>
              </tr>
            </table>
          </template>
        </TabContent>
        <template v-for="(sheet, index) in sheets">
          <Profile
            v-show="activeIndex === index"
            :data="sheets[index]"
            :key="'pr-' + index"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import Tab from "../components/Tab";
import TabContent from "../components/TabContent";
import Profile from "../components/Profile";
import Loader from "../components/Loader";
import { processSpreadsheet } from "../components/mixins/processSheets";

export default {
  components: {
    Profile,
    Tab,
    TabContent,
    Loader
  },
  data() {
    return {
      activeIndex: -1,
      sheetURL: `https://docs.google.com/spreadsheets/d/e/${window.publishKey}/pub?output=xlsx`,
      loaded: false,
      sheets: {}
    };
  },
  methods: {
    loadData() {
      this.loaded = false;
      processSpreadsheet(this.sheetURL)
        .then(stuff => {
          this.sheets = stuff.sheets;
        })
        .then(() => this.$nextTick(() => (this.loaded = true)));
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
.content-container {
  border: 3px solid lightgray;
  border-radius: 5px;
  padding: 10px;
  min-height: 300px;
  height: 500px;
  position: relative;
}

.tab-container {
  padding: 10px;
  overflow: auto;
  width: 100%;
}

.overview-table {
  text-align: center;
  width: 100%;
}

.overview-table td:first-child,
.overview-table th:first-child {
  text-align: left;
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
  .hide-small {
    display: none;
  }

  .overview-table td {
    font-size: 0.85em;
  }
  .content-container {
    padding: 10px 0;
  }
}
</style>
