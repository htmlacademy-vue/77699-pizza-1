<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <CartOtherItem
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
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

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/additional-list.scss";
</style>
