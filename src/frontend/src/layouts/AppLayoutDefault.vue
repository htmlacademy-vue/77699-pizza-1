<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <router-link :to="{ name: 'IndexHome' }" class="logo">
          <img
            src="~@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>
      </div>
      <div class="header__cart">
        <router-link :to="{ name: 'Cart' }">{{ CartPrice }} ₽</router-link>
      </div>
      <div class="header__user">
        <router-link :to="{ name: 'Login' }" class="header__login"
          ><span>Войти</span></router-link
        >
      </div>
    </header>
    <slot />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppLayoutDefault",
  computed: {
    ...mapGetters("Cart", ["CartPrice"]),
  },
};
</script>

<style lang="scss" scoped></style>
