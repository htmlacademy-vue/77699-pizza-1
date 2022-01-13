<template>
  <label :class="labelClass">
    <input
      type="radio"
      :name="name"
      :value="value"
      :class="inputClass"
      :checked="checked"
      @change="$emit('change', checked)"
    >
    <b v-if="itemName">{{ itemName }}</b>
    <span>{{ itemDesc }}</span>
  </label>
</template>

<script>
export default {
  name: "AppRadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    checked: {
      type: Boolean,
      required: true,
    },

    inputClass: {
      type: String,
      default: "",
    },

    labelClass: {
      type: String,
      default: "",
    },

    itemName: {
      type: String,
      default: "",
    },

    itemDesc: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/input.scss";
@import "~@/assets/scss/blocks/radio.scss";
@import "~@/assets/scss/blocks/dough.scss";
@import "~@/assets/scss/blocks/diameter.scss";
@import "~@/assets/scss/blocks/ingridients.scss";
</style>
