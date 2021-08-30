<template>
  <body>
    <AppLayout />

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector v-on:change-dough="changeDough" />

          <BuilderSizeSelector v-on:change-size="sizeChecked = $event" />

          <BuilderIngredientsSelector
            v-on:change-sauce="sauceChecked = $event"
            v-on:change-fillings="changeFillings"
          />

          <BuilderPizzaView
            v-bind:doughChecked="doughChecked"
            v-bind:sizeChecked="sizeChecked"
            v-bind:sauceChecked="sauceChecked"
            v-bind:Fillings="Fillings"
            v-bind:priceTotal="Price()"
          />
        </div>
      </form>
    </main>
  </body>
</template>
<script>
// Импортируем JSON данные и статусы для фильтров.
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "IndexHome",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    AppLayout,
  },
  data() {
    return {
      doughChecked: "small",
      doughPrice: 300,
      sauceChecked: "tomato",
      saucePrice: 50,
      sizeChecked: "normal",
      Fillings: [],
      fillingsPrice: 0,
      priceTotal: 0,
    };
  },
  methods: {
    Price() {
      this.priceTotal = this.doughPrice + this.saucePrice + this.fillingsPrice;
      return this.priceTotal;
    },
    changeDough({ name, price }) {
      this.doughChecked = name;
      this.doughPrice = price;
    },
    changeFillings(value) {
      if (value.count > 0) {
        if (this.Fillings.some((val) => val.filling === value.filling)) {
          this.Fillings = this.Fillings.filter(function (obj) {
            return obj.filling !== value.filling;
          });
          this.Fillings.push(value);
        } else {
          this.Fillings.push(value);
        }
      } else {
        if (this.Fillings.some((val) => val.filling === value.filling)) {
          this.Fillings = this.Fillings.filter(function (obj) {
            return obj.filling !== value.filling;
          });
        }
      }
      //console.log(value);
      this.recountFillings();
    },

    recountFillings() {
      this.fillingsPrice = 0;
      for (let value of this.Fillings) {
        this.fillingsPrice += value.fillingPrice * value.count;
      }
    },
  },
};
</script>

// Импортируем стили
<style lang="scss" scoped></style>
