<template>
  <body>
    <main class="layout">
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
        <a class="layout__link layout__link--active" href="#">Мои данные</a>
      </div>

      <div class="layout__content">
        <div class="layout__title">
          <h1 class="title title--big">Мои данные</h1>
        </div>

        <div class="user">
          <picture>
            <source
              type="image/webp"
              srcset="
                ~@/assets/img/users/user5@2x.webp 1x,
                img/users/user5@4x.webp           2x
              "
            />
            <img :src="user.avatar" :alt="user.name" width="72" height="72" />
          </picture>
          <div class="user__name">
            <span>{{ user.name }}</span>
          </div>
          <p class="user__phone">
            Контактный телефон: <span>{{ user.phone }}</span>
          </p>
        </div>
        <ProfileAddressView />
      </div>
    </main>
  </body>
</template>

<script>
import { mapState } from "vuex";
import ProfileAddressView from "@/modules/profile/components/ProfileAddressView";

export default {
  name: "Profile",
  components: { ProfileAddressView },
  data: () => ({}),
  computed: {
    ...mapState("Auth", ["user"]),
  },
  created() {
    this.$store.dispatch("Profile/getAddresses");
  },
};
</script>

// Импортируем глобальные стили для приложения
<style lang="scss">
@import "~@/assets/scss/app";
</style>
