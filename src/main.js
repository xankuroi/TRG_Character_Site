import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import Toasted from "vue-toasted";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBriefcase,
  faClipboard,
  faClipboardCheck,
  faCopy,
  faHandshake,
  faSync
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(VueClipboard);
Vue.use(Toasted);
library.add(
  faBriefcase,
  faClipboard,
  faClipboardCheck,
  faCopy,
  faHandshake,
  faSync
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
