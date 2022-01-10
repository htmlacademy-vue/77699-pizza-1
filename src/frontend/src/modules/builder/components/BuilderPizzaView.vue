<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы {{ pizzaName }}</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-bind:value="pizzaName"
        v-on:input="changePizzaName($event.target.value)"
      />
    </label>
    <PizzaFoundation />
    <BuilderPriceCounter />
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import PizzaFoundation from "@/common/components/PizzaFoundation";
import { mapState } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: { BuilderPriceCounter, PizzaFoundation },
  data() {
    return {};
  },
  methods: {
    changePizzaName(value) {
      this.$store.commit("Builder/CHANGE_PIZZA_NAME", value);
    },
  },
  computed: {
    ...mapState("Builder", ["pizzaName"]),
  },
};
</script>
