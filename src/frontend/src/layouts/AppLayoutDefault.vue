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
      <div class="header__user" v-if="isAuthenticated">
        <router-link :to="{ name: 'Profile' }">
          <picture>
            <img :src="user.avatar" :alt="user.name" width="32" height="32" />
          </picture>
          <span>{{ user.name }}</span>
        </router-link>
        <a href="#" @click.prevent="$logout" class="header__logout">
          <span>Выйти</span></a
        >
      </div>
      <div class="header__user" v-else>
        <router-link :to="{ name: 'Login' }" class="header__login"
          ><span>Войти</span></router-link
        >
      </div>
    </header>
    <slot />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { logout } from "@/common/mixins";

export default {
  name: "AppLayoutDefault",
  computed: {
    ...mapGetters("Cart", ["CartPrice"]),
    ...mapState("Auth", ["user"]),
    ...mapState(["Auth"]),
    isAuthenticated() {
      return this.Auth.isAuthenticated;
    },
  },
  mixins: [logout],
};
</script>

<style lang="scss" scoped></style>
