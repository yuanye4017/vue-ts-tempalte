import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "normalize.css/normalize.css";
import "@/styles/index.scss";

import "./permission";
import "amfe-flexible/index.js";

// 解决click事件300ms延迟
import fastClick from "fastclick";
fastClick.attach(document.body);
// 全局svg-icon
import "./icons/index";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
