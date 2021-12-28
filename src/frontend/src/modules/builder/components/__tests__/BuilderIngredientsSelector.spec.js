import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import RadioButton from "@/common/components/RadioButton";
import BuilderIngredientsItem from "@/modules/builder/components/BuilderIngredientsItem";

const localVue = createLocalVue();
localVue.component('RadioButton', RadioButton);
localVue.component('BuilderIngredientsItem', BuilderIngredientsItem);
localVue.use(Vuex);

describe("BuilderIngredientsSelector", () => {

  let wrapper;
  const listeners = { change: null };
  let store;
	
  const getData = () => {
    store.commit("Builder/GET_SAUCE", [
	{ id: 1, value: "tomato", price: 50, name: "Томатный" }, 
	{ id: 2, value: "creamy", price: 50, name: "Сливочный" },
	]);
	store.commit("Builder/GET_INGREDIENTS", [{ id: 8, value: "ham", name: "Ветчина", price: 42 }]);
  };
  
  const createComponent = options => {
    wrapper = mount(BuilderIngredientsSelector, options);
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
    expect(wrapper.findAllComponents(RadioButton).length).toBe(2)
  });

  it("RadioButton value is sauce.value", () => {
	getData();
    createComponent({ localVue, store, listeners });
    expect(wrapper.findAllComponents(RadioButton).at(0).props("value")).toEqual("tomato");
  });
  
  it("RadioButton checked if sauceId == sauce.id", () => {
	getData();
    createComponent({ localVue, store, listeners });
    expect(wrapper.findAllComponents(RadioButton).at(0).props("checked")).toBeTruthy();
  });

  it("calls the vuex mutation on change", async () => {
    getData();
    createComponent({ localVue, store, listeners });
    await wrapper.findComponent(RadioButton).trigger("change");
    expect(store.state.Builder.sauceId).toBe(1);
  });
  
  it("renders BuilderIngredientsItem", () => {
	getData();
    createComponent({ localVue, store, listeners });
    expect(wrapper.findAllComponents(BuilderIngredientsItem).length).toBe(1)
  });
});
