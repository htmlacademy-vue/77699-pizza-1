import Vue from "vue";
import VuexPlugins from "@/plugins/vuexPlugins";
import Vuex from "vuex";
// импорт модулей
import modules from "@/store/modules/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  plugins: [VuexPlugins],
  actions: {},
  modules,
});
