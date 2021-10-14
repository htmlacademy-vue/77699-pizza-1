import Vue from "vue";
import Vuex from "vuex";
// импорт модулей
import modules from "@/modules/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules,
});
