import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import CartView from "@/views/CartView";
import PopupView from "@/views/PopupView";
import CartPizzaView from "@/modules/cart/components/CartPizzaView";
import CartOtherView from "@/modules/cart/components/CartOtherView";
import AppInput from "@/common/components/AppInput";

const localVue = createLocalVue();
localVue.component("CartPizzaView", CartPizzaView);
localVue.component("CartOtherView", CartOtherView);
localVue.component("AppInput", AppInput);
localVue.component("PopupView", PopupView);
localVue.use(Vuex);

const pizzas = [
  {
    name: "testName",
    sizeId: 2,
    doughId: 1,
    sauceId: 1,
    pizzaFillings: [{ filling: "ham", count: 2, id: 8, fillingPrice: 42 }],
    price: 868,
    indx: -1,
  },
];

describe("CartView", () => {
  let wrapper;
  let store;
  let actions;
  const stubs = ["router-link"];
  const listeners = { click: null };

  const getData = () => {
    store.commit("Auth/CHECK_AUTH", true);
    store.commit("Auth/SET_USER", {
      name: "Вася Пупкин",
      email: "user@example.com",
      password: "user@example.com",
      avatar: "/public/img/users/user.jpg",
      phone: "+777 777 777",
    });
    store.commit("Builder/CHANGE_FILLINGS", {
      filling: "ham",
      count: 2,
      fillingPrice: 42,
    });
    store.commit("Profile/GET_ADDRESSES", [
      {
        id: 1,
        name: "testName",
        street: "testStreet",
        building: "testBuilding",
        flat: "testFlat",
        comment: "testComment",
      },
    ]);
    store.commit("Cart/CHANGE_CART_PIZZA", pizzas[0]);
    store.commit("Builder/GET_SAUCE", [
      { id: 1, value: "tomato", price: 50, name: "Томатный" },
      { id: 2, value: "creamy", price: 50, name: "Сливочный" },
    ]);
    store.commit("Builder/GET_DOUGH", [
      { id: 1, value: "light", price: 300, name: "Тонкое" },
    ]);
    store.commit("Builder/GET_SIZE", [
      { id: 2, multiplier: 2, value: "normal", name: "32 см" },
    ]);
    store.commit("Builder/GET_INGREDIENTS", [
      { id: 8, value: "ham", name: "Ветчина", price: 42 },
    ]);
  };

  const createComponent = (options) => {
    wrapper = mount(CartView, options);
  };

  beforeEach(() => {
    actions = {
      Profile: {
        postOrder: jest.fn(),
        getAddresses: jest.fn(),
      },
    };
    listeners.click = jest.fn();
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders CartPizzaView", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.findComponent(CartPizzaView).exists()).toBeTruthy();
  });

  it("renders CartOtherView", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.findComponent(CartOtherView).exists()).toBeTruthy();
  });

  it("renders select without addresses", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.findAll("option").length).toBe(2);
  });

  it("renders select with addresses", () => {
    getData();
    createComponent({ localVue, store, stubs });
    expect(wrapper.findAll("option").length).toBe(3);
  });

  it("renders select option -1", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find("select").element.value).toBe("-1");
  });

  it("renders if selected option -1", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find(".cart-form__address").exists()).toBeFalsy();
  });

  it("renders cart-form__address if selected option 0", async () => {
    createComponent({ localVue, store, stubs });
    await wrapper.findAll("option").at(1).setSelected();
    expect(wrapper.find(".cart-form__address").exists()).toBeTruthy();
  });

  it("renders address name", () => {
    getData();
    createComponent({ localVue, store, stubs });
    expect(wrapper.findAll("option").at(2).text()).toContain("testName");
  });

  it("renders cart price", () => {
    getData();
    createComponent({ localVue, store, stubs });
    expect(wrapper.find("[data-test='price']").text()).toContain("868");
  });

  it("renders Popup", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.findComponent(PopupView).exists()).toBeFalsy();
  });

  it("raises the resetPizza event on click", async () => {
    getData();
    createComponent({ localVue, store, stubs, listeners });
    await wrapper.find("[data-test='reset']").trigger("click");
    expect(store.state.Builder.pizzaIndex).toBe(-1);
  });

  it("renders disabled button", () => {
    createComponent({ localVue, store, stubs });
    expect(
      wrapper.find("[data-test='addOrder']").attributes("disabled")
    ).toBeTruthy();
  });

  it("renders enabled button", () => {
    getData();
    createComponent({ localVue, store, stubs });
    expect(
      wrapper.find("[data-test='addOrder']").attributes("disabled")
    ).toBeFalsy();
  });

  it("raises the addOrder event on button click", async () => {
    getData();
    createComponent({ localVue, store, stubs, listeners });
    await wrapper.find("[data-test='addOrder']").trigger("click");
    expect(actions.Profile.postOrder).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        userId: "76841285-f38b-4c88-9929-0ad073c64731",
        pizzas: [
          {
            name: "testName",
            orderId: 1,
            quantity: 1,
            sauceId: 1,
            sizeId: 2,
            doughId: 1,
            id: 1,
            ingredients: [{ id: 2, quantity: 2, pizzaId: 2, ingredientId: 9 }],
          },
        ],
        misc: [{ id: 3, quantity: 1, orderId: 6, miscId: 2 }],
        address: null,
      }
    );
  });
});
