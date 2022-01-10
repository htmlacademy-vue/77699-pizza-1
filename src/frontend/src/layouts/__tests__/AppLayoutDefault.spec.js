import { shallowMount } from "@vue/test-utils";
import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";
import Header from "@/layouts/Header.vue";

describe("AppLayoutDefault", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutDefault, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders Header", () => {
    createComponent();
    expect(wrapper.findComponent(Header).exists()).toBeTruthy();
  });
});
