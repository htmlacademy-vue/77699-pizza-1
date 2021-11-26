<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <RadioButton
          v-for="dough in Doughs"
          v-bind:key="dough.id"
          v-bind:labelClass="'dough__input dough__input--' + dough.value"
          v-bind:checked="dough.id == doughId"
          name="dought"
          v-bind:value="dough.value"
          inputClass="visually-hidden"
          v-bind:itemName="dough.name"
          v-bind:itemDesc="dough.description"
          v-on:change="changeDough(dough)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import { mapState } from "vuex";

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  data() {
    return {};
  },
  methods: {
    changeDough(dough) {
      this.$store.commit("Builder/CHANGE_DOUGH", {
        name: this.getFoundation(dough.value),
        price: dough.price,
        Id: dough.id,
      });
    },
    getFoundation(value) {
      if (value === "light") {
        return "small";
      } else return "big";
    },
  },
  computed: {
    ...mapState("Builder", ["Doughs", "doughId"]),
  },
};
</script>

<style lang="scss" scoped></style>
