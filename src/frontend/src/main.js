import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store"; // добавляем store

Vue.config.productionTip = false;

new Vue({
  router,
  store, // добавляем store
  render: (h) => h(App),
}).$mount("#app");
