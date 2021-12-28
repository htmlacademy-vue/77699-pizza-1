import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import CartPizzaView from "@/modules/cart/components/CartPizzaView";
import CartPizzaItem from "@/modules/cart/components/CartPizzaItem";

const localVue = createLocalVue();
localVue.component('CartPizzaItem', CartPizzaItem);
localVue.use(Vuex);

const pizzas = [{
  name: "testName",
  sizeId: 2,
  doughId: 1,
  sauceId: 1,
  pizzaFillings: [{ filling: "ham", count: 2, id: 8, fillingPrice: 42 }],
  price: 868,
  indx: -1
}];

describe("CartPizzaView", () => {

  let wrapper;
  let store;
  let getters;

  const propsData = { pizzas };
  
  const getData = () => {
	store.commit("Builder/GET_SAUCE", [
	{ id: 1, value: "tomato", price: 50, name: "Томатный" }, 
	{ id: 2, value: "creamy", price: 50, name: "Сливочный" },
	]);
	store.commit("Builder/GET_INGREDIENTS", [{ id: 8, value: "ham", name: "Ветчина", price: 42 }]);
    store.commit("Builder/GET_DOUGH", [{ id: 1, value: "light", price: 300, name: "Тонкое" }]);
    store.commit("Builder/GET_SIZE", [{ id: 2, multiplier: 2, value: "normal", name: "32 см" }]);
    store.commit("Builder/CHANGE_PIZZA_NAME", "testName");
	store.commit("Cart/CHANGE_CART_PIZZA", pizzas[0])
  };
  
  const createComponent = options => {
    wrapper = mount(CartPizzaView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });
  
  it("renders empty message if pizzas = 0", () => {
    createComponent({ localVue, store });
    expect(wrapper.find(".cart__empty").exists()).toBeTruthy();
    expect(wrapper.findComponent(CartPizzaItem).exists()).toBeFalsy();
  });
  
  it("renders CartPizzaItem if pizzas > 0", () => {
	getData();
    createComponent({ localVue, store, propsData });
    expect(wrapper.find(".cart__empty").exists()).toBeFalsy();
    expect(wrapper.findComponent(CartPizzaItem).exists()).toBeTruthy();
	expect(propsData.pizzas.length).toBe(1);
    expect(wrapper.findAllComponents(CartPizzaItem).length).toBe(1);
  });
});
