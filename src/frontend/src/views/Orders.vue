<template>
  <body>
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>
      <section
        class="sheet order"
        v-for="order in orders"
        v-bind:key="order.id"
      >
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>
          <div class="order__sum">
            <span>Сумма заказа: {{ totalPrice(order) }} ₽</span>
          </div>
          <div class="order__button">
            <button
              type="button"
              class="button button--border"
              v-on:click="deleteOrder(order.id)"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button
              type="button"
              class="button"
              v-on:click="addPizzaToCart(order)"
            >
              Повторить
            </button>
          </div>
        </div>
        <ul class="order__list">
          <li
            class="order__item"
            v-for="pizza in order.orderPizzas"
            v-bind:key="pizza.id"
          >
            <div class="product">
              <img
                src="~@/assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>
                    {{ getSizeById(pizza.sizeId).name }} см, на
                    {{ doughName(getDoughById(pizza.doughId)) }} тесте
                  </li>
                  <li>
                    Соус: {{ getSauceById(pizza.sauceId).name.toLowerCase() }}
                  </li>
                  <li>Начинка: {{ getFillings(pizza) }}</li>
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
          <li v-for="misc in order.orderMisc" v-bind:key="misc.id">
            <img
              :src="getMiscById(misc.miscId).image"
              width="20"
              height="30"
              :alt="getMiscById(misc.miscId).name"
            />
            <p>
              <span>{{ getMiscById(misc.miscId).name }}</span>
              <b>{{ getMiscById(misc.miscId).price }} ₽</b>
            </p>
          </li>
        </ul>
        <p class="order__address">{{ getAddress(order) }}</p>
      </section>
    </div>
  </body>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Orders",
  data: () => ({}),
  methods: {
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
          this.getIngredientById(value.ingredientId).name.toLowerCase()
        );
      }
      return fillings.toString();
    },
    async deleteOrder(orderId) {
      await this.$api.orders.delete(orderId);
      await this.$router.go();
    },
    addPizzaToCart(order) {
      let pizzas = [];
      if (order.orderPizzas != null && order.orderPizzas.length > 0) {
        for (let pizza of order.orderPizzas) {
          let fillings = [];
          for (let item of pizza.ingredients) {
            fillings.push({
              filling: this.getIngredientById(item.ingredientId).value,
              id: item.ingredientId,
              count: item.quantity,
              fillingPrice: this.getIngredientById(item.ingredientId).price,
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
      this.$router.push({ name: "Cart" });
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
          this.getIngredientById(value.ingredientId).price * value.quantity;
      }
      let price =
        (ingridientPrice +
          this.getDoughById(pizza.doughId).price +
          this.getSauceById(pizza.sauceId).price) *
        this.getSizeById(pizza.sizeId).multiplier;
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
          price += this.getMiscById(value.miscId).price * value.quantity;
        }
      }
      return price;
    },
  },
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
};
</script>

<style lang="scss" scoped></style>
