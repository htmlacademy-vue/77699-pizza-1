import { shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import AppLayout from "@/layouts/AppLayout.vue";
import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";

describe("AppLayout", () => {

  let wrapper;

  const mocks = {
    $route: {
      meta: {
        layout: "",
      },
    },
  };
  
  const createComponent = options => {
    wrapper = shallowMount(AppLayout, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });
  
  it("is rendered", () => {
    createComponent({ mocks });
    expect(wrapper.exists()).toBeTruthy();
  });
});
