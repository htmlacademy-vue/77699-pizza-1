import { shallowMount } from "@vue/test-utils";
import AppLayoutProfile from "@/layouts/AppLayoutProfile.vue";
import AppHeader from "@/layouts/AppHeader.vue";
import AppSidebar from "@/layouts/AppSidebar.vue";

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
    expect(wrapper.findComponent(AppHeader).exists()).toBeTruthy();
  });

  it("renders AppSidebar", () => {
    createComponent();
    expect(wrapper.findComponent(AppSidebar).exists()).toBeTruthy();
  });
});
