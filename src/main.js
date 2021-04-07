import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";

import fastclick from "fastclick";
// 引入公共样式
import "assets/stylus/index.styl";

fastclick.attach(document.body);
Vue.config.productionTip = false;

// 配置lazyload
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require("assets/image/default.png"),
  loading: require("assets/image/default.png"),
  attempt: 1,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
