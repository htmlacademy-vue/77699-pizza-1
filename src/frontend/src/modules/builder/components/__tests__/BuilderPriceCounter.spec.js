import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPriceCounter", () => {

  let wrapper;
  let store;
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  const listeners = { click: null };
  
  const getData = () => {
    store.commit("Builder/CHANGE_FILLINGS", { filling: "ham", count: 2, fillingPrice: 42 });
    store.commit("Builder/GET_DOUGH", [{ id: 1, value: "light", price: 300 }]);
    store.commit("Builder/GET_SAUCE", [{ id: 1, value: "creamy", price: 50 }]);
    store.commit("Builder/GET_SIZE", [{ id: 2, multiplier: 2, value: "normal" }]);
    store.commit("Builder/CHANGE_PIZZA_NAME", "testName");
  };
  
  const createComponent = options => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
	listeners.click = jest.fn();
    store = generateMockStore();
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });
  
  it("renders p with price", () => {
	getData();
    createComponent({ localVue, store });
    expect(wrapper.find("p").text()).toContain("868 ₽");
  });
  
  it("renders a button class if disabled", () => {
    createComponent({ localVue, store });
    expect(wrapper.find("button").classes()).toContain("button--disabled");
  });
  
  it("disables button", () => {
    createComponent({ localVue, store });
    expect(wrapper.find("button").attributes("disabled")).toBeTruthy();
  });
  
  it("activates button", () => {
    getData();	  
    createComponent({ localVue, store });
    expect(wrapper.find("button").attributes("disabled")).toBeFalsy();
  });
  
  it("calls the addPizzaToCart on click", async () => {
	getData();
    createComponent({ localVue, store, listeners, mocks });
    await wrapper.find("button").trigger("click");
    expect(store.state.Cart.pizzas.length).toBe(1);
    expect(mocks.$router.push).toHaveBeenCalled();
  });
});
