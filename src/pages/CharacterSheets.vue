<template>
  <div class="container">
    <div class="button-container text-smaller">
      <button v-on:click="loadData">
        <font-awesome-icon :icon="['fas', 'sync']" />
      </button>
      <div class="button-popover">reload data</div>
    </div>
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
                  <span class="fade cursor" @click="activeIndex = index">{{
                    sheet.Name
                  }}</span>
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
                  <button
                    type="button"
                    v-clipboard:copy="sheet.CP"
                    @click="toast(sheet.Name)"
                  >
                    <font-awesome-icon
                      class="fade"
                      :icon="['fas', 'copy']"
                      :style="sheet.Color"
                    />
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
            @goto="handleGoto"
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
    },
    toast(name) {
      this.$toasted.show(`Copied ${name}'s stats!`, {
        duration: 1500
      });
    },
    handleGoto(name) {
      this.activeIndex = this.sheets.findIndex(data => data.Name === name);
    }
  },
  mounted() {
    this.$emit("mounted");
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
  position: absolute;
  right: 10px;
  top: 53px;
  z-index: 2;
}

.button-popover {
  background: var(--background-color);
  color: var(--background-color);
  max-width: 0;
  overflow: hidden;
  padding: 2px 5px;
  position: absolute;
  right: 15px;
  top: 0;
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
