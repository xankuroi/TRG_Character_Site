<template>
  <div style="padding-left: 10px">
    <div class="flex">
      <div class="flex-col flex-grow">
        <div>
          {{ data["Full Name"] }}
          <span class="text-small">- {{ data.Age }}&nbsp;</span>
          <span class="text-smaller">- {{ data.Pronouns }}</span>
        </div>
        <div
          v-if="data.Special && data.Special.length > 0"
          class="inline-block text-small"
          :style="{ color: '#' + data.Special[0].n }"
        >{{ data.Special[0].name }} DIVISION</div>
        <div v-if="isPlayer(data) && data.Partner" @click="$emit('goto', data.Partner)">
          <font-awesome-icon :icon="['fas', 'handshake']" :style="data.Color" />
          <span class="fade cursor">{{ ' ' + data.Partner }}</span>
        </div>
        <div v-if="!isPlayer(data)">
          <font-awesome-icon :icon="['fas', 'briefcase']" :style="data.Color" />
          {{ data.Position }}
        </div>
      </div>
      <div class="mun noshrink">
        <div class="nowrap">
          <font-awesome-icon :icon="['fas', data.OwO ? data.OwO : 'user']" :style="data.Color" />
          <span class="text-small">{{ data.Mun }}</span>
        </div>
        <div v-if="data.Timezone" class="nowrap">
          <font-awesome-icon :icon="['fas', 'clock']" :style="data.Color" />
          <span class="text-small">{{ data.Timezone }}</span>
        </div>
        <!-- <div v-if="data.Discord" class="nowrap">
          <font-awesome-icon :icon="['fab', 'discord']" :style="data.Color" />
          <span class="text-small">{{ data.Discord }}</span>
        </div>-->
      </div>
    </div>
    <StatBlock :data="data" />
  </div>
</template>

<script>
import StatBlock from "./StatBlock";
import { isPlayer } from "./mixins/utilities";

export default {
  components: {
    StatBlock,
  },
  mixins: [isPlayer],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.flex {
  align-items: start;
}

.nowrap {
  margin-left: 5px;
}
</style>
