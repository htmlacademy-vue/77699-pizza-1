import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import PizzaFoundation from "@/common/components/PizzaFoundation";

const localVue = createLocalVue();
localVue.component("BuilderPriceCounter", BuilderPriceCounter);
localVue.component("PizzaFoundation", PizzaFoundation);
localVue.use(Vuex);

describe("BuilderPizzaView", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders input without pizza name", () => {
    createComponent({ localVue, store });
    expect(wrapper.find("input").element.value).toBe("");
  });

  it("renders input with pizza name", () => {
    createComponent({ localVue, store });
    wrapper.find("input").element.value = "testName";
    wrapper.find("input").trigger("input");
    expect(wrapper.find("input").element.value).toBe("testName");
  });
});
