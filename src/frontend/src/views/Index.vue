<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector />
        <BuilderSizeSelector />
        <BuilderIngredientsSelector />
        <BuilderPizzaView />
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
import { mapState } from "vuex";

export default {
  name: "IndexHome",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("Builder", [
      "sizePrice",
      "saucePrice",
      "doughPrice",
      "Fillings",
    ]),
  },
  created() {
    this.$store.dispatch("Builder/init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
