<template>
  <li class="ingridients__item">
    <AppDrag v-bind:transfer-data="filling" v-bind:isDraggable="isDraggable">
      <span v-bind:class="'filling filling--' + filling.value">{{
        filling.name
      }}</span>
    </AppDrag>
    <ItemCounter
      v-bind:counterValue="counterValue"
      v-on:change-count="counterValue = $event"
    />
  </li>
</template>

<script>
import EventBus from "@/eventBus";
import AppDrag from "@/common/components/AppDrag";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "BuilderIngridientsItem",
  components: { AppDrag, ItemCounter },
  data() {
    return {
      counterValue: 0,
      emitData: null,
    };
  },
  props: {
    filling: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeCounter(count, value) {
      const filling = value.value;
      const fillingPrice = value.price;
      this.$emit("change-fillings", { filling, count, fillingPrice });
    },
  },
  computed: {
    isDraggable() {
      return this.counterValue < 3;
    },
  },
  watch: {
    counterValue(newValue) {
      this.changeCounter(newValue, this.filling);
    },
  },
  mounted() {
    EventBus.$on("add-filling", (data) => {
      if (data.value === this.filling.value)
        if (this.counterValue + data.count <= 3) {
          this.counterValue = this.counterValue + data.count;
        }
    });
  },
};
</script>
