<template>
  <tr>
    <td class="text-left">
      <span :style="sheet.Color">█</span>
      <span class="fade cursor" @click="$emit('click')">{{ " " + sheet.Name }}</span>
    </td>
    <td>
      {{ sheet.HP.current }}/{{ sheet.HP.total }}
      <span class="hide-small">HP</span>
    </td>
    <td>
      {{ sheet.ATK.total }}
      <span class="hide-small">ATK</span>
    </td>
    <td>
      {{ sheet.DEF.total }}
      <span class="hide-small">DEF</span>
    </td>
    <td>
      <button type="button" v-clipboard:copy="sheet.CP" @click="toast(sheet.Name)">
        <font-awesome-icon class="fade" :icon="['fas', 'copy']" :style="sheet.Color" />
      </button>
    </td>
  </tr>
</template>

<script>
import { toast } from "./mixins/utilities";

export default {
  mixins: [toast],
  props: {
    sheet: {
      type: Object,
      required: true
    }
  }
};
</script>
