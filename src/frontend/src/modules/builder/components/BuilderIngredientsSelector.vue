<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="sauce in Sauces"
            v-bind:key="sauce.value"
            labelClass="radio ingridients__input"
            v-bind:checked="sauceChecked == sauce.value"
            name="sauce"
            v-bind:value="sauce.value"
            v-bind:itemDesc="sauce.name"
            v-on:change="changeSauce(sauce)"
          />
        </div>

        <div class="ingridients__filling">
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <BuilderIngredientsItem
              v-for="(filling, index) in Ingredients"
              v-bind:key="index"
              v-bind:filling="filling"
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
import BuilderIngredientsItem from "@/modules/builder/components/BuilderIngredientsItem";
import { mapState } from "vuex";

export default {
  name: "BuilderIngredientsSelector",
  components: { RadioButton, BuilderIngredientsItem },
  data() {
    return {};
  },
  methods: {
    changeSauce(sauce) {
      this.$store.commit("Builder/CHANGE_SAUCE", {
        name: sauce.value,
        price: sauce.price,
      });
    },
  },
  computed: {
    Ingredients() {
      return this.$store.state.Builder.Ingredients;
    },
    Sauces() {
      return this.$store.state.Builder.Sauces;
    },
    ...mapState("Builder", ["sauceChecked"]),
  },
};
</script>

<style lang="scss" scoped></style>
