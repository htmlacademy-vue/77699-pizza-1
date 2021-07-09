<template>
  <div id="app">
    <index />
  </div>
</template>
<script>
import index from "@/views/Index";

export default {
  name: "App",
  components: {
    index,
  },
};
</script>

// Импортируем глобальные стили для приложения
<style lang="scss">
@import "~@/assets/scss/app";
</style>
