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
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  computed: {
    ...mapState(["Auth"]),
    isAuthenticated() {
      return this.Auth.isAuthenticated;
    },
  },
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("Builder/getPizzaData");
    this.$store.dispatch("Cart/getItems");
    if (this.isAuthenticated) {
      this.$store.dispatch("Profile/getAddresses");
      this.$store.dispatch("Profile/getOrders");
    }
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
