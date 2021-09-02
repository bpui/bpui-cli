import "core-js/stable";
import "regenerator-runtime/runtime";

import "febs-browser";
import "./registerHook";
import "./registerServiceWorker";

import Vue from "vue";
import bpui from "bpui.js";

//--------------------------------------------------------
// static load components
//--------------------------------------------------------
import 'bpui.js/static';
import App from "./app.vue";
import routers from "./router";

__debug = process.env.NODE_ENV === "development";
Vue.config.productionTip = false;

// navbar cfg.
bpui.setNavbarDefaultCfg({
  retainPageInPush: false,
});

// 404 使用nginx指向 /404.html 页面.
// routers.push({ path: '*', component: () => import('./pages/default/404.vue') });
routers.push({ name: null, path: '404.html', component: () => import('./pages/default/404.vue') });

// register app.
bpui.registerApp({ routePath: routers, basePath: '/' });

// create instance.
export default new Vue({
  render: h => h(App)
}).$mount("#app");


// //--------------------------------------------------------
// // dynamic load components
// //--------------------------------------------------------
// __debug = process.env.NODE_ENV === "development";
// Vue.config.productionTip = false;

// bpui
//   .registerComponents(Vue)
//   // navbar cfg.
//   .then(() => {
//     bpui.setNavbarDefaultCfg({
//       retainPageInPush: false,
//     });
//   })
//   // app.
//   .then(() => Promise.all([import("./app.vue"), import("./router")]))
//   .then(modules => {

//     const App = modules[0].default;
//     const routers: any[] = modules[1].default;

//     // 404 使用nginx指向 /404.html 页面.
//     // routers.push({ path: '*', component: () => import('./pages/default/404.vue') });
//     routers.push({ path: '404.html', component: () => import('./pages/default/404.vue') });

//     // register app.
//     bpui.registerApp({ routePath: routers, basePath: '/' });
    
//     // create instance.
//     new Vue({
//       render: h => h(App)
//     }).$mount("#app");

//   })
//   .catch(e => {
//     console.error(e);
//   });
