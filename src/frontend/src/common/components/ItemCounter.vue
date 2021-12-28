<template>
  <div class="counter counter--orange ingridients__counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      data-test="button--minus"
      v-bind:disabled="counterValue === 0"
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
      class="counter__button counter__button--plus"
      data-test="button--plus"
      v-bind:disabled="counterValue === 3"
      v-on:click="changeCount(1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  data() {
    return {};
  },
  props: {
    counterValue: {
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
};
</script>
