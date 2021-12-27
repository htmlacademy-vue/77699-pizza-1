import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import CartOtherItem from "@/modules/cart/components/CartOtherItem";
import CartItemCounter from "@/common/components/CartItemCounter";

const localVue = createLocalVue();
localVue.component('CartItemCounter', CartItemCounter);
localVue.use(Vuex);

describe("CartOtherItem", () => {

  let wrapper;
  let store;
  const propsData = { 
    item: { id: 1, price: 56, name: "Cola-Cola 0,5 литра", image: "/public/img/cola.svg" }
  };
  
  const createComponent = options => {
    wrapper = mount(CartOtherItem, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders img src with item.image", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("img").attributes("src")).toBe(propsData.item.image);
  });
  
  it("renders img alt with item.name", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("img").attributes("alt")).toBe(propsData.item.name);
  });
  
  it("renders span text", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("span").text()).toBe(propsData.item.name);
  });
  
  it("renders CartItemCounter", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.findAllComponents(CartItemCounter).exists()).toBeTruthy();
  });
  
  it("CartItemCounter itemPrice is item.price", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.findAllComponents(CartItemCounter).at(0).props("itemPrice")).toEqual(propsData.item.price);
  });
  
  it("CartItemCounter id is item.id", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.findAllComponents(CartItemCounter).at(0).props("id")).toEqual(propsData.item.id);
  });
});
