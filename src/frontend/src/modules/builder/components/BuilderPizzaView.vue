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
      v-bind:Fillings="countFillings(Fillings)"
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
      fillingsCount: 0,
      //priceTotal: 0,
    };
  },
  methods: {
    countFillings(Fillings) {
      let arr = [];
      for (let value of Fillings) {
        //arr.push(this.fillArray(value.filling, value.count));
        arr.push({
          filling: value.filling,
          number: this.getNumber(value.count),
        });
      }
      this.fillingsCount = Fillings.length;
      return arr.flat();
    },

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
};
</script>

<style lang="scss" scoped></style>
