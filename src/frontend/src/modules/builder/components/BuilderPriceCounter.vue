<template>
  <div class="content__result">
    <p>Итого: {{ Price }} ₽</p>
    <button
      type="button"
      class="button"
      :class="[ButtonStatus ? 'button--disabled' : '']"
      :disabled="ButtonStatus"
      @click="addPizzaToCart"
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
      this.$router.push({ name: "CartView" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/button.scss";
</style>
