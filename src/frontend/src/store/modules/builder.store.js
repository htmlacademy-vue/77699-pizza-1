import pizza from "@/static/pizza.json";
import { DoughTypes } from "@/common/constants";
import { PizzaSizes } from "@/common/constants";
import { normalizePizza } from "@/common/helpers";
import { SauceTypes } from "@/common/constants";
import { FillingTypes } from "@/common/constants";
import {
  CHANGE_DOUGH,
  CHANGE_SIZE,
  CHANGE_SAUCE,
  CHANGE_FILLINGS,
  CHANGE_PIZZA_NAME,
  RESET_PIZZA,
  SET_PIZZA,
} from "@/store/mutation-types.js";

export default {
  namespaced: true, // у модуля будет свой префикс
  state: {
    Doughs: normalizePizza(pizza.dough, DoughTypes),
    Sizes: normalizePizza(pizza.sizes, PizzaSizes),
    Sauces: normalizePizza(pizza.sauces, SauceTypes),
    Ingredients: normalizePizza(pizza.ingredients, FillingTypes),
    doughChecked: "small",
    pizzaDough: "light",
    doughPrice: 300,
    sauceChecked: "tomato",
    saucePrice: 50,
    sizeChecked: "normal",
    sizePrice: 2,
    Fillings: [],
    pizzaName: "",
    pizzaIndex: -1,
  },
  getters: {
    Price(state) {
      let ingridientPrice = 0;
      let price = 0;
      if (state.Fillings.length > 0) {
        for (let value of state.Fillings) {
          ingridientPrice += value.fillingPrice * value.count;
        }
        price =
          (state.doughPrice + state.saucePrice + ingridientPrice) *
          state.sizePrice;
      }
      return price;
    },
    ButtonStatus(state) {
      if (state.pizzaName.length > 0 && state.Fillings.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    FillingsArr(state) {
      let arr = [];
      for (let value of state.Fillings) {
        let number = "first";
        switch (value.count) {
          case 1:
            number = "first";
            break;
          case 2:
            number = "second";
            break;
          case 3:
            number = "third";
            break;
          default:
            number = "first";
        }
        arr.push({
          filling: value.filling,
          number: number,
        });
      }
      return arr.flat();
    },
  },
  mutations: {
    [CHANGE_DOUGH](state, newDough) {
      state.doughChecked = newDough.name;
      state.doughPrice = newDough.price;
    },
    [CHANGE_SIZE](state, newSize) {
      state.sizeChecked = newSize.name;
      state.sizePrice = newSize.price;
    },
    [CHANGE_SAUCE](state, newSauce) {
      state.sauceChecked = newSauce.name;
      state.saucePrice = newSauce.price;
    },
    [CHANGE_FILLINGS](state, newFilling) {
      if (newFilling.count > 0) {
        if (state.Fillings.some((val) => val.filling === newFilling.filling)) {
          state.Fillings = state.Fillings.filter(function (obj) {
            return obj.filling !== newFilling.filling;
          });
          state.Fillings.push(newFilling);
        } else {
          state.Fillings.push(newFilling);
        }
      } else {
        if (state.Fillings.some((val) => val.filling === newFilling.filling)) {
          state.Fillings = state.Fillings.filter(function (obj) {
            return obj.filling !== newFilling.filling;
          });
        }
      }
    },
    [CHANGE_PIZZA_NAME](state, newPizzaName) {
      state.pizzaName = newPizzaName;
    },
    [RESET_PIZZA](state) {
      (state.doughChecked = "small"),
        (state.doughPrice = 300),
        (state.sauceChecked = "tomato"),
        (state.saucePrice = 50),
        (state.sizeChecked = "normal"),
        (state.sizePrice = 2),
        (state.Fillings = []),
        (state.pizzaIndex = -1),
        (state.pizzaName = "");
    },
    [SET_PIZZA](state, newPizza) {
      if (newPizza.pizza.pizzaDough === "light") {
        state.doughChecked = "small";
      } else state.doughChecked = "big";
      state.pizzaDough = newPizza.pizza.pizzaDough;
      state.sauceChecked = newPizza.pizza.pizzaSauce;
      state.sizeChecked = newPizza.pizza.pizzaSize;
      state.sizePrice = newPizza.pizza.sizePrice;
      state.pizzaName = newPizza.pizza.name;
      state.Fillings = newPizza.pizza.pizzaFillings;
      state.pizzaIndex = newPizza.indx;
    },
  },
};
