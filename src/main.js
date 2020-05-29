import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import Toasted from "vue-toasted";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAdjust, // Light mode
  faBriefcase, // Position
  faClipboardCheck, // Copied!
  faClock, // Timezone
  faCopy, // Copy/Paste
  faHandshake, // Partner
  faInfoCircle, // Notes
  faMoon, // Dark mode
  faSync, // Reload data
  faUser, // Mun
  faUserSecret,
  faWaveSquare // Noise
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(VueClipboard);
Vue.use(Toasted);
library.add(
  faAdjust,
  faBriefcase,
  faClipboardCheck,
  faClock,
  faCopy,
  faDiscord,
  faHandshake,
  faInfoCircle,
  faMoon,
  faSync,
  faUser,
  faUserSecret,
  faWaveSquare
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
