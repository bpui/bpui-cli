import "core-js/stable";
import "regenerator-runtime/runtime";

import "febs-browser";
import "./registerHook";
import "./registerServiceWorker";

import Vue from "vue";
import bpui from "bpui.js";

__debug = process.env.NODE_ENV === "development";
Vue.config.productionTip = false;



bpui
  // load dynamic components
  .registerComponents(Vue)
  // set layouts.
  .then(() => {
    (bpui.setNavbarDefaultCfg as any)({
      allLayouts: [
        '/',
        'layout2'
      ]
    });
  })
  // app.
  .then(() => Promise.all([import("./app.vue"), import("./router")]))
  .then(modules => {

    const App = modules[0].default;
    const routers: any[] = modules[1].default;
    routers.push({ path: '*', component: () => import('./pages/default/404.vue') });

    //
    // 注册应用.
    bpui.registerApp({ routePath: routers, basePath: '/' });
    
    //
    // 创建实例.
    new Vue({
      render: h => h(App)
    }).$mount("#app");

  })
  .catch(e => {
    console.error(e);
  });
