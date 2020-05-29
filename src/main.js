import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import Toasted from "vue-toasted";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBriefcase, // Position
  faClipboardCheck, // Copied!
  faClock, // Timezone
  faCopy, // Copy/Paste
  // faDiscord, // Discord
  faHandshake, // Partner
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
  faBriefcase,
  faClipboardCheck,
  faClock,
  faCopy,
  faDiscord,
  faHandshake,
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
