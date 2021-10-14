<template>
  <div class="content__result">
    <p>Итого: {{ Price }} ₽</p>
    <button
      type="button"
      class="button"
      v-bind:class="[ButtonStatus ? 'button--disabled' : '']"
      v-bind:disabled="ButtonStatus"
      v-on:click="addPizzaToCart"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",
  data() {
    return {};
  },
  methods: {
    addPizzaToCart() {
      let dough = "light";
      if (this.doughChecked == "big") dough = "large";
      this.$store.commit("Cart/CHANGE_CART_PIZZA", {
        name: this.pizzaName,
        size: this.sizeChecked,
        dough: dough,
        sauce: this.sauceChecked,
        price: this.Price,
      });
    },
  },
  computed: {
    ...mapGetters("Builder", ["Price", "ButtonStatus"]),
    ...mapState("Builder", [
      "pizzaName",
      "sizeChecked",
      "doughChecked",
      "sauceChecked",
      "Fillings",
    ]),
  },
};
</script>

<style lang="scss" scoped></style>
