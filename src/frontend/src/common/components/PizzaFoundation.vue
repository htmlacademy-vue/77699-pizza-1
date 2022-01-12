<template>
  <div class="content__constructor">
    <div data-test="pizzaContent" v-bind:class="pizzaContent">
      <AppDrop class="pizza__wrapper" v-on:drop="moveFilling">
        <transition-group name="fillings">
          <div
            v-for="filling in FillingsArr"
            v-bind:key="FillingsArr.indexOf(filling)"
            data-test="pizzaFilling"
            class="pizza__filling"
            v-bind:class="[
              'pizza__filling--' +
                filling.filling +
                ' pizza__filling--' +
                filling.number,
            ]"
          ></div>
        </transition-group>
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
    ...mapGetters("Builder", ["getDoughById", "getSauceById", "FillingsArr"]),
    ...mapState("Builder", ["doughId", "sauceId"]),
    pizzaContent() {
      let doughChecked = "";
      let dough = this.getDoughById(this.doughId)?.value;
      if (dough == "light") doughChecked = "small";
      else doughChecked = "big";
      let sauceChecked = this.getSauceById(this.sauceId)?.value;
      let pizzaFoundation = "pizza pizza--foundation--";
      let pizzaContent = pizzaFoundation.concat(
        doughChecked,
        "-",
        sauceChecked
      );
      return pizzaContent;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/pizza.scss";

.fillings-enter-active,
.fillings-leave-active {
  transition: all 0.3s ease;
}

.fillings-enter,
.fillings-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
