import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import Index from "@/views/Index";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

const localVue = createLocalVue();
localVue.component('BuilderDoughSelector', BuilderDoughSelector);
localVue.component('BuilderSizeSelector', BuilderSizeSelector);
localVue.component('BuilderIngredientsSelector', BuilderIngredientsSelector);
localVue.component('BuilderPizzaView', BuilderPizzaView);
localVue.use(Vuex);

describe("Index", () => {

  let actions;
  let wrapper;
  let store;
  
  const createComponent = options => {
    wrapper = mount(Index, options);
  };

  beforeEach(() => {
	actions = {
      Builder: {
        init: jest.fn(),
      }
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });
  
  it("renders BuilderDoughSelector", () => {
    createComponent({ localVue, store });
    expect(wrapper.findComponent(BuilderDoughSelector).exists()).toBeTruthy();
  });
  
  it("renders BuilderSizeSelector", () => {
    createComponent({ localVue, store });
    expect(wrapper.findComponent(BuilderSizeSelector).exists()).toBeTruthy();
  });
  
  it("renders BuilderIngredientsSelector", () => {
    createComponent({ localVue, store });
    expect(wrapper.findComponent(BuilderIngredientsSelector).exists()).toBeTruthy();
  });
  
  it("renders BuilderPizzaView", () => {
    createComponent({ localVue, store });
    expect(wrapper.findComponent(BuilderPizzaView).exists()).toBeTruthy();
  });
  
  it("calls init when created", () => {
    createComponent({ localVue, store });
    expect(actions.Builder.init).toHaveBeenCalled();
  });
});
