<template>
  <div class="counter counter--orange ingridients__counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      v-bind:disabled="counterValue === 0"
      v-on:click="clickMinus"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      v-bind:fillingName="fillingName"
      v-bind:value="counterValue"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      v-bind:disabled="counterValue === 3"
      v-on:click="clickPlus"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import EventBus from "@/eventBus";

export default {
  name: "ItemCounter",
  data() {
    return {
      counterValue: 0,
      emitData: null,
    };
  },
  props: {
    fillingName: {
      type: String,
      required: true,
    },
    fillingPrice: {
      type: Number,
      required: true,
    },
  },
  methods: {
    clickMinus() {
      this.counterValue = this.counterValue - 1;
    },
    clickPlus() {
      this.counterValue = this.counterValue + 1;
    },

    changeCounter(count) {
      const filling = this.fillingName;
      const fillingPrice = this.fillingPrice;
      this.$emit("change-counter", { filling, count, fillingPrice });
    },
  },
  watch: {
    counterValue(newValue) {
      this.changeCounter(newValue);
    },
  },
  mounted() {
    EventBus.$on("add-filling", (data) => {
      if (data.filling === this.fillingName)
        if (this.counterValue < 3) {
          this.counterValue = this.counterValue + data.count;
        }
    });
  },
};
</script>
