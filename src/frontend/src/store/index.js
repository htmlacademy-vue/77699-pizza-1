import Vue from "vue";
import VuexPlugins from "@/plugins/vuexPlugins";
import Vuex from "vuex";
// импорт модулей
import modules from "@/modules/index";
import { MESSAGE_LIVE_TIME } from "@/common/constants";
import { ADD_NOTIFICATION } from "@/store/mutation-types.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    [ADD_NOTIFICATION](state, notification) {
      alert(notification.notification.text);
    },
  },
  plugins: [VuexPlugins],
  actions: {
    createNotification({ commit }, { ...notification }) {
      const uniqueNotification = { notification, MESSAGE_LIVE_TIME };
      commit("ADD_NOTIFICATION", uniqueNotification);
    },
  },
  modules,
});
