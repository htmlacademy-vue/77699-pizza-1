<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <RadioButton
          v-for="size in Sizes"
          v-bind:key="size.value"
          v-bind:labelClass="'diameter__input diameter__input--' + size.value"
          v-bind:checked="sizeChecked == size.value"
          name="diameter"
          v-bind:value="size.value"
          inputClass="visually-hidden"
          v-bind:itemDesc="size.name"
          v-on:change="changeSize(size)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import { mapState } from "vuex";

export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  data() {
    return {
      checked: true,
    };
  },
  methods: {
    changeSize(size) {
      this.$store.commit("Builder/CHANGE_SIZE", {
        name: size.value,
        price: size.multiplier,
      });
    },
  },
  computed: {
    Sizes() {
      return this.$store.state.Builder.Sizes;
    },
    ...mapState("Builder", ["sizeChecked"]),
  },
};
</script>

<style lang="scss" scoped></style>
