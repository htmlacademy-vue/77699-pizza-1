<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">
        История заказов
      </h1>
    </div>
    <section
      v-for="order in orders"
      :key="order.id"
      class="sheet order"
    >
      <div class="order__wrapper">
        <div class="order__number">
          <b data-test="orderId">Заказ #{{ order.id }}</b>
        </div>
        <div class="order__sum">
          <span data-test="price">Сумма заказа: {{ totalPrice(order) }} ₽</span>
        </div>
        <div class="order__button">
          <button
            type="button"
            class="button button--border"
            data-test="delBtn"
            @click="delOrder(order.id)"
          >
            Удалить
          </button>
        </div>
        <div class="order__button">
          <button
            type="button"
            class="button"
            data-test="addBtn"
            @click="addPizzaToCart(order)"
          >
            Повторить
          </button>
        </div>
      </div>
      <ul class="order__list">
        <li
          v-for="pizza in order.orderPizzas"
          :key="pizza.id"
          class="order__item"
        >
          <div class="product">
            <img
              src="~@/assets/img/product.svg"
              class="product__img"
              width="56"
              height="56"
              alt="pizza.name"
            >
            <div class="product__text">
              <h2 data-test="pizzaName">
                {{ pizza.name }}
              </h2>
              <ul>
                <li data-test="pizzaDough">
                  {{ sizeName(pizza.sizeId) }} см, на
                  {{ doughName(getDoughById(pizza.doughId)) }} тесте
                </li>
                <li data-test="pizzaSauce">
                  Соус: {{ sauceName(pizza.sauceId) }}
                </li>
                <li data-test="pizzaFillings">
                  Начинка: {{ getFillings(pizza) }}
                </li>
              </ul>
            </div>
          </div>
          <p class="order__price">
            {{ pizza.quantity > 1 ? pizza.quantity + "x" : "" }}
            {{ pizzaPrice(pizza) }} ₽
          </p>
        </li>
      </ul>
      <ul class="order__additional">
        <li
          v-for="misc in order.orderMisc"
          :key="misc.id"
        >
          <img
            :src="getMiscById(misc.miscId).image"
            width="20"
            height="30"
            :alt="getMiscById(misc.miscId).name"
          >
          <p>
            <span data-test="miscName">{{
              getMiscById(misc.miscId).name
            }}</span>
            <b data-test="miscPrice">{{ getMiscById(misc.miscId).price }} ₽</b>
          </p>
        </li>
      </ul>
      <p class="order__address">
        {{ getAddress(order) }}
      </p>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import auth from "@/middlewares/auth";

export default {
  name: "OrdersView",
  middlewares: [auth],
  layout: "AppLayoutProfile",
  data: () => ({}),
  computed: {
    ...mapState("Profile", ["orders"]),
    ...mapGetters("Cart", ["getMiscById"]),
    ...mapGetters("Builder", [
      "getDoughById",
      "getSauceById",
      "getSizeById",
      "getIngredientById",
    ]),
  },

  created() {
    this.$store.dispatch("Profile/getOrders");
    this.$store.dispatch("Cart/getItems");
    this.$store.dispatch("Builder/init");
  },

  methods: {
    sauceName(sauceId) {
      return this.getSauceById(sauceId)?.name.toLowerCase();
    },

    sizeName(sizeId) {
      return this.getSizeById(sizeId)?.name;
    },

    getAddress(order) {
      let address = "";
      if (order.addressId != null) {
        if (order.orderAddress != null) {
          if (order.orderAddress.name == null) {
            address =
              "Адрес доставки: " +
              order.orderAddress.street +
              ", " +
              order.orderAddress.building +
              ", " +
              order.orderAddress.flat;
          } else {
            address = "Адрес доставки: " + order.orderAddress.name;
          }
        }
      }
      return address;
    },

    getFillings(pizza) {
      let fillings = [];
      for (let value of pizza.ingredients) {
        fillings.push(
          this.getIngredientById(value.ingredientId)?.name.toLowerCase()
        );
      }
      return fillings.toString();
    },

    ...mapActions("Profile", ["deleteOrder"]),

    async delOrder(orderId) {
      await this.deleteOrder(orderId);
    },

    addPizzaToCart(order) {
      let pizzas = [];
      if (order.orderPizzas != null && order.orderPizzas.length > 0) {
        for (let pizza of order.orderPizzas) {
          let fillings = [];
          for (let item of pizza.ingredients) {
            fillings.push({
              filling: this.getIngredientById(item.ingredientId)?.value,
              id: item.ingredientId,
              count: item.quantity,
              fillingPrice: this.getIngredientById(item.ingredientId)?.price,
            });
          }
          pizza.fillings = fillings;
          pizzas.push({
            pizza: pizza,
            price: this.pizzaPrice(pizza),
          });
        }
      }
      this.$store.commit("Cart/SET_CART_ORDER", {
        id: order.id,
        pizzas: pizzas,
        misc: order.orderMisc,
        addressId: order.addressId,
      });
      this.$router.push({ name: "CartView" });
    },

    doughName(dough) {
      if (dough != null) {
        let doughName;
        doughName = dough.name
          .toLowerCase()
          .substring(0, dough.name.length - 2);
        doughName += "ом";
        return doughName;
      }
    },

    pizzaPrice(pizza) {
      let ingridientPrice = 0;
      for (let value of pizza.ingredients) {
        ingridientPrice +=
          this.getIngredientById(value.ingredientId)?.price * value.quantity;
      }
      let price =
        (ingridientPrice +
          this.getDoughById(pizza.doughId)?.price +
          this.getSauceById(pizza.sauceId)?.price) *
        this.getSizeById(pizza.sizeId)?.multiplier;
      return price;
    },

    totalPrice(order) {
      let price = 0;
      if (order.orderPizzas != null) {
        for (let value of order.orderPizzas) {
          price += this.pizzaPrice(value) * value.quantity;
        }
      }
      if (order.orderMisc != null) {
        for (let value of order.orderMisc) {
          price += this.getMiscById(value.miscId)?.price * value.quantity;
        }
      }
      return price;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/product.scss";
@import "~@/assets/scss/blocks/order.scss";
@import "~@/assets/scss/blocks/title.scss";
@import "~@/assets/scss/blocks/button.scss";
</style>
