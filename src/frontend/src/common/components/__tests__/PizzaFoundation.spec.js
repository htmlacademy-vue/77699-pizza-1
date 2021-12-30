import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import PizzaFoundation from "@/common/components/PizzaFoundation";
import AppDrop from "@/common/components/AppDrop";

const localVue = createLocalVue();
localVue.component("AppDrop", AppDrop);
localVue.use(Vuex);

describe("PizzaFoundation", () => {
  let store;

  const getData = () => {
    store.commit("Builder/CHANGE_FILLINGS", { filling: "ham", count: 2 });
    store.commit("Builder/GET_DOUGH", [{ id: 1, value: "light" }]);
    store.commit("Builder/GET_SAUCE", [{ id: 1, value: "creamy" }]);
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(PizzaFoundation, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders a pizzaContent class", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find("[data-test='pizzaContent']").classes()).toContain(
      "pizza--foundation--small-creamy"
    );
  });

  it("renders a pizzaFilling class without ingredients", () => {
    createComponent({ localVue, store });
    expect(wrapper.find("[data-test='pizzaFilling']").exists()).toBeFalsy();
  });

  it("renders a pizzaFilling class with ingredients", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find("[data-test='pizzaFilling']").classes()).toContain(
      "pizza__filling--ham"
    );
    expect(wrapper.find("[data-test='pizzaFilling']").classes()).toContain(
      "pizza__filling--second"
    );
  });
});
