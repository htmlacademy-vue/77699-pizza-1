<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <RadioButton
          v-for="(size, index) in Sizes"
          v-bind:key="size.value"
          v-bind:labelClass="'diameter__input diameter__input--' + size.value"
          v-bind:checked="index === 1"
          name="diameter"
          v-bind:value="size.value"
          inputClass="visually-hidden"
          v-bind:itemDesc="size.name"
          v-on:change="
            $emit('change-size', { name: size.value, price: size.multiplier })
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import pizza from "@/static/pizza.json";
import { PizzaSizes } from "@/common/constants";
import { normalizePizza } from "@/common/helpers";

export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  data() {
    return {
      pizza,
      PizzaSizes,
      checked: true,
    };
  },
  methods: {},
  computed: {
    Sizes() {
      return normalizePizza(pizza.sizes, PizzaSizes);
    },
  },
};
</script>

<style lang="scss" scoped></style>
