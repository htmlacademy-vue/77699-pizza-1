import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import RadioButton from "@/common/components/AppRadioButton";

const localVue = createLocalVue();
localVue.component("RadioButton", RadioButton);
localVue.use(Vuex);

describe("BuilderSizeSelector", () => {
  let wrapper;
  const listeners = { change: null };
  let store;

  const getData = () => {
    store.commit("Builder/GET_SIZE", [
      { id: 1, value: "small", multiplier: 1, name: "23 см" },
      { id: 2, value: "normal", multiplier: 2, name: "32 см" },
      { id: 3, value: "big", multiplier: 2, name: "45 см" },
    ]);
  };

  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    listeners.change = jest.fn();
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders RadioButton", () => {
    getData();
    createComponent({ localVue, store, listeners });
    expect(wrapper.findAllComponents(RadioButton).length).toBe(3);
  });

  it("RadioButton labelClass contains size.value", () => {
    getData();
    createComponent({ localVue, store, listeners });
    expect(
      wrapper.findAllComponents(RadioButton).at(1).props("labelClass")
    ).toContain("normal");
  });

  it("RadioButton value is size.value", () => {
    getData();
    createComponent({ localVue, store, listeners });
    expect(wrapper.findAllComponents(RadioButton).at(1).props("value")).toEqual(
      "normal"
    );
  });

  it("RadioButton checked if size.id == sizeId", () => {
    getData();
    createComponent({ localVue, store, listeners });
    expect(
      wrapper.findAllComponents(RadioButton).at(1).props("checked")
    ).toBeTruthy();
  });

  it("calls the vuex mutation on change", async () => {
    getData();
    createComponent({ localVue, store, listeners });
    await wrapper.findComponent(RadioButton).trigger("change");
    expect(store.state.Builder.sizeId).toBe(2);
  });
});
