import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import CartPizzaItem from "@/modules/cart/components/CartPizzaItem";
import PizzaItemCounter from "@/common/components/PizzaItemCounter";

const localVue = createLocalVue();
localVue.component('PizzaItemCounter', PizzaItemCounter);
localVue.use(Vuex);

describe("CartPizzaItem", () => {

  let wrapper;
  const listeners = { click: null };
  let store;
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  
  const propsData = { 
    pizza: {  sizeId: 2, doughId: 1, sauceId: 1, count: 2, ingredients: [{ id: 8, value: "ham", name: "Ветчина", price: 42 }], price: 868, name: "testName", indx: -1 },
  };
	
  const getData = () => {
    store.commit("Builder/GET_SAUCE", [
	{ id: 1, value: "tomato", price: 50, name: "Томатный" }, 
	{ id: 2, value: "creamy", price: 50, name: "Сливочный" },
	]);
	store.commit("Builder/GET_INGREDIENTS", [{ id: 8, value: "ham", name: "Ветчина", price: 42 }]);
    store.commit("Builder/GET_DOUGH", [{ id: 1, value: "light", price: 300, name: "Тонкое" }]);
    store.commit("Builder/GET_SIZE", [{ id: 2, multiplier: 2, value: "normal", name: "32 см" }]);
    store.commit("Builder/CHANGE_PIZZA_NAME", "testName");
    store.commit("Builder/SET_PIZZA", { pizza: propsData.pizza, indx: -1 });
    store.commit("Cart/CHANGE_CART_PIZZA", { pizza: propsData.pizza, indx: -1 });
  };
  
  const createComponent = options => {
    wrapper = mount(CartPizzaItem, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
    store = generateMockStore();
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });
  
  it("renders pizza name", () => {
	getData();
    createComponent({ localVue, store, propsData, listeners });
    expect(wrapper.find("[data-test='pizzaName']").text()).toBe(propsData.pizza.name);
  });
  
  it("renders dough name", () => {
	getData();
    createComponent({ localVue, store, propsData, listeners });
    expect(wrapper.find("[data-test='dough']").text()).toContain("тонком");
  });
  
  it("renders sauce name", () => {
	getData();
    createComponent({ localVue, store, propsData, listeners });
    expect(wrapper.find("[data-test='sauce']").text()).toContain("томатный");
  });
  
  it("renders pizza fillings name", () => {
	getData();
    createComponent({ localVue, store, propsData, listeners });
    expect(wrapper.find("[data-test='fillings']").text()).toContain("ветчина");
  });
  
  it("renders PizzaItemCounter", () => {
	getData();
    createComponent({ localVue, store, propsData, listeners });
    expect(wrapper.findAllComponents(PizzaItemCounter).exists()).toBeTruthy();
  });
  
  it("PizzaItemCounter counterValue is pizza.count", () => {
	getData();
    createComponent({ localVue, store, propsData, listeners });
    expect(wrapper.findAllComponents(PizzaItemCounter).at(0).props("counterValue")).toEqual(propsData.pizza.count);
  });
  
  it("PizzaItemCounter pizzaPrice is pizza.price", () => {
	getData();
    createComponent({ localVue, store, propsData, listeners });
    expect(wrapper.findAllComponents(PizzaItemCounter).at(0).props("pizzaPrice")).toEqual(propsData.pizza.price);
  });
  
  it("calls change count event", async () => {
	getData();
    createComponent({ localVue, store, listeners, propsData });
	await wrapper.findAllComponents(PizzaItemCounter).at(0).trigger("change-count");
    expect(store.state.Cart.pizzas.length).toBe(1);
  });
  
  it("calls changePizza event on click", async () => {
	getData();
    createComponent({ localVue, store, listeners, propsData, mocks });
	await wrapper.find(".cart-list__edit").trigger("click");
    expect(store.state.Cart.pizzas.length).toBe(1);
    expect(mocks.$router.push).toHaveBeenCalled();
  });
});
