import 'core-js/stable';
import 'regenerator-runtime/runtime';

import "febs-browser";
import Vue from "vue";
import bpui from 'bpui.js';
import App from "./app.vue";
import router from "./router";
import "./registerHook";

__debug = process.env.NODE_ENV === "development";
Vue.config.productionTip = false;

//
// 注册应用.
bpui.registerApp({routePath: router, basePath: '/'}, Vue);

//
// 创建实例.
export default new Vue({
  render: h => h(App)
}).$mount("#app");
