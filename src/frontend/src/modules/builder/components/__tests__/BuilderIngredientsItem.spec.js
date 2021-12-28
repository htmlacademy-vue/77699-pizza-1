import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import BuilderIngredientsItem from "@/modules/builder/components/BuilderIngredientsItem";
import AppDrag from "@/common/components/AppDrag";
import ItemCounter from "@/common/components/ItemCounter";

const localVue = createLocalVue();
localVue.component('AppDrag', AppDrag);
localVue.component('ItemCounter', ItemCounter);
localVue.use(Vuex);

describe("BuilderIngredientsItem", () => {

  let wrapper;
  const listeners = { change: null };
  let store;
  
  const propsData = { filling: { id: 8, value: "ham", name: "Ветчина", price: 42 } };
	
  const getData = () => {
    store.commit("Builder/CHANGE_FILLINGS", { filling: "ham", count: 3, id: 8, fillingPrice: 42 });
  };
  
  const createComponent = options => {
    wrapper = mount(BuilderIngredientsItem, options);
  };

  beforeEach(() => {
    listeners.change = jest.fn();
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders span text with filling Name", () => {
	getData();
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("span").text()).toContain(propsData.filling.name);
  });
  
  it("renders span class contains filling Value", () => {
	getData();
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("span").classes()).toContain("filling--ham");
  });
  
  it("AppDrag isDraggable is Draggable", () => {
	getData();
    createComponent({ localVue, store, listeners, propsData });
    expect(wrapper.findAllComponents(AppDrag).at(0).props("isDraggable")).toBeTruthy();
  });
  
  it("calls change count event", async () => {
	getData();
    createComponent({ localVue, store, listeners, propsData });
	await wrapper.findAllComponents(ItemCounter).at(0).trigger("change-count");
    expect(wrapper.findAllComponents(AppDrag).at(0).props("isDraggable")).toBeFalsy();
	expect(wrapper.findAllComponents(ItemCounter).at(0).props("counterValue")).toEqual(3);
  });
});
