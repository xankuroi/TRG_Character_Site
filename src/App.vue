<template>
  <div id="app">
    <div v-if="keyPresent">
      This is a real page
      <div v-for="(sheet, index) in processedSheets" :key="index">
        {{ sheet }}
      </div>
      <Tab />
      <TabContent />
    </div>
    <div v-else class="list">
      <template v-for="week in weeks">
        <a
          :href="origin + '/' + week + '/players.html'"
          :key="week + '-player'"
        >
          {{ week }} Players
        </a>
        <a
          :href="origin + '/' + week + '/reapers.html'"
          :key="week + '-reaper'"
        >
          {{ week }} Reapers
        </a>
      </template>
    </div>
  </div>
</template>

<script>
import Tab from "./components/Tab.vue";
import TabContent from "./components/TabContent.vue";
import XLSX from "xlsx";

export default {
  name: "App",
  components: {
    Tab,
    TabContent
  },
  data() {
    return {
      keyPresent: !!window.publishKey,
      sheetURL: `https://docs.google.com/spreadsheets/d/e/${window.publishKey}/pub?output=xlsx`,
      weeks: window.weeks,
      origin: "",
      rawData: {},
      coordRegex: new RegExp(/[a-z]+|\d+/gi)
    };
  },
  computed: {
    pinData() {
      return this.keyData(this.rawData.Pins, "Name");
    },
    threadData() {
      return this.keyData(this.rawData.Threads, "Name");
    },
    foodData() {
      return this.keyData(this.rawData.Foods, "Name");
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
        return sheet[field.COORD].w;
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
            const datum = { name: name.w };
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
    loadData(url) {
      fetch(url)
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
    this.origin = window.location.origin;
    // Fetch data
    if (this.keyPresent) {
      this.loadData(this.sheetURL);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

.list a {
  display: block;
  margin-left: 20px;
}

a {
  color: #2c3e50;
  text-decoration: none;
}

a:hover {
  color: #5fbde5;
  font-weight: bold;
}
</style>
