import { cloneDeep } from "lodash";

import modules from "@/modules/index.js";
import Vuex from "vuex";

import users from "@/static/users";
import VuexPlugins from "@/plugins/vuexPlugins";

const state = () => ({
  notifications: [],
  users,
});

export const generateMockStore = (actions) => {
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};
