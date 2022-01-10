<template>
  <div>
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
        <span data-test="userName">{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span data-test="userPhone">{{ user.phone }}</span>
      </p>
    </div>
    <ProfileAddressView />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProfileAddressView from "@/modules/profile/components/ProfileAddressView";
import auth from "@/middlewares/auth";

export default {
  name: "ProfileView",
  middlewares: [auth],
  layout: "AppLayoutProfile",
  components: { ProfileAddressView },
  data: () => ({}),
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState(["Auth"]),
    isAuthenticated() {
      return this.Auth.isAuthenticated;
    },
  },
  created() {
    if (this.isAuthenticated) {
      this.$store.dispatch("Profile/getAddresses");
      this.$store.dispatch("Profile/getOrders");
    }
  },
};
</script>

// Импортируем глобальные стили для приложения
<style lang="scss">
@import "~@/assets/scss/app";
</style>
