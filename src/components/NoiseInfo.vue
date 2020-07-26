<template>
  <simplebar class="tab-scroll-container">
    <div class="text-small flex-col">
      <!-- <div class="image-container">
        <div class="container-redux">
          <img :src="data.Noise['Image URL']" />
        </div>
      </div>-->
      <div>
        <div class="flex noise">
          <h2 style="margin-right:10px;">{{ data.Noise.Name }}</h2>
          {{ data.Noise.Species }}
        </div>
        <div class="flex">
          <button type="button" v-clipboard:copy="cp" @click="toast(data.Noise.Name)">
            <font-awesome-icon class="fade" :icon="['fas', 'copy']" :style="data.Color" />
          </button>
          <StatTile :stats="data.Noise.HP" :name="'HP'" :color="data.Color" />
          <StatTile :stats="data.Noise.ATK" :name="'ATK'" :color="data.Color" />
          <StatTile :stats="data.Noise.DEF" :name="'DEF'" :color="data.Color" />
        </div>
        <template v-for="(ability, index) in data.Noise.Abilities">
          <h4 :key="data.Noise.name + index + 'n'">{{ ability.name }}</h4>
          <p :key="data.Noise.name + index + 'p'">{{ ability.d }}</p>
        </template>
        <!-- <div class="image">
          <div class="container-redux">
            <img :src="data.Noise['Image URL']" />
          </div>
        </div>-->
      </div>
    </div>
  </simplebar>
</template>

<script>
import StatTile from "./StatTile";
import simplebar from "simplebar-vue";
import { toast } from "./mixins/utilities";

export default {
  components: {
    simplebar,
    StatTile
  },
  mixins: [toast],
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    cp() {
      const hp = `${this.data.Noise.HP.total} / ${this.data.Noise.HP.total} HP`;
      const atk = `${this.data.Noise.ATK.total} ATK`;
      const def = `${this.data.Noise.DEF.total} DEF`;
      const abilities = this.data.Noise.Abilities.map(ability => {
        return `${ability.name} - *${ability.d.trim()}*`;
      }).join("|\n");
      return `**${this.data.Noise.Name} | ${hp} | ${atk} | ${def}**\n${abilities}`;
    }
  }
};
</script>

<style scoped>
h2 {
  margin-top: 0;
}

.image-container {
  display: inline-flex;
  align-items: center;
  height: 200px;
  width: 200px;
}

.image {
  display: none;
}

.container-redux {
  margin: 0 auto;
}

.flex.noise {
  align-items: baseline;
}

.flex {
  margin-bottom: 10px;
}

@media (max-width: 600px) {
  .image-container {
    display: none;
  }

  .image {
    display: inline-flex;
    align-items: center;
    height: 200px;
    width: 100%;
  }

  .flex-col {
    align-items: center;
  }
}
</style>
