<template>
  <div class="car-list__price_block">
    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        data-test="button--minus"
        :disabled="counterValue === 1"
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

    <div class="cart-list__price">
      <b>{{ Price }} ₽</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "PizzaItemCounter",
  props: {
    counterValue: {
      type: Number,
      required: true,
    },

    pizzaPrice: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {};
  },

  computed: {
    Price() {
      let price = 0;
      price = this.counterValue * this.pizzaPrice;
      return price;
    },
  },

  methods: {
    changeCount(event) {
      let count;
      if (event === 0) count = this.counterValue - 1;
      else if (event === 1) count = this.counterValue + 1;
      this.$emit("change-count", count);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/counter.scss";
@import "~@/assets/scss/blocks/input.scss";
@import "~@/assets/scss/blocks/cart-list.scss";
</style>
