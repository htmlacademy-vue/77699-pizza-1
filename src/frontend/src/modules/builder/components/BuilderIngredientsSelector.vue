<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="(sauce, index) in Sauces"
            v-bind:key="sauce.value"
            labelClass="radio ingridients__input"
            v-bind:checked="index === 0"
            name="sauce"
            v-bind:value="sauce.value"
            v-bind:itemDesc="sauce.name"
            v-on:change="$emit('change-sauce', sauce.value)"
          />
        </div>

        <div class="ingridients__filling">
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <BuilderIngredientsItem
              v-for="(filling, index) in Fillings"
              v-bind:key="index"
              v-bind:filling="filling"
              v-on:change-fillings="changeFillings"
            >
            </BuilderIngredientsItem>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import pizza from "@/static/pizza.json";
import { FillingTypes } from "@/common/constants";
import { SauceTypes } from "@/common/constants";
import { normalizePizza } from "@/common/helpers";
import BuilderIngredientsItem from "@/modules/builder/components/BuilderIngredientsItem";

export default {
  name: "BuilderIngredientsSelector",
  components: { RadioButton, BuilderIngredientsItem },
  data() {
    return {
      pizza,
      FillingTypes,
      SauceTypes,
    };
  },
  methods: {
    changeFillings(value) {
      this.$emit("change-fillings", value);
    },
  },
  computed: {
    Fillings() {
      return normalizePizza(pizza.ingredients, FillingTypes);
    },
    Sauces() {
      return normalizePizza(pizza.sauces, SauceTypes);
    },
  },
};
</script>

<style lang="scss" scoped></style>
