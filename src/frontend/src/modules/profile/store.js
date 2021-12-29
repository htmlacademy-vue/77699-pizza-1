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
    async deleteAddress({ dispatch }, addressId) {
      await this.$api.addresses.delete(addressId);
      await dispatch("getAddresses");
    },
    async deleteOrder(orderId) {
      await this.$api.orders.delete(orderId);
    },
    async putAddress({ dispatch }, address) {
      await this.$api.addresses.put({
        id: address.id,
        name: address.name,
        userId: address.userId,
        street: address.street,
        building: address.building,
        flat: address.flat,
        comment: address.comment,
      });
      await dispatch("getAddresses");
    },
    async postAddress({ dispatch }, address) {
      await this.$api.addresses.post({
        name: address.name,
        userId: address.userId,
        street: address.street,
        building: address.building,
        flat: address.flat,
        comment: address.comment,
      });
      await dispatch("getAddresses");
    },
    async postOrder({ dispatch }, order) {
      await this.$api.orders.post({
        userId: order.userId,
        pizzas: order.pizzas,
        misc: order.misc,
        address: order.address,
      });
      await dispatch("getOrders");
    },
  },
};
