<template>
  <li class="ingridients__item">
    <AppDrag v-bind:transfer-data="filling" v-bind:isDraggable="isDraggable">
      <span v-bind:class="'filling filling--' + filling.value">{{
        filling.name
      }}</span>
    </AppDrag>
    <ItemCounter
      v-bind:counterValue="(counterValue = getFillingCount())"
      v-on:change-count="counterValue = $event"
    />
  </li>
</template>

<script>
import EventBus from "@/eventBus";
import AppDrag from "@/common/components/AppDrag";
import ItemCounter from "@/common/components/ItemCounter";
import { mapState } from "vuex";

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
      this.$store.commit("Builder/CHANGE_FILLINGS", {
        filling,
        count,
        fillingPrice,
      });
    },
    getFillingCount() {
      let res = this.Fillings.filter((x) => x.filling == this.filling.value);
      if (res.length > 0)
        return this.Fillings.filter((x) => x.filling == this.filling.value).map(
          (x) => x.count
        )[0];
      else return 0;
    },
  },
  computed: {
    isDraggable() {
      return this.counterValue < 3;
    },
    ...mapState("Builder", ["Fillings"]),
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
