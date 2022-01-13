<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">
        Выберите тесто
      </h2>

      <div class="sheet__content dough">
        <RadioButton
          v-for="dough in Doughs"
          :key="dough.id"
          :label-class="'dough__input dough__input--' + dough.value"
          :checked="dough.id == doughId"
          name="dought"
          :value="dough.value"
          input-class="visually-hidden"
          :item-name="dough.name"
          :item-desc="dough.description"
          @change="changeDough(dough)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/AppRadioButton";
import { mapState } from "vuex";

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  data() {
    return {};
  },

  computed: {
    ...mapState("Builder", ["Doughs", "doughId"]),
  },

  methods: {
    changeDough(dough) {
      this.$store.commit("Builder/CHANGE_DOUGH", {
        name: this.getFoundation(dough.value),
        price: dough.price,
        Id: dough.id,
      });
    },

    getFoundation(value) {
      if (value === "light") {
        return "small";
      } else return "big";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/dough.scss";
@import "~@/assets/scss/blocks/title.scss";
</style>
