import { shallowMount } from "@vue/test-utils";

import AppRadioButton from "@/common/components/AppRadioButton";

describe("AppRadioButton", () => {
  const propsData = {
    name: "testName",
    value: "testValue",
    checked: false,
  };
  const listeners = { change: null };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppRadioButton, options);
  };

  beforeEach(() => {
    listeners.change = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("button name is testName", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("name")).toBe(propsData.name);
  });

  it("button value is testValue", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("value")).toBe(propsData.value);
  });

  it("button checked is unchecked", async () => {
    propsData.checked = false;
    createComponent({ propsData });
    expect(wrapper.find("input").element.checked).toBeFalsy();
  });

  it("raises the checked event on change", async () => {
    createComponent({ propsData, listeners });
    await wrapper.find("input").trigger("change");
    expect(listeners.change).toHaveBeenCalled();
  });

  it("raises the emit event on change", async () => {
    createComponent({ propsData, listeners });
    await wrapper.find("input").trigger("change");
    expect(wrapper.emitted().change).toBeTruthy();
  });
});
