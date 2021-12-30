import { shallowMount } from "@vue/test-utils";

import AppInput from "@/common/components/AppInput";

describe("AppInput", () => {
  const propsData = {
    name: "testName",
    value: "testValue",
    type: "testType",
    errorText: "",
    class: "test",
    placeholder: "test",
    required: false,
    autofocus: false,
  };
  const listeners = { input: null };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppInput, options);
  };

  beforeEach(() => {
    listeners.input = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("input name is testName", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("name")).toBe(propsData.name);
  });

  it("input type is testType", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("type")).toBe(propsData.type);
  });

  it("input placeholder is test", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("placeholder")).toBe(
      propsData.placeholder
    );
  });

  it("raises the input event on input", async () => {
    createComponent({ propsData, listeners });
    await wrapper.find("input").trigger("input");
    expect(listeners.input).toHaveBeenCalled();
  });

  it("without error", () => {
    createComponent({ propsData });
    expect(wrapper.find(".text-field__text").exists()).toBeFalsy();
  });

  it("with error", () => {
    propsData.errorText = "testErrorText";
    createComponent({ propsData });
    expect(wrapper.find(".text-field__text").exists()).toBeTruthy();
    expect(wrapper.find(".text-field__text").text()).toBe(propsData.errorText);
  });

  it("raises the emit event on input", async () => {
    createComponent({ propsData });
    await wrapper.find("input").trigger("input");
    expect(wrapper.emitted().input[0][0]).toEqual(propsData.value);
  });
});
