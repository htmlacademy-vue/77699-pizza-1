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
          <li>{{ pizza.size }}, на тонком тесте</li>
          <li>Соус: {{ pizza.sauce }}</li>
          <li>
            Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блю чиз
          </li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button type="button" class="counter__button counter__button--minus">
        <span class="visually-hidden">Меньше</span>
      </button>
      <input type="text" name="counter" class="counter__input" value="1" />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ pizza.price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit">Изменить</button>
    </div>
  </li>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CartPizzaItem",
  components: {},
  props: {
    pizza: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState("Cart", ["pizzas"]),
  },
};
</script>

<style lang="scss" scoped></style>
