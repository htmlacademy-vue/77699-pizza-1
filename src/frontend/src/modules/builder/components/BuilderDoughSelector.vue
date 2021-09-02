<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <RadioButton
          v-for="(dough, index) in Doughs"
          v-bind:key="dough.value"
          v-bind:labelClass="'dough__input dough__input--' + dough.value"
          v-bind:checked="index === 0"
          name="dought"
          v-bind:value="dough.value"
          inputClass="visually-hidden"
          v-bind:itemName="dough.name"
          v-bind:itemDesc="dough.description"
          v-on:change="
            $emit('change-dough', {
              name: getFoundation(dough.value),
              price: dough.price,
            })
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import pizza from "@/static/pizza.json";
import { DoughTypes } from "@/common/constants";
import { normalizePizza } from "@/common/helpers";

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  data() {
    return {
      pizza,
      DoughTypes,
      doughChecked: "small",
    };
  },
  methods: {
    getFoundation(value) {
      if (value === "light") {
        this.doughChecked = "small";
      } else this.doughChecked = "big";
      return this.doughChecked;
    },
  },
  computed: {
    Doughs() {
      return normalizePizza(pizza.dough, DoughTypes);
    },
  },
};
</script>

<style lang="scss" scoped></style>
