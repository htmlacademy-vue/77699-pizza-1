<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="~@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ pizza.size }}, на {{ doughName }} тесте</li>
          <li>Соус: {{ pizza.sauce }}</li>
          <li>Начинка: {{ pizza.fillings }}</li>
        </ul>
      </div>
    </div>

    <PizzaItemCounter
      v-bind:counterValue="pizza.count"
      v-bind:pizzaPrice="pizza.price"
      v-on:change-count="getCounterValue"
    />
    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" v-on:click="changePizza">
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { mapState } from "vuex";
import PizzaItemCounter from "@/common/components/PizzaItemCounter";

export default {
  name: "CartPizzaItem",
  components: { PizzaItemCounter },
  props: {
    pizza: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {};
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
  },
  computed: {
    ...mapState("Cart", ["pizzas"]),
    doughName() {
      let doughName;
      doughName = this.pizza.dough
        .toLowerCase()
        .substring(0, this.pizza.dough.length - 2);
      doughName += "ом";
      return doughName;
    },
  },
};
</script>

<style lang="scss" scoped></style>
