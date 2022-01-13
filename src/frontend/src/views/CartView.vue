<template>
  <body>
    <form
      method="post"
      class="layout-form"
      @submit.prevent="showModal = true"
    >
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">
              Корзина
            </h1>
          </div>
          <CartPizzaView />
          <CartOtherView />

          <div class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select
                  v-model="selected"
                  name="test"
                  class="select"
                  @change="onChange($event)"
                >
                  <option value="-1">Заберу сам</option>
                  <option value="0">Новый адрес</option>
                  <option
                    v-for="address in Addresses"
                    :key="address.id"
                    :value="address.id"
                  >
                    Адрес: {{ address.name }}
                  </option>
                </select>
              </label>

              <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input
                  type="text"
                  name="tel"
                  placeholder="+7 999-999-99-99"
                >
              </label>

              <div
                v-if="selected >= 0"
                class="cart-form__address"
              >
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <label class="input">
                    <span>Улица*</span>
                    <AppInput
                      ref="street"
                      v-model="street"
                      data-test="street"
                      type="text"
                      name="street"
                      class="input"
                      required="required"
                    />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <AppInput
                      ref="building"
                      v-model="building"
                      data-test="building"
                      type="text"
                      name="house"
                      class="input"
                      required="required"
                    />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <AppInput
                      ref="flat"
                      v-model="flat"
                      data-test="flat"
                      type="text"
                      name="apartment"
                      class="input"
                    />
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
            <a
              data-test="reset"
              class="button button--border button--arrow"
              @click="resetPizza"
            >
              Хочу еще одну
            </a>
          </router-link>
        </div>
        <p class="footer__text">
          Перейти к конструктору<br>чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b data-test="price">Итого: {{ CartPrice }} ₽</b>
        </div>

        <div class="footer__submit">
          <button
            type="submit"
            class="button"
            data-test="addOrder"
            :disabled="pizzas.length == 0 && misc.length == 0"
            :class="[
              pizzas.length == 0 && misc.length == 0 ? 'button--disabled' : '',
            ]"
            @click="addOrder"
          >
            Оформить заказ
          </button>
        </div>
      </section>
    </form>
    <transition
      name="fade"
      mode="out-in"
    >
      <PopupView
        v-if="showModal"
        @close="showModal = false"
      />
    </transition>
  </body>
</template>

<script>
import PopupView from "@/views/PopupView";
import CartPizzaView from "@/modules/cart/components/CartPizzaView";
import CartOtherView from "@/modules/cart/components/CartOtherView";
import { mapGetters, mapState, mapActions } from "vuex";
import AppInput from "@/common/components/AppInput";

export default {
  name: "CartView",
  components: { PopupView, CartPizzaView, CartOtherView, AppInput },
  layout: "AppHeader",
  data() {
    return {
      isShow: false,
      showModal: false,
      btnOrderDisabled: true,
      selected: -1,
      flat: "",
      street: "",
      building: "",
    };
  },

  computed: {
    ...mapState("Profile", ["Addresses"]),
    ...mapGetters("Cart", ["CartPrice"]),
    ...mapState("Cart", ["pizzas", "misc", "addressId"]),
    ...mapState(["Auth"]),
    ...mapState("Auth", ["user", "isAuthenticated"]),
  },

  created() {
    this.$store.dispatch("Cart/getItems");

    if (this.isAuthenticated) {
      this.$store.dispatch("Profile/getAddresses");
    }

    this.selected = this.addressId;

    if (this.selected > 0) {
      let addr = this.Addresses.find((item) => item.id == this.selected);
      this.flat = addr.flat;
      this.street = addr.street;
      this.building = addr.building;
    } else if (this.selected == 0) {
      this.flat = "";
      this.street = "";
      this.building = "";
    }
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

    onChange(event) {
      this.selected = event.target.value;
      if (event.target.value > 0) {
        let addr = this.Addresses.find((item) => item.id == event.target.value);
        this.flat = addr.flat;
        this.street = addr.street;
        this.building = addr.building;
      } else if (event.target.value == 0) {
        this.flat = "";
        this.street = "";
        this.building = "";
      }
    },

    ...mapActions("Profile", ["postOrder"]),

    async addOrder() {
      const userId = this.isAuthenticated ? this.user.id : null;
      let pizzaObj = [];
      this.pizzas.forEach(function (pizza) {
        pizzaObj.push({
          name: pizza.name,
          sauceId: pizza.sauceId,
          doughId: pizza.doughId,
          sizeId: pizza.sizeId,
          quantity: pizza.count,
          ingredients: pizza.ingredients.map((filling) => ({
            ingredientId: filling.id,
            quantity: filling.count,
          })),
        });
      });

      let miscObj = [];
      this.misc.forEach(function (item) {
        miscObj.push({
          miscId: item.miscId,
          quantity: item.count,
        });
      });
      let address = null;
      if (this.selected > 0) {
        const objIndex = this.Addresses.findIndex((e) => e.id == this.selected);
        address = {
          name: this.Addresses[objIndex].name,
          street: this.Addresses[objIndex].street,
          building: this.Addresses[objIndex].building,
          flat: this.Addresses[objIndex].flat,
          comment: this.Addresses[objIndex].comment,
          id: this.Addresses[objIndex].id,
        };
      } else if (this.selected == 0) {
        address = {
          name: this.name,
          street: this.street,
          building: this.building,
          flat: this.flat,
          comment: this.comment,
        };
      }
      await this.postOrder({
        userId: userId,
        pizzas: pizzaObj,
        misc: miscObj,
        address: address,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/input.scss";
@import "~@/assets/scss/blocks/select.scss";
@import "~@/assets/scss/blocks/cart-form.scss";
@import "~@/assets/scss/blocks/cart.scss";
@import "~@/assets/scss/blocks/footer.scss";
@import "~@/assets/scss/blocks/button.scss";
@import "~@/assets/scss/blocks/title.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
