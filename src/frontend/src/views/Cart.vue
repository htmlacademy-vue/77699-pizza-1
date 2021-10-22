<template>
  <body>
    <form method="post" class="layout-form" @submit.prevent="showModal = true">
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>
          <CartPizzaView />
          <CartOtherView />

          <div class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select name="test" class="select" v-model="selected">
                  <option
                    v-for="item in deliveryItems"
                    v-bind:value="item.value"
                    v-bind:key="item.value"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </label>

              <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input type="text" name="tel" placeholder="+7 999-999-99-99" />
              </label>

              <div class="cart-form__address" v-if="selected !== 1">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <label class="input">
                    <span>Улица*</span>
                    <input type="text" name="street" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <input type="text" name="house" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <input type="text" name="apartment" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <section class="footer">
        <div class="footer__more">
          <router-link :to="{ name: 'IndexHome' }">
            <a @click="resetPizza" class="button button--border button--arrow">
              Хочу еще одну
            </a>
          </router-link>
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: {{ CartPrice }} ₽</b>
        </div>

        <div class="footer__submit">
          <button type="submit" class="button" v-on:click="showModal = true">
            Оформить заказ
          </button>
        </div>
      </section>
    </form>
    <Popup v-if="showModal" v-on:close="showModal = false" />
  </body>
</template>

<script>
import Popup from "@/views/Popup";
import CartPizzaView from "@/modules/cart/components/CartPizzaView";
import CartOtherView from "@/modules/cart/components/CartOtherView";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Cart",
  components: { Popup, CartPizzaView, CartOtherView },
  data() {
    return {
      selected: 1,
      isShow: false,
      showModal: false,
    };
  },
  methods: {
    showModals() {
      this.isShow = true;
    },
    closeModals() {
      this.isShow = false;
    },
    resetPizza() {
      this.$store.commit("Builder/RESET_PIZZA", []);
    },
  },
  computed: {
    ...mapState("Cart", ["deliveryItems"]),
    ...mapGetters("Cart", ["CartPrice"]),
  },
};
</script>

<style scoped lang="scss"></style>
