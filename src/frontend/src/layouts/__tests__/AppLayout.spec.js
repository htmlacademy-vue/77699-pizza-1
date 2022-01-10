import { shallowMount } from "@vue/test-utils";
import AppLayout from "@/layouts/AppLayout.vue";

describe("AppLayout", () => {
  let wrapper;

  const mocks = {
    $route: {
      meta: {
        layout: "",
      },
    },
  };

  const createComponent = (options) => {
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
