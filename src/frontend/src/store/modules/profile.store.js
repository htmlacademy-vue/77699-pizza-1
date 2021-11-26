import { GET_ADDRESSES, GET_ORDERS } from "@/store/mutation-types.js";

export default {
  namespaced: true, // у модуля будет свой префикс
  state: {
    Addresses: [],
    orders: [],
  },
  mutations: {
    [GET_ADDRESSES](state, addresses) {
      if (addresses.length > 0) {
        state.Addresses = addresses;
      }
    },
    [GET_ORDERS](state, orders) {
      if (orders.length > 0) {
        state.orders = orders;
      }
    },
  },
  actions: {
    async getAddresses({ commit }, config) {
      const data = await this.$api.addresses.query(config);
      commit("GET_ADDRESSES", data);
    },
    async getOrders({ commit }, config) {
      const data = await this.$api.orders.query(config);
      commit("GET_ORDERS", data);
    },
  },
};
