<template>
  <component :is="layout">
    <slot />
  </component>
</template>
<script>
export default {
  name: "AppLayout",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || "AppLayoutDefault";
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
