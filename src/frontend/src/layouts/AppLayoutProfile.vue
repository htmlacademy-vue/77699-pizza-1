<template>
  <main class="layout">
    <AppHeader />
    <AppSidebar />
    <div class="layout__content">
      <slot />
    </div>
  </main>
</template>

<script>
import AppHeader from "@/layouts/AppHeader.vue";
import AppSidebar from "@/layouts/AppSidebar.vue";

export default {
  name: "AppLayoutProfile",
  components: { AppHeader, AppSidebar },
};
</script>

<style lang="scss" scoped>
.layout__content {
  overflow: hidden;
  padding-left: unset;
  margin-left: 200px;
}
</style>
