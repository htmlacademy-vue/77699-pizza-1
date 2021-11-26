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
      this.$store.commit("Cart/CHANGE_CART_PIZZA", {
        name: this.pizzaName,
        sizeId: this.sizeId,
        doughId: this.doughId,
        sauceId: this.sauceId,
        pizzaFillings: this.Fillings,
        price: this.Price,
        indx: this.pizzaIndex,
      });
      this.$router.push({ name: "Cart" });
    },
  },
  computed: {
    ...mapGetters("Builder", ["Price", "ButtonStatus"]),
    ...mapState("Builder", [
      "pizzaName",
      "sizeId",
      "doughId",
      "sauceId",
      "Fillings",
      "pizzaIndex",
    ]),
  },
};
</script>

<style lang="scss" scoped></style>
