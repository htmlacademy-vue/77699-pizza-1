<template>
  <div class="content__constructor">
    <div
      v-bind:class="
        'pizza pizza--foundation--' + doughChecked + '-' + sauceChecked
      "
    >
      <AppDrop class="pizza__wrapper" v-on:drop="moveFilling">
        <div
          v-for="{ filling, number } in Fillings"
          v-bind:key="filling"
          class="pizza__filling"
          v-bind:class="[
            'pizza__filling--' + filling + ' pizza__filling--' + number,
          ]"
        ></div>
      </AppDrop>
    </div>
  </div>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import EventBus from "@/eventBus";

export default {
  name: "SelectorItem",
  components: { AppDrop },
  props: {
    doughChecked: {
      type: String,
      required: true,
    },
    sizeChecked: {
      type: String,
      required: true,
    },
    sauceChecked: {
      type: String,
      required: true,
    },
    Fillings: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    moveFilling(value) {
      EventBus.$emit("add-filling", {
        filling: value.value,
        count: 1,
        fillingPrice: value.price,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
