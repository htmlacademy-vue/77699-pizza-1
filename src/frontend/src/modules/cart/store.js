import {
  CHANGE_CART_PIZZA,
  CHANGE_CART_ITEM,
  RESET_CART,
  CHANGE_PIZZA_COUNT,
  GET_ITEMS,
  SET_CART_ORDER,
} from "@/store/mutation-types.js";

export default {
  namespaced: true,
  state: {
    pizzas: [],
    items: [],
    misc: [],
    addressId: -1,
  },
  getters: {
    getMiscById: (state) => (id) => {
      return state.items.find((item) => item.id === id);
    },
    Price(state) {
      let ingridientPrice = 0;
      for (let value of state.Fillings) {
        ingridientPrice += value.fillingPrice * value.count;
      }
      let price =
        (state.doughPrice + state.saucePrice + ingridientPrice) *
        state.sizePrice;
      return price;
    },
    CartPrice(state) {
      let orderFullPrice = 0;
      var pizzaTotal = state.pizzas.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.count,
        orderFullPrice
      );
      let miscTotal = 0;
      for (let value of state.misc) {
        miscTotal +=
          state.items.find((item) => item.id === value.miscId).price *
          value.count;
      }
      orderFullPrice = pizzaTotal + miscTotal;
      return orderFullPrice;
    },
  },
  mutations: {
    [GET_ITEMS](state, items) {
      state.items = items;
    },
    [CHANGE_CART_PIZZA](state, newPizza) {
      if (newPizza.indx == -1) {
        state.pizzas.push({
          name: newPizza.name,
          sizeId: newPizza.sizeId,
          doughId: newPizza.doughId,
          sauceId: newPizza.sauceId,
          count: 1,
          ingredients: newPizza.pizzaFillings,
          price: newPizza.price,
          id: state.pizzas.length + 1,
        });
      } else {
        state.pizzas[newPizza.indx].name = newPizza.name;
        state.pizzas[newPizza.indx].sizeId = newPizza.sizeId;
        state.pizzas[newPizza.indx].doughId = newPizza.doughId;
        state.pizzas[newPizza.indx].sauceId = newPizza.sauceId;
        state.pizzas[newPizza.indx].ingredients = newPizza.pizzaFillings;
        state.pizzas[newPizza.indx].price = newPizza.price;
      }
    },
    [SET_CART_ORDER](state, newOrder) {
      if (newOrder.pizzas != null && newOrder.pizzas.length > 0) {
        for (let pizza of newOrder.pizzas) {
          state.pizzas.push({
            name: pizza.pizza.name,
            sizeId: pizza.pizza.sizeId,
            doughId: pizza.pizza.doughId,
            sauceId: pizza.pizza.sauceId,
            ingredients: pizza.pizza.fillings,
            count: pizza.pizza.quantity,
            price: pizza.price,
          });
        }
      }
      if (newOrder.misc != null && newOrder.misc.length > 0) {
        for (let misc of newOrder.misc) {
          state.misc.push({
            miscId: misc.miscId,
            count: misc.quantity,
            price: misc.price,
          });
        }
      }
      if (newOrder.addressId != null) state.addressId = newOrder.addressId;
    },
    [CHANGE_CART_ITEM](state, newMisc) {
      if (state.misc.filter((e) => e.miscId === newMisc.id).length > 0) {
        const objIndex = state.misc.findIndex((e) => e.miscId === newMisc.id);
        if (newMisc.count > 0) state.misc[objIndex].count = newMisc.count;
        else state.misc.splice(objIndex, 1);
      } else {
        state.misc.push({
          miscId: newMisc.id,
          count: newMisc.count,
          price: newMisc.price,
        });
      }
    },
    [CHANGE_PIZZA_COUNT](state, newCount) {
      state.pizzas[newCount.indx].count = newCount.count;
    },
    [RESET_CART](state) {
      (state.pizzas = []), (state.misc = []);
    },
  },
  actions: {
    async getItems({ commit }, config) {
      const data = await this.$api.misc.query(config);
      commit("GET_ITEMS", data);
    },
  },
};
