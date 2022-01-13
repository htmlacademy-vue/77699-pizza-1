<template>
  <div>
    <div
      v-if="!pizzas.length"
      class="sheet cart__empty"
    >
      <p>В корзине нет ни одного товара</p>
    </div>

    <ul
      v-else
      class="cart-list sheet"
    >
      <CartPizzaItem
        v-for="pizza in pizzas"
        :key="pizza.id"
        :pizza="pizza"
      />
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CartPizzaItem from "@/modules/cart/components/CartPizzaItem";

export default {
  name: "CartPizzaView",
  components: { CartPizzaItem },
  data() {
    return {};
  },

  computed: {
    ...mapState("Cart", ["pizzas"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/cart-list.scss";
@import "~@/assets/scss/blocks/cart.scss";
</style>
