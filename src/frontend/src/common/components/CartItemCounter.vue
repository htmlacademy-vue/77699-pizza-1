<template>
  <div class="additional-list__wrapper">
    <div class="counter additional-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        data-test="button--minus"
        :disabled="counterValue === 0"
        @click="changeCount(0)"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="counterValue"
      >
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        data-test="button--plus"
        @click="changeCount(1)"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="additional-list__price">
      <b data-test="price">{{ Price }} ₽</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItemCounter",
  props: {
    counterValue: {
      type: Number,
      required: true,
    },

    itemPrice: {
      type: Number,
      required: true,
    },

    id: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {};
  },

  computed: {
    Price() {
      let price = 0;
      price = this.counterValue * this.itemPrice;
      return price;
    },
  },

  methods: {
    changeCount(event) {
      let count;
      if (event === 0) count = this.counterValue - 1;
      else if (event === 1) count = this.counterValue + 1;
      this.$emit("change-count", count);
      this.$store.commit("Cart/CHANGE_CART_ITEM", {
        id: this.id,
        price: this.itemPrice,
        count: count,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/counter.scss";
@import "~@/assets/scss/blocks/input.scss";
@import "~@/assets/scss/blocks/additional-list.scss";
</style>
