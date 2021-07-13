<template>
  <body>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">
                <label
                  v-for="(dough, index) in Doughs"
                  v-bind:key="dough.value"
                  v-bind:class="'dough__input dough__input--' + dough.value"
                  v-bind:checked="index === 0"
                >
                  <input
                    type="radio"
                    name="dought"
                    v-bind:value="dough.value"
                    class="visually-hidden"
                  />
                  <b>{{ dough.name }}</b>
                  <span>Из твердых сортов пшеницы</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  v-for="(size, index) in Sizes"
                  v-bind:key="size.value"
                  v-bind:class="
                    'diameter__input diameter__input--' + size.value
                  "
                  v-bind:checked="index === 1"
                >
                  <input
                    type="radio"
                    name="diameter"
                    v-bind:value="size.value"
                    class="visually-hidden"
                  />
                  <span>{{ size.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingridients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингридиенты
              </h2>

              <div class="sheet__content ingridients">
                <div class="ingridients__sauce">
                  <p>Основной соус:</p>

                  <label
                    v-for="(sauce, index) in Sauces"
                    v-bind:key="sauce.value"
                    class="radio ingridients__input"
                  >
                    <input
                      type="radio"
                      name="sauce"
                      v-bind:value="sauce.value"
                      v-bind:checked="index === 0"
                    />
                    <span>{{ sauce.name }}</span>
                  </label>
                </div>

                <div class="ingridients__filling">
                  <p>Начинка:</p>

                  <ul class="ingridients__list">
                    <li
                      v-for="(filling, index) in Fillings"
                      v-bind:key="index"
                      class="ingridients__item"
                    >
                      <span
                        v-bind:class="'filling filling--' + filling.value"
                        >{{ filling.name }}</span
                      >

                      <div class="counter counter--orange ingridients__counter">
                        <button
                          type="button"
                          class="
                            counter__button
                            counter__button--disabled
                            counter__button--minus
                          "
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button button--disabled" disabled>
                Готовьте!
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </body>
</template>
<script>
// Импортируем JSON данные и статусы для фильтров.
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import users from "@/static/users.json";
import { DoughTypes } from "@/common/constants";
import { SauceTypes } from "@/common/constants";
import { FillingTypes } from "@/common/constants";
import { PizzaSizes } from "@/common/constants";
import { normalizePizza } from "@/common/helpers";

export default {
  name: "IndexHome",
  data() {
    return {
      misc,
      pizza,
      users,
      DoughTypes,
      SauceTypes,
      FillingTypes,
      PizzaSizes,
    };
  },
  computed: {
    Doughs() {
      return normalizePizza(pizza.dough, DoughTypes);
    },
    Sauces() {
      return normalizePizza(pizza.sauces, SauceTypes);
    },
    Fillings() {
      return normalizePizza(pizza.ingredients, FillingTypes);
    },
    Sizes() {
      return normalizePizza(pizza.sizes, PizzaSizes);
    },
  },
};
</script>

// Импортируем стили
<style lang="scss" scoped></style>
