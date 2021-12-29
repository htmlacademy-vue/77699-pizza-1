import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import CartItemCounter from "@/common/components/CartItemCounter";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

describe("CartItemCounter", () => {
  const propsData = { counterValue: 2, itemPrice: 30, id: 1 };
  const listeners = { click: null };

  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(CartItemCounter, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("input value is counterValue", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("input").element.value).toEqual("2");
  });

  it("raises the changeCount event on plus click", async () => {
    createComponent({ localVue, store, propsData, listeners });
    await wrapper.find("[data-test='button--plus']").trigger("click");
    expect(wrapper.emitted("change-count")[0][0]).toEqual(3);
  });

  it("raises the changeCount event on minus click", async () => {
    createComponent({ localVue, store, propsData, listeners });
    await wrapper.find("[data-test='button--minus']").trigger("click");
    expect(wrapper.emitted("change-count")[0][0]).toEqual(1);
  });

  it("disables button minus", () => {
    propsData.counterValue = 0;
    createComponent({ localVue, store, propsData });
    expect(
      wrapper.find("[data-test='button--minus']").attributes("disabled")
    ).toBeTruthy();
  });

  it("calculates price", () => {
    propsData.counterValue = 2;
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("[data-test='price']").text()).toBe("60 ₽");
  });

  it("raises the changeCount event on plus click", async () => {
    createComponent({ localVue, store, propsData, listeners });
    await wrapper.find("[data-test='button--plus']").trigger("click");
    expect(wrapper.emitted("change-count")[0][0]).toEqual(3);
  });
});
