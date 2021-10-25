<template>
  <div class="content__constructor">
    <div
      v-bind:class="
        'pizza pizza--foundation--' + doughChecked + '-' + sauceChecked
      "
    >
      <AppDrop class="pizza__wrapper" v-on:drop="moveFilling">
        <div
          v-for="{ filling, number } in FillingsArr"
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
import { mapState, mapGetters } from "vuex";

export default {
  name: "PizzaFoundation",
  components: { AppDrop },
  data() {
    return {};
  },
  methods: {
    moveFilling(value) {
      EventBus.$emit("add-filling", {
        value: value.value,
        count: 1,
        price: value.price,
      });
    },
  },
  computed: {
    ...mapGetters("Builder", ["FillingsArr"]),
    ...mapState("Builder", [
      "doughChecked",
      "sizeChecked",
      "sauceChecked",
      "Fillings",
    ]),
  },
};
</script>

<style lang="scss" scoped></style>
