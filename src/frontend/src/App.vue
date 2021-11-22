<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>
<script>
import AppLayout from "@/layouts/AppLayout";
import { setAuth } from "@/common/helpers";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("Builder/getDoughs");
    this.$store.dispatch("Builder/getSizes");
    this.$store.dispatch("Builder/getSauces");
    this.$store.dispatch("Builder/getIngredients");
    this.$store.dispatch("Cart/getItems");
    this.$store.dispatch("Profile/getAddresses");
    this.$store.dispatch("Profile/getOrders");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
