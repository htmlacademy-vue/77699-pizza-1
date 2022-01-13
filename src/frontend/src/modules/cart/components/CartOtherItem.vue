<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="item.image"
        width="39"
        height="60"
        :alt="item.name"
      >
      <span>{{ item.name }}</span>
    </p>
    <CartItemCounter
      :id="item.id"
      :counter-value="miscCount(item.id)"
      :item-price="item.price"
      @change-count="counterValue = $event"
    />
  </li>
</template>

<script>
import CartItemCounter from "@/common/components/CartItemCounter";
import { mapState } from "vuex";

export default {
  name: "CartOtherItem",
  components: { CartItemCounter },
  props: {
    item: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      counterValue: 0,
    };
  },

  computed: {
    ...mapState("Cart", ["misc"]),
  },

  methods: {
    miscCount(id) {
      if (this.misc.filter((item) => item.miscId == id).length > 0) {
        this.counterValue = this.misc.filter(
          (item) => item.miscId == id
        )[0].count;
      } else this.counterValue = 0;
      return this.counterValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/additional-list.scss";
</style>
