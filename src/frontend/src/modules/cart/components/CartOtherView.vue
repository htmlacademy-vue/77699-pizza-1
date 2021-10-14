<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <CartOtherItem
        v-for="(item, index) in items"
        v-bind:key="index"
        v-bind:item="item"
      >
      </CartOtherItem>
    </ul>
  </div>
</template>

<script>
import CartOtherItem from "@/modules/cart/components/CartOtherItem";
import { mapState } from "vuex";

export default {
  name: "CartOtherView",
  components: { CartOtherItem },
  data() {
    return {};
  },
  computed: {
    ...mapState("Cart", ["items"]),
  },
};
</script>

<style lang="scss" scoped></style>
