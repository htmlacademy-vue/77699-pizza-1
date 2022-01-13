<template>
  <li class="ingridients__item">
    <AppDrag
      :transfer-data="filling"
      :is-draggable="isDraggable"
    >
      <span :class="'filling filling--' + filling.value">{{
        filling.name
      }}</span>
    </AppDrag>
    <ItemCounter
      :counter-value="getFillingCount()"
      @change-count="counterValue = $event"
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
  props: {
    filling: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      counterValue: 0,
      emitData: null,
    };
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

  methods: {
    changeCounter(count, value) {
      const filling = value.value;
      const fillingPrice = value.price;
      const id = value.id;
      this.$store.commit("Builder/CHANGE_FILLINGS", {
        filling,
        count,
        id,
        fillingPrice,
      });
    },

    getFillingCount() {
      let res = this.Fillings.filter((x) => x.filling == this.filling.value);
      if (res.length > 0)
        this.counterValue = this.Fillings.filter((x) => x.filling == this.filling.value).map(
          (x) => x.count
        )[0];
      else this.counterValue = 0;
      return this.counterValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/filling.scss";
@import "~@/assets/scss/blocks/ingridients.scss";
</style>
