<template>
  <div>
    <button v-on:click="loadData">
      Reload
    </button>
    <div class="tab-container">
      <Tab
        :name="'Overview'"
        :class="{ active: activeIndex === -1 }"
        @click="activeIndex = -1"
      />
      <template v-for="(sheet, name, index) in processedSheets">
        <Tab
          :name="name"
          :class="{ active: activeIndex === index }"
          :rawColor="sheet.Color"
          :key="index"
          @click="activeIndex = index"
        />
      </template>
    </div>
    <div class="content-container">
      <TabContent v-show="activeIndex === -1">
        <template v-slot:title>Overview</template>
        <template v-slot:hero>
          placeholder
        </template>
      </TabContent>
      <template v-for="(sheet, name, index) in processedSheets">
        <Profile v-if="activeIndex === index" :data="sheet" :key="index" />
      </template>
    </div>
  </div>
</template>

<script>
import Tab from "../components/Tab.vue";
import TabContent from "../components/TabContent.vue";
import Profile from "../components/Profile";
import XLSX from "xlsx";

export default {
  components: {
    Profile,
    Tab,
    TabContent
  },
  data() {
    return {
      activeIndex: -1,
      coordRegex: new RegExp(/[a-z]+|\d+/gi),
      rawData: {},
      sheetURL: `https://docs.google.com/spreadsheets/d/e/${window.publishKey}/pub?output=xlsx`
    };
  },
  computed: {
    lookup() {
      return {
        Pins: this.keyData(this.rawData.Pins, "Name"),
        Threads: this.keyData(this.rawData.Threads, "Name"),
        Food: this.keyData(this.rawData.Foods, "Name")
      };
    },
    sheetConfig() {
      return this.toJSON(this.rawData.Config);
    },
    ignoredSheets() {
      const partialMatch = this.sheetConfig[1].UNSEEN.split(",")
        .map(str => str.trim())
        .join("|");
      const exactMatch = this.sheetConfig[0].UNSEEN.split(",")
        .map(str => str.trim())
        .join("$|^");
      return new RegExp(`${partialMatch}|^${exactMatch}$`);
    },
    dataCoords() {
      let hsh = {};
      this.sheetConfig.forEach(datum => {
        if (datum.FIELD) {
          hsh[datum.FIELD] = datum.COORD;
        }
      });
      return hsh;
    },
    processedSheets() {
      let hsh = {};
      Object.keys(this.rawData || {})
        .filter(key => !this.ignoredSheets.test(key))
        .forEach(key => (hsh[key] = this.processSheet(this.rawData[key])));
      return hsh;
    }
  },
  methods: {
    toJSON(sheet) {
      return XLSX.utils.sheet_to_json(sheet);
    },
    processCoord(coord, rowOffset, colOffset) {
      let [col, row] = coord.match(this.coordRegex);
      // WARNING: doesn't handle Z -> AA transition
      if (colOffset) {
        col = String.fromCharCode(col.charCodeAt(0) + colOffset);
      }
      if (rowOffset) {
        row = Number(row) + rowOffset;
      }
      return col + row;
    },
    processField(sheet, field) {
      if (!field.LEN) {
        // standard processing
        return sheet[field.COORD] ? sheet[field.COORD].w : "";
      }
      // special processing
      let data;
      const num = Number(field.LEN);
      const coord = field.COORD;

      if (num) {
        // numeric LEN, so this is inventory
        const nOffset = Number(field.N);
        const dOffset = Number(field.D);
        data = [];
        for (let i = 0; i < num; i++) {
          const name = sheet[this.processCoord(coord, i, 0)];
          if (name) {
            let datum = { name: name.w };
            if (this.lookup[field.NAME]) {
              datum = this.lookup[field.NAME][name.w];
              if (!datum) {
                continue;
              }
            }
            if (nOffset) {
              const n = sheet[this.processCoord(coord, i, nOffset)];
              if (n) {
                datum.n = n.v;
              }
            }
            if (dOffset) {
              const d = sheet[this.processCoord(coord, i, dOffset)];
              if (d) {
                datum.d = d.v;
              }
            }
            data.push(datum);
          }
        }
      } else {
        // non-numeric LEN, so these are stats
        data = {
          raw: sheet[coord].v,
          misc: sheet[this.processCoord(coord, Number(field.N), 0)].v,
          trained: sheet[this.processCoord(coord, Number(field.D), 0)].v
        };
        if (field.NAME === "HP") {
          data.current = data.trained;
        }
      }
      return data;
    },
    processSheet(sheet) {
      let data = { Noise: {} };
      this.sheetConfig.forEach(field => {
        const fieldData = this.processField(sheet, field);

        if (field.NAME.startsWith("Noise")) {
          data.Noise[field.NAME.substring(6)] = fieldData;
        } else {
          data[field.NAME] = fieldData;
        }
      });
      return data;
    },
    keyData(sheet, key) {
      let data = {};
      this.toJSON(sheet)
        .filter(row => row[key])
        .forEach(row => (data[row[key]] = row));
      return data;
    },
    loadData() {
      fetch(this.sheetURL)
        .then(resp => {
          if (!resp.ok) throw new Error("Failed to load data.");
          return resp.arrayBuffer();
        })
        .then(buffer => {
          const arrBuffer = new Uint8Array(buffer);
          this.rawData = XLSX.read(arrBuffer, { type: "array" }).Sheets;
        });
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
}

.tab-container {
  padding: 10px;
  overflow: auto;
  width: 100%;
}
</style>
