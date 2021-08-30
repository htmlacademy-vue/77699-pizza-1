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
            <li
              v-for="(filling, index) in Fillings"
              v-bind:key="index"
              class="ingridients__item"
            >
              <AppDrop v-on:drop="$emit('drop', $event)">
                <AppDrag v-bind:transfer-data="filling">
                  <span v-bind:class="'filling filling--' + filling.value">{{
                    filling.name
                  }}</span>
                </AppDrag>
              </AppDrop>
              <ItemCounter
                v-bind:fillingName="filling.value"
                v-bind:fillingPrice="filling.price"
                v-on:change-counter="changeCounter"
              />
            </li>
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
import ItemCounter from "@/common/components/ItemCounter";

import AppDrag from "@/common/components/AppDrag";
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderIngredientsSelector",
  components: { RadioButton, ItemCounter, AppDrag, AppDrop },
  data() {
    return {
      pizza,
      FillingTypes,
      SauceTypes,
      counter: 0,
      ingridient: "ananas",
      ingridientPrice: 0,
    };
  },
  methods: {
    changeCounter(value) {
      this.counter = value.count;
      this.ingridient = value.filling;
      this.ingridientPrice = value.price;
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
