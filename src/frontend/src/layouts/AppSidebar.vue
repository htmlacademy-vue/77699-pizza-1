<template>
  <div class="layout__sidebar sidebar">
    <router-link
      :to="{ name: 'IndexHome' }"
      class="logo layout__logo"
      data-test="index"
    >
      <img
        src="~@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      >
    </router-link>
    <router-link
      :to="{ name: 'OrdersView' }"
      class="layout__link"
      data-test="orders"
    >
      История заказов
    </router-link>
    <router-link
      :to="{ name: 'ProfileView' }"
      class="layout__link"
      data-test="profile"
    >
      Мои данные
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AppSidebar",
};
</script>

<style lang="scss" scoped></style>
