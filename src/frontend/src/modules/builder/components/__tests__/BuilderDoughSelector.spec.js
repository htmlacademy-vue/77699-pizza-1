import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import RadioButton from "@/common/components/AppRadioButton";

const localVue = createLocalVue();
localVue.component("RadioButton", RadioButton);
localVue.use(Vuex);

describe("BuilderDoughSelector", () => {
  let wrapper;
  const listeners = { change: null };
  let store;

  const getData = () => {
    store.commit("Builder/GET_DOUGH", [
      { id: 1, value: "light" },
      { id: 2, value: "large" },
    ]);
  };

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
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
    expect(wrapper.findAllComponents(RadioButton).length).toBe(2);
  });

  it("RadioButton labelClass contains dough.value", () => {
    getData();
    createComponent({ localVue, store, listeners });
    expect(
      wrapper.findAllComponents(RadioButton).at(0).props("labelClass")
    ).toContain("dough__input--light");
  });

  it("RadioButton value is dough.value", () => {
    getData();
    createComponent({ localVue, store, listeners });
    expect(wrapper.findAllComponents(RadioButton).at(0).props("value")).toEqual(
      "light"
    );
  });

  it("RadioButton checked if dough.id == doughId", () => {
    getData();
    createComponent({ localVue, store, listeners });
    expect(
      wrapper.findAllComponents(RadioButton).at(0).props("checked")
    ).toBeTruthy();
  });

  it("calls the vuex mutation on change", async () => {
    getData();
    createComponent({ localVue, store, listeners });
    await wrapper.findComponent(RadioButton).trigger("change");
    expect(store.state.Builder.doughId).toBe(1);
  });
});
