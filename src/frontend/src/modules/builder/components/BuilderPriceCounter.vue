<template>
  <div class="content__result">
    <p>Итого: {{ priceTotal }} ₽</p>
    <button
      type="button"
      class="button"
      v-bind:class="[disabled ? 'button--disabled' : '']"
      v-bind:disabled="getStatus()"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  data() {
    return {
      disabled: true,
    };
  },
  props: {
    priceTotal: {
      type: Number,
      required: true,
    },
    pizzaName: {
      type: String,
      required: true,
    },
  },
  methods: {
    getStatus() {
      if (this.priceTotal > 350 && this.pizzaName.length > 0) {
        this.disabled = false;
      }
      return this.disabled;
    },
  },
};
</script>

<style lang="scss" scoped></style>
