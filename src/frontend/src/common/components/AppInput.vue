<template>
  <div class="text-field">
    <input
      ref="input"
      :value="value"
      :type="type"
      :name="name"
      class="text-field__input"
      :class="{ 'text-field__input--error': showError }"
      :placeholder="placeholder"
      :required="required"
      @input="$emit('input', $event.target.value)"
    />
    <span v-if="showError" class="text-field__text">
      {{ errorText }}
    </span>
  </div>
</template>

<script>
export default {
  name: "AppInput",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    errorText: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showError() {
      return !!this.errorText;
    },
  },
  mounted() {
    if (this.autofocus) this.$refs.input.focus();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/input.scss";
</style>
