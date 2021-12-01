<template>
  <main class="layout">
    <Header />
    <Sidebar />
    <div class="layout__content">
      <slot />
    </div>
  </main>
</template>

<script>
import Header from "@/layouts/Header.vue";
import Sidebar from "@/layouts/Sidebar.vue";

export default {
  name: "AppLayoutProfile",
  components: { Header, Sidebar },
};
</script>

<style lang="scss" scoped>
.layout__content {
  overflow: hidden;
  padding-left: unset;
  margin-left: 200px;
}
</style>
