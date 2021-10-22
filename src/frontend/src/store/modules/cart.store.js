import {
  CHANGE_CART_PIZZA,
  CHANGE_CART_ITEM,
  RESET_CART,
  CHANGE_PIZZA_COUNT,
} from "@/store/mutation-types.js";
import { PizzaSizes } from "@/common/constants";
import { getNameForCart, getFillingsForCart } from "@/common/helpers";
import { DoughTypes } from "@/common/constants";
import { FillingTypes } from "@/common/constants";
import { SauceTypes } from "@/common/constants";
import items from "@/static/misc.json";
import deliveryItems from "@/static/delivery.json";

export default {
  namespaced: true,
  state: {
    pizzas: [],
    items: items,
    deliveryItems: deliveryItems,
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
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.count,
        orderFullPrice
      );
      orderFullPrice =
        pizzaTotal + state.colaPrice + state.saucePrice + state.potatoPrice;
      return orderFullPrice;
    },
  },
  mutations: {
    [CHANGE_CART_PIZZA](state, newPizza) {
      if (newPizza.indx == -1) {
        state.pizzas.push({
          name: newPizza.name,
          size: getNameForCart(newPizza.size, PizzaSizes).label,
          pizzaSize: newPizza.size,
          dough: getNameForCart(newPizza.dough, DoughTypes).label,
          pizzaDough: newPizza.dough,
          sauce: getNameForCart(newPizza.sauce, SauceTypes).label.toLowerCase(),
          pizzaSauce: newPizza.sauce,
          count: 1,
          fillings: getFillingsForCart(newPizza.fillings, FillingTypes).join(
            ", "
          ),
          pizzaFillings: newPizza.pizzaFillings,
          price: newPizza.price,
        });
      } else {
        state.pizzas[newPizza.indx].name = newPizza.name;
        state.pizzas[newPizza.indx].size = getNameForCart(
          newPizza.size,
          PizzaSizes
        ).label;
        state.pizzas[newPizza.indx].pizzaSize = newPizza.size;
        state.pizzas[newPizza.indx].dough = getNameForCart(
          newPizza.dough,
          DoughTypes
        ).label;
        state.pizzas[newPizza.indx].pizzaDough = newPizza.dough;
        state.pizzas[newPizza.indx].sauce = getNameForCart(
          newPizza.sauce,
          SauceTypes
        ).label.toLowerCase();
        state.pizzas[newPizza.indx].pizzaSauce = newPizza.sauce;
        state.pizzas[newPizza.indx].fillings = getFillingsForCart(
          newPizza.fillings,
          FillingTypes
        ).join(", ");
        state.pizzas[newPizza.indx].pizzaFillings = newPizza.pizzaFillings;
        state.pizzas[newPizza.indx].price = newPizza.price;
      }
    },
    [CHANGE_CART_ITEM](state, newPrice) {
      if (newPrice.type == 1) state.colaPrice = newPrice.price;
      if (newPrice.type == 2) state.saucePrice = newPrice.price;
      if (newPrice.type == 3) state.potatoPrice = newPrice.price;
    },
    [CHANGE_PIZZA_COUNT](state, newCount) {
      state.pizzas[newCount.indx].count = newCount.count;
    },
    [RESET_CART](state) {
      (state.pizzas = []),
        (state.colaPrice = 0),
        (state.saucePrice = 0),
        (state.potatoPrice = 0);
    },
  },
};
