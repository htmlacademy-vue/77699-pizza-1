<template>
  <div>
    <AppLayoutDefault />
    <slot />
  </div>
</template>
<script>
import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";

export default {
  name: "AppLayout",
  components: { AppLayoutDefault },
};
</script>

<style lang="scss" scoped></style>
