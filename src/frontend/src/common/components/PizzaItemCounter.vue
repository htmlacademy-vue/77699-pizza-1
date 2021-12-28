<template>
  <div class="car-list__price_block">
    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        data-test="button--minus"
        v-bind:disabled="counterValue === 1"
        v-on:click="changeCount(0)"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        v-bind:value="counterValue"
      />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        data-test="button--plus"
        v-on:click="changeCount(1)"
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
  data() {
    return {};
  },
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
  methods: {
    changeCount(event) {
      let count;
      if (event === 0) count = this.counterValue - 1;
      else if (event === 1) count = this.counterValue + 1;
      this.$emit("change-count", count);
    },
  },
  computed: {
    Price() {
      let price = 0;
      price = this.counterValue * this.pizzaPrice;
      return price;
    },
  },
};
</script>
