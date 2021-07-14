import "core-js/stable";
import "regenerator-runtime/runtime";

import "febs-browser";
import Vue from "vue";
import bpui from "bpui.js";
import "./registerHook";

__debug = process.env.NODE_ENV === "development";
Vue.config.productionTip = false;

bpui
  .registerComponents(Vue)  // dynamic load components
  .then(() => Promise.all([import("./app.vue"), import("./router")]))
  .then(modules => {

    let App = modules[0].default;
    let router: any = modules[1].default;

    //
    // 注册应用.
    bpui.registerApp({ routePath: router, basePath: '/' });
    
    //
    // 创建实例.
    new Vue({
      render: h => h(App)
    }).$mount("#app");

  })
  .catch(e => {
    console.error(e);
  });
