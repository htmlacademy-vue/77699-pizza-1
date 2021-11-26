<template>
  <div>
    <component :is="layout">
      <slot />
    </component>
  </div>
</template>
<script>
import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";

export default {
  name: "AppLayout",
  components: { AppLayoutDefault },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || "AppLayoutDefault";
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
