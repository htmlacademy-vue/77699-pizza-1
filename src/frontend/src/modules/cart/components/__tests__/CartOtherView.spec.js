import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import CartOtherView from "@/modules/cart/components/CartOtherView";
import CartOtherItem from "@/modules/cart/components/CartOtherItem";

const localVue = createLocalVue();
localVue.component('CartOtherItem', CartOtherItem);
localVue.use(Vuex);

describe("CartOtherView", () => {

  let wrapper;
  let store;

  const getData = () => {
    store.commit("Cart/GET_ITEMS", [
	{ id: 1, price: 56, name: "Cola-Cola 0,5 литра" }, 
	{ id: 2, price: 10, name: "Острый соус" },
	{ id: 3, price: 170, name: "Картошка из печи" },
	]);
  };
  
  const createComponent = options => {
    wrapper = mount(CartOtherView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });
  
  it("renders CartOtherItem", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.findAllComponents(CartOtherItem).length).toBe(3);
  });
});
