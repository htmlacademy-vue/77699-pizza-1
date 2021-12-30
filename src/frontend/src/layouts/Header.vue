<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <router-link :to="{ name: 'IndexHome' }" class="logo" data-test="index">
          <img
            src="~@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>
      </div>
      <div class="header__cart">
        <router-link :to="{ name: 'Cart' }" data-test="cartPrice"
          >{{ CartPrice }} ₽
        </router-link>
      </div>
      <div class="header__user" data-test="auth" v-if="isAuthenticated">
        <router-link :to="{ name: 'Profile' }" data-test="profile">
          <picture>
            <img
              :src="user.avatar"
              :alt="user.name"
              width="32"
              height="32"
              data-test="avatar"
            />
          </picture>
          <span data-test="userName">{{ user.name }}</span>
        </router-link>
        <a href="#" @click.prevent="$logout" class="header__logout">
          <span>Выйти</span></a
        >
      </div>
      <div class="header__user" data-test="withoutAuth" v-else>
        <router-link
          :to="{ name: 'Login' }"
          class="header__login"
          data-test="login"
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
  name: "Header",
  computed: {
    ...mapGetters("Cart", ["CartPrice"]),
    ...mapState("Auth", ["user", "isAuthenticated"]),
  },
  mixins: [logout],
};
</script>

<style lang="scss" scoped></style>
