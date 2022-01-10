import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import PopupView from "@/views/PopupView";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PopupView", () => {
  let wrapper;
  const listeners = { click: null };
  let store;

  let mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const getData = () => {
    store.commit("Auth/CHECK_AUTH", true);
    store.commit("Auth/SET_USER", {
      name: "Вася Пупкин",
      email: "user@example.com",
      password: "user@example.com",
      avatar: "/public/img/users/user.jpg",
      phone: "+777 777 777",
    });
    store.commit("Builder/SET_PIZZA", {
      pizza: {
        doughId: 1,
        sauceId: 1,
        sizeId: 2,
        name: "testName",
        ingredients: [{ filling: "ham", count: 2, id: 8, fillingPrice: 42 }],
      },
      indx: 1,
    });
  };

  const createComponent = (options) => {
    wrapper = mount(PopupView, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("calls the closeModal on close click", async () => {
    createComponent({ localVue, store, listeners, mocks });
    await wrapper.find(".close").trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });

  it("calls the closeModal on button click", async () => {
    getData();
    createComponent({ localVue, store, listeners, mocks });
    await wrapper.find(".button").trigger("click");
    expect(store.state.Builder.pizzaIndex).toBe(-1);
    expect(mocks.$router.push).toHaveBeenCalledWith("/orders");
  });
});
