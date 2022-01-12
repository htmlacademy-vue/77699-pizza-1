<template>
  <label v-bind:class="labelClass">
    <input
      type="radio"
      v-bind:name="name"
      v-bind:value="value"
      v-bind:class="inputClass"
      v-bind:checked="checked"
      v-on:change="$emit('change', checked)"
    />
    <b v-if="itemName">{{ itemName }}</b>
    <span>{{ itemDesc }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
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
      required: false,
    },
    labelClass: {
      type: String,
      required: false,
    },
    itemName: {
      type: String,
      required: false,
    },
    itemDesc: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/radio.scss";
@import "~@/assets/scss/blocks/dough.scss";
@import "~@/assets/scss/blocks/diameter.scss";
@import "~@/assets/scss/blocks/ingridients.scss";
</style>
