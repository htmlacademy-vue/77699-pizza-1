<template>
  <div>
    <div class="popup">
      <router-link :to="{ name: 'IndexHome' }">
        <a @click="closeModal" class="close">
          <span class="visually-hidden">Закрыть попап</span>
        </a>
      </router-link>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <router-link :to="{ name: 'IndexHome' }">
          <a @click="closeModal" class="button">Отлично, я жду!</a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popup",
  methods: {
    closeModal() {
      this.$store.commit("Cart/RESET_CART", []);
      this.$store.commit("Builder/RESET_PIZZA", []);
    },
  },
};
</script>

// Импортируем глобальные стили для приложения
<style lang="scss">
@import "~@/assets/scss/app";
</style>
