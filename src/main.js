import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

// import type { Locales } from './i18n/constants'
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

// load resources
(async () => {
  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.component("v-select", vSelect);
  app.mount("#app");
})();
