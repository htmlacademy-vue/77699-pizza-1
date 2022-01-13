<template>
  <div>
    <div class="popup">
      <a
        class="close"
        @click="closeModal"
      >
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">
          Спасибо за заказ
        </h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a
          class="button"
          @click="closeModal"
        >Отлично, я жду!</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PopupView",
  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
  },

  methods: {
    closeModal() {
      this.$store.commit("Cart/RESET_CART", []);
      this.$store.commit("Builder/RESET_PIZZA", []);
      if (this.isAuthenticated) this.$router.push({ name: "OrdersView" });
      else this.$router.push("/");
    },
  },
};
</script>

// Импортируем глобальные стили для приложения
<style lang="scss">
@import "~@/assets/scss/blocks/close.scss";
@import "~@/assets/scss/blocks/title.scss";
@import "~@/assets/scss/blocks/button.scss";
</style>
