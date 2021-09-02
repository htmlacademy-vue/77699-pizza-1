<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы {{ pizzaName }}</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="pizzaName"
      />
    </label>

    <PizzaFoundation
      v-bind:doughChecked="doughChecked"
      v-bind:sizeChecked="sizeChecked"
      v-bind:sauceChecked="sauceChecked"
      v-bind:Fillings="fillingsArr"
      v-on:add-filling="addFilling"
    />

    <BuilderPriceCounter
      v-bind:priceTotal="priceTotal"
      v-bind:pizzaName="pizzaName"
      v-bind:fillingsCount="fillingsCount"
    />
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import PizzaFoundation from "@/common/components/PizzaFoundation";

export default {
  name: "BuilderPizzaView",
  components: { BuilderPriceCounter, PizzaFoundation },
  props: {
    doughChecked: {
      type: String,
      required: true,
    },
    sizeChecked: {
      type: String,
      required: true,
    },
    sauceChecked: {
      type: String,
      required: true,
    },
    Fillings: {
      type: Array,
      default: () => [],
    },
    priceTotal: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      pizzaName: "",
    };
  },
  methods: {
    fillArray: function (ingidient, count) {
      let a = [];
      for (var i = 1; i <= count; i++) {
        a.push({ filling: ingidient, number: this.getNumber(i) });
      }
      return a;
    },

    getNumber: function (count) {
      let number = "first";
      switch (count) {
        case 1:
          number = "first";
          break;
        case 2:
          number = "second";
          break;
        case 3:
          number = "third";
          break;
        default:
          number = "first";
      }
      return number;
    },

    addFilling(value) {
      this.$emit("add-fillings", value);
    },
  },
  computed: {
    fillingsArr() {
      let arr = [];
      for (let value of this.Fillings) {
        arr.push({
          filling: value.filling,
          number: this.getNumber(value.count),
        });
      }
      return arr.flat();
    },
    fillingsCount() {
      return this.Fillings.length;
    },
  },
};
</script>

<style lang="scss" scoped></style>
