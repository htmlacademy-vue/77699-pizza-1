<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="item.image" width="39" height="60" :alt="item.name" />
      <span>{{ item.name }}</span>
    </p>
    <CartItemCounter
      v-bind:counterValue="counterValue"
      v-bind:itemPrice="item.price"
      v-bind:itemType="itemType"
      v-on:change-count="counterValue = $event"
    />
  </li>
</template>

<script>
import CartItemCounter from "@/common/components/CartItemCounter";

export default {
  name: "CartOtherItem",
  components: { CartItemCounter },
  props: {
    item: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      counterValue: 0,
    };
  },
  computed: {
    itemType() {
      let type = 0;
      if (this.item.image.includes("cola")) type = 1;
      else if (this.item.image.includes("sauce")) type = 2;
      else if (this.item.image.includes("potato")) type = 3;
      return type;
    },
  },
};
</script>

<style lang="scss" scoped></style>
