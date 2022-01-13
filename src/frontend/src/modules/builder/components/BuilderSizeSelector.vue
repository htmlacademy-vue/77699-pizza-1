<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">
        Выберите размер
      </h2>

      <div class="sheet__content diameter">
        <RadioButton
          v-for="size in Sizes"
          :key="size.id"
          :label-class="'diameter__input diameter__input--' + size.value"
          :checked="size.id == sizeId"
          name="diameter"
          :value="size.value"
          input-class="visually-hidden"
          :item-desc="size.name"
          @change="changeSize(size)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/AppRadioButton";
import { mapState } from "vuex";

export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  data() {
    return {
      checked: true,
    };
  },

  computed: {
    Sizes() {
      return this.$store.state.Builder.Sizes;
    },

    ...mapState("Builder", ["sizeId"]),
  },

  methods: {
    changeSize(size) {
      this.$store.commit("Builder/CHANGE_SIZE", {
        name: size.value,
        price: size.multiplier,
        Id: size.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/diameter.scss";
@import "~@/assets/scss/blocks/title.scss";
</style>
