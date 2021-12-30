import { shallowMount } from "@vue/test-utils";

import ItemCounter from "@/common/components/ItemCounter";

describe("ItemCounter", () => {
  const propsData = { counterValue: 1 };
  const listeners = { click: null };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("input value is counterValue", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toEqual("1");
  });

  it("raises the changeCount event on plus click", async () => {
    createComponent({ propsData, listeners });
    await wrapper.find("[data-test='button--plus']").trigger("click");
    expect(wrapper.emitted("change-count")[0][0]).toEqual(2);
  });

  it("raises the changeCount event on minus click", async () => {
    createComponent({ propsData, listeners });
    await wrapper.find("[data-test='button--minus']").trigger("click");
    expect(wrapper.emitted("change-count")[0][0]).toEqual(0);
  });

  it("disables button minus", () => {
    propsData.counterValue = 0;
    createComponent({ propsData });
    expect(
      wrapper.find("[data-test='button--minus']").attributes("disabled")
    ).toBeTruthy();
  });

  it("disables button plus", () => {
    propsData.counterValue = 3;
    createComponent({ propsData });
    expect(
      wrapper.find("[data-test='button--plus']").attributes("disabled")
    ).toBeTruthy();
  });
});
