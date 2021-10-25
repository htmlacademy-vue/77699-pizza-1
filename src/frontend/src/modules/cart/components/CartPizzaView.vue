<template>
  <div>
    <div class="sheet cart__empty" v-if="!pizzas.length">
      <p>В корзине нет ни одного товара</p>
    </div>

    <ul class="cart-list sheet" v-else>
      <CartPizzaItem
        v-for="(pizza, index) in pizzas"
        v-bind:key="index"
        v-bind:pizza="pizza"
      >
      </CartPizzaItem>
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
  methods: {},
  computed: {
    ...mapState("Cart", ["pizzas"]),
  },
};
</script>

<style lang="scss" scoped></style>
