<template>
  <div id="app">
    <AppLayout>
      <transition
        name="view"
        appear
        enter-active-class="animate__animated animate__slideInLeft"
      >
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>
<script>
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "App",
  components: {
    AppLayout,
  },

  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
