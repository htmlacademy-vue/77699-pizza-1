import { PizzaSizes } from "@/common/constants";
import { normalizePizza } from "@/common/helpers";
import { SauceTypes } from "@/common/constants";
import { DoughTypes } from "@/common/constants";
import { FillingTypes } from "@/common/constants";
import {
  GET_DOUGH,
  GET_SIZE,
  GET_SAUCE,
  GET_INGREDIENTS,
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
    Doughs: [],
    Sizes: [],
    Sauces: [],
    Ingredients: [],
    doughId: 1,
    pizzaDough: "light",
    doughPrice: 300,
    sauceId: 1,
    saucePrice: 50,
    sizeId: 2,
    sizePrice: 2,
    Fillings: [],
    pizzaName: "",
    pizzaIndex: -1,
  },
  getters: {
    getDoughById: (state) => (id) => {
      return state.Doughs.find((item) => item.id === id);
    },
    getSauceById: (state) => (id) => {
      return state.Sauces.find((item) => item.id === id);
    },
    getSizeById: (state) => (id) => {
      return state.Sizes.find((item) => item.id === id);
    },
    getIngredientById: (state) => (id) => {
      return state.Ingredients.find((item) => item.id === id);
    },
    Price(state) {
      let ingridientPrice = 0;
      let price = 0;
      if (state.Fillings.length > 0) {
        for (let value of state.Fillings) {
          ingridientPrice += value.fillingPrice * value.count;
        }
        price =
          (state.doughPrice + state.saucePrice + ingridientPrice) *
          state.Sizes.find((item) => item.id === state.sizeId).multiplier;
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
    [GET_DOUGH](state, doughs) {
      state.Doughs = doughs;
    },
    [GET_SIZE](state, sizes) {
      state.Sizes = sizes;
    },
    [GET_SAUCE](state, sauces) {
      state.Sauces = sauces;
    },
    [GET_INGREDIENTS](state, ingredients) {
      state.Ingredients = ingredients;
    },
    [CHANGE_DOUGH](state, newDough) {
      state.doughId = newDough.Id;
      state.doughPrice = newDough.price;
    },
    [CHANGE_SIZE](state, newSize) {
      state.sizeId = newSize.Id;
      state.sizePrice = newSize.price;
    },
    [CHANGE_SAUCE](state, newSauce) {
      state.sauceId = newSauce.Id;
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
      (state.doughId = 1),
        (state.doughPrice = 300),
        (state.sauceId = 1),
        (state.saucePrice = 50),
        (state.sizeId = 2),
        (state.sizePrice = 2),
        (state.Fillings = []),
        (state.pizzaIndex = -1),
        (state.pizzaName = "");
    },
    [SET_PIZZA](state, newPizza) {
      if (newPizza.pizza.pizzaDough === "light") {
        state.doughChecked = "small";
      } else state.doughChecked = "big";
      state.doughId = newPizza.pizza.doughId;
      state.sauceId = newPizza.pizza.sauceId;
      state.sizeId = newPizza.pizza.sizeId;
      state.pizzaName = newPizza.pizza.name;
      state.Fillings = newPizza.pizza.ingredients;
      state.pizzaIndex = newPizza.indx;
    },
  },
  actions: {
    async init({ dispatch }) {
      dispatch("getDoughs");
      dispatch("getSizes");
      dispatch("getSauces");
      dispatch("getIngredients");
    },

    async getDoughs({ commit }, config) {
      const doughsData = await this.$api.dough.query(config);
      const doughs = normalizePizza(doughsData, DoughTypes);
      commit("GET_DOUGH", doughs);
    },
    async getSizes({ commit }, config) {
      const sizesData = await this.$api.sizes.query(config);
      const sizes = normalizePizza(sizesData, PizzaSizes);
      commit("GET_SIZE", sizes);
    },

    async getSauces({ commit }, config) {
      const saucesData = await this.$api.sauces.query(config);
      const sauces = normalizePizza(saucesData, SauceTypes);
      commit("GET_SAUCE", sauces);
    },

    async getIngredients({ commit }, config) {
      const ingredientsData = await this.$api.ingredients.query(config);
      const ingredients = normalizePizza(ingredientsData, FillingTypes);
      commit("GET_INGREDIENTS", ingredients);
    },
  },
};
