<template>
  <div class="content__constructor">
    <div v-bind:class="pizzaContent">
      <AppDrop class="pizza__wrapper" v-on:drop="moveFilling">
        <div
          v-for="{ filling, number } in FillingsArr"
          v-bind:key="filling"
          class="pizza__filling"
          v-bind:class="[
            'pizza__filling--' + filling + ' pizza__filling--' + number,
          ]"
        ></div>
      </AppDrop>
    </div>
  </div>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import EventBus from "@/eventBus";
import { mapState, mapGetters } from "vuex";

export default {
  name: "PizzaFoundation",
  components: { AppDrop },
  data() {
    return {};
  },
  methods: {
    moveFilling(value) {
      EventBus.$emit("add-filling", {
        value: value.value,
        count: 1,
        price: value.price,
      });
    },
  },
  computed: {
    ...mapGetters("Builder", ["FillingsArr"]),
    ...mapGetters("Builder", [
      "getDoughById",
      "getSauceById",
      "getSizeById",
      "getIngredientById",
    ]),
    ...mapState("Builder", ["doughId", "sizeId", "sauceId", "Fillings"]),
    pizzaContent() {
      let doughChecked = "";
      let dough = this.getDoughById(this.doughId).value;
      if (dough == "light") doughChecked = "small";
      else doughChecked = "big";
      let sauceChecked = this.getSauceById(this.sauceId).value;
      let pizzaFoundation = "pizza pizza--foundation--";
      let pizzaContent = pizzaFoundation.concat(
        doughChecked,
        "-",
        sauceChecked
      );
      return pizzaContent;
    },
  },
};
</script>

<style lang="scss" scoped></style>
