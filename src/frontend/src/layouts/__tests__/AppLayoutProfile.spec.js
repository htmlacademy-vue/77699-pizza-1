import { shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import AppLayoutProfile from "@/layouts/AppLayoutProfile.vue";
import Header from "@/layouts/Header.vue";
import Sidebar from "@/layouts/Sidebar.vue";

describe("AppLayoutProfile", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutProfile, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders Header", () => {
    createComponent();
    expect(wrapper.findComponent(Header).exists()).toBeTruthy();
  });

  it("renders Sidebar", () => {
    createComponent();
    expect(wrapper.findComponent(Sidebar).exists()).toBeTruthy();
  });
});
