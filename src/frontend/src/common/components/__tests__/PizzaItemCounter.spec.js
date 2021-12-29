import { shallowMount } from "@vue/test-utils";

import PizzaItemCounter from "@/common/components/PizzaItemCounter";

describe("PizzaItemCounter", () => {
  const propsData = { counterValue: 2, pizzaPrice: 30 };
  const listeners = { click: null };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(PizzaItemCounter, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("input value is counterValue", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toEqual("2");
  });

  it("raises the changeCount event on plus click", async () => {
    createComponent({ propsData, listeners });
    await wrapper.find("[data-test='button--plus']").trigger("click");
    expect(wrapper.emitted("change-count")[0][0]).toEqual(3);
  });

  it("raises the changeCount event on minus click", async () => {
    createComponent({ propsData, listeners });
    await wrapper.find("[data-test='button--minus']").trigger("click");
    expect(wrapper.emitted("change-count")[0][0]).toEqual(1);
  });

  it("disables button minus", () => {
    propsData.counterValue = 1;
    createComponent({ propsData });
    expect(
      wrapper.find("[data-test='button--minus']").attributes("disabled")
    ).toBeTruthy();
  });

  it("calculates price", () => {
    propsData.counterValue = 2;
    createComponent({ propsData });
    expect(wrapper.vm.Price).toEqual(60);
  });
});
