import Vue from "vue";

import "normalize.css";
import "@/styles/index.scss";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./permission";
import "amfe-flexible/index.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
