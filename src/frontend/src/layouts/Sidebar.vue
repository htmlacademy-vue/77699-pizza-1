<template>
  <div class="layout__sidebar sidebar">
    <router-link :to="{ name: 'IndexHome' }" class="logo layout__logo">
      <img
        src="~@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>
    <router-link :to="{ name: 'Orders' }" class="layout__link"
      >История заказов</router-link
    >
    <router-link :to="{ name: 'Profile' }" class="layout__link"
      >Мои данные</router-link
    >
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style lang="scss" scoped></style>
