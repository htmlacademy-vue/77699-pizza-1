<template>
  <main class="layout">
    <Header />
    <Sidebar />
    <slot />
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

<style lang="scss" scoped></style>
