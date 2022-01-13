<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="~@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        alt="pizza.name"
      >
      <div class="product__text">
        <h2 data-test="pizzaName">
          {{ pizza.name }}
        </h2>
        <ul>
          <li data-test="dough">
            {{ getSizeById(pizza.sizeId).name }}, на
            {{ doughName(getDoughById(pizza.doughId)) }} тесте
          </li>
          <li data-test="sauce">
            Соус: {{ getSauceById(pizza.sauceId).name.toLowerCase() }}
          </li>
          <li data-test="fillings">
            Начинка: {{ getFillings(pizza) }}
          </li>
        </ul>
      </div>
    </div>

    <PizzaItemCounter
      :counter-value="pizza.count"
      :pizza-price="pizza.price"
      @change-count="getCounterValue"
    />
    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click="changePizza"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PizzaItemCounter from "@/common/components/PizzaItemCounter";

export default {
  name: "CartPizzaItem",
  components: { PizzaItemCounter },
  props: {
    pizza: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {};
  },

  computed: {
    ...mapState("Cart", ["pizzas"]),
    ...mapGetters("Builder", [
      "getDoughById",
      "getSauceById",
      "getSizeById",
      "getIngredientById",
    ]),
  },

  methods: {
    getCounterValue(count) {
      let indx = this.pizzas.indexOf(this.pizza);
      this.$store.commit("Cart/CHANGE_PIZZA_COUNT", {
        indx: indx,
        count: count,
      });
    },

    changePizza() {
      this.$router.push({ name: "IndexHome" });
      this.$store.commit("Builder/SET_PIZZA", {
        pizza: this.pizza,
        indx: this.pizzas.indexOf(this.pizza),
      });
    },

    doughName(dough) {
      if (dough != null) {
        let doughName;
        doughName = dough.name
          .toLowerCase()
          .substring(0, dough.name.length - 2);
        doughName += "ом";
        return doughName;
      }
    },

    getFillings(pizza) {
      let fillings = [];
      for (let value of pizza.ingredients) {
        fillings.push(this.getIngredientById(value.id).name.toLowerCase());
      }
      return fillings.toString();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/cart-list.scss";
@import "~@/assets/scss/blocks/product.scss";
</style>
