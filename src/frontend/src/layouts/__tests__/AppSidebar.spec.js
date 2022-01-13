import { shallowMount } from "@vue/test-utils";
import AppSidebar from "@/layouts/AppSidebar.vue";

describe("AppSidebar", () => {
  let wrapper;
  const stubs = ["router-link"];

  const createComponent = (options) => {
    wrapper = shallowMount(AppSidebar, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders orders", () => {
    createComponent({ stubs });
    expect(wrapper.find("[data-test='orders']").exists()).toBeTruthy();
  });

  it("renders profile", () => {
    createComponent({ stubs });
    expect(wrapper.find("[data-test='profile']").exists()).toBeTruthy();
  });
});
