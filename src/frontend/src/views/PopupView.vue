<template>
  <div>
    <div class="popup">
      <a @click="closeModal" class="close">
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a @click="closeModal" class="button">Отлично, я жду!</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PopupView",
  methods: {
    closeModal() {
      this.$store.commit("Cart/RESET_CART", []);
      this.$store.commit("Builder/RESET_PIZZA", []);
      if (this.isAuthenticated) this.$router.push({ name: "OrdersView" });
      else this.$router.push("/");
    },
  },
  computed: {
    ...mapState(["Auth"]),
    isAuthenticated() {
      return this.Auth.isAuthenticated;
    },
  },
};
</script>

// Импортируем глобальные стили для приложения
<style lang="scss">
@import "~@/assets/scss/app";
</style>
