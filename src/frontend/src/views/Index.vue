<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector v-on:change-dough="changeDough" />

        <BuilderSizeSelector v-on:change-size="changeSize" />

        <BuilderIngredientsSelector
          v-on:change-sauce="sauceChecked = $event"
          v-on:change-fillings="changeFillings"
        />

        <BuilderPizzaView
          v-bind:doughChecked="doughChecked"
          v-bind:sizeChecked="sizeChecked"
          v-bind:sauceChecked="sauceChecked"
          v-bind:Fillings="Fillings"
          v-bind:priceTotal="Price"
          v-on:add-fillings="addFillings"
        />
      </div>
    </form>
  </main>
</template>
<script>
// Импортируем JSON данные и статусы для фильтров.
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  name: "IndexHome",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  data() {
    return {
      doughChecked: "small",
      doughPrice: 300,
      sauceChecked: "tomato",
      saucePrice: 50,
      sizeChecked: "normal",
      sizePrice: 2,
      Fillings: [],
      priceTotal: 0,
    };
  },
  methods: {
    changeDough({ name, price }) {
      this.doughChecked = name;
      this.doughPrice = price;
    },
    changeSize({ name, price }) {
      this.sizeChecked = name;
      this.sizePrice = price;
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
    },

    addFillings(value) {
      if (this.Fillings.some((val) => val.filling === value.value)) {
        this.Fillings = this.Fillings.filter(function (obj) {
          return obj.filling !== value.value;
        });
        this.Fillings.push(value);
      } else {
        this.Fillings.push(value);
      }
    },
  },
  computed: {
    Price() {
      let price =
        (this.doughPrice + this.saucePrice + this.fillingsPrice) *
        this.sizePrice;
      return price;
    },

    fillingsPrice() {
      let ingridientPrice = 0;
      for (let value of this.Fillings) {
        ingridientPrice += value.fillingPrice * value.count;
      }
      return ingridientPrice;
    },
  },
};
</script>

// Импортируем стили
<style lang="scss" scoped></style>
