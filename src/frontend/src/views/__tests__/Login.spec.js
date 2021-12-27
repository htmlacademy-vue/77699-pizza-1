import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import Login from "@/views/Login";
import AppInput from "@/common/components/AppInput";

const localVue = createLocalVue();
localVue.component('AppInput', AppInput);
localVue.use(Vuex);

describe("Login", () => {
  
  let store;
  let actions;
  const listeners = { submit: null };
  const stubs = ["router-link"];
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  
  let wrapper;
  const createComponent = options => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        login: jest.fn(),
      },
    };
    listeners.submit = jest.fn();
	store = generateMockStore(actions);
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });
  
  it("renders AppInput", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.findAllComponents(AppInput).exists()).toBeTruthy();
    expect(wrapper.findAllComponents(AppInput).length).toBe(2);
  });
 
  it("renders AppInput email", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find("[data-test='email']").props("autofocus")).toBe(true);
    expect(wrapper.find("[data-test='email']").props("value")).toBe("");
  });
  
  it("renders AppInput password", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find("[data-test='password']").props("value")).toBe("");
  });
  
  it("calls login on submit", async () => {
    createComponent({ localVue, store, stubs, listeners });
    wrapper.find("[data-test='password']").element.value = "user@example.com";
    wrapper.find("[data-test='email']").element.value = "user@example.com";
    await wrapper.find("form").trigger("submit");
    expect(store.state.Auth.user.length).toBe(1);
    expect(mocks.$router.push).toHaveBeenCalled();
  });
});
