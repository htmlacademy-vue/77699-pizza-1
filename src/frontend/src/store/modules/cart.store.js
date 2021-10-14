import { CHANGE_CART_PIZZA, CHANGE_CART_ITEM } from "@/store/mutation-types.js";
import { PizzaSizes } from "@/common/constants";
import { getNameForCart } from "@/common/helpers";
import { DoughTypes } from "@/common/constants";
import { SauceTypes } from "@/common/constants";
import items from "@/static/misc.json";

export default {
  namespaced: true,
  state: {
    pizzas: [],
    items: items,
    colaPrice: 0,
    saucePrice: 0,
    potatoPrice: 0,
  },
  getters: {
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
        (accumulator, currentValue) => accumulator + currentValue.price,
        orderFullPrice
      );
      orderFullPrice =
        pizzaTotal + state.colaPrice + state.saucePrice + state.potatoPrice;
      return orderFullPrice;
    },
  },
  mutations: {
    [CHANGE_CART_PIZZA](state, newPizza) {
      state.pizzas.push({
        name: newPizza.name,
        size: getNameForCart(newPizza.size, PizzaSizes).label,
        dough: getNameForCart(newPizza.dough, DoughTypes).label,
        sauce: getNameForCart(newPizza.sauce, SauceTypes).label,
        price: newPizza.price,
      });
    },
    [CHANGE_CART_ITEM](state, newPrice) {
      if (newPrice.type == 1) state.colaPrice = newPrice.price;
      if (newPrice.type == 2) state.saucePrice = newPrice.price;
      if (newPrice.type == 3) state.potatoPrice = newPrice.price;
    },
  },
};
