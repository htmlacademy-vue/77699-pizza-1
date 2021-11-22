<template>
  <component :is="layout">
    <slot />
  </component>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "AppLayout",
  computed: {
    ...mapState(["Auth"]),
    isAuthenticated() {
      return this.Auth.isAuthenticated;
    },
    layout() {
      const layout = this.isAuthenticated
        ? "AppLayoutLogin"
        : "AppLayoutDefault";
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
