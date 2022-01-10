import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import OrdersView from "@/views/OrdersView";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("OrdersView", () => {
  let store;
  let actions;
  const mocks = {
    $router: {
      go: jest.fn(),
      push: jest.fn(),
    },
  };
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
    store.commit("Builder/GET_SAUCE", [
      { id: 1, value: "tomato", price: 50, name: "Томатный" },
      { id: 2, value: "creamy", price: 50, name: "Сливочный" },
    ]);
    store.commit("Builder/GET_INGREDIENTS", [
      { id: 8, value: "ham", name: "Ветчина", price: 42 },
    ]);
    store.commit("Builder/GET_DOUGH", [
      { id: 1, value: "light", price: 300, name: "Тонкое" },
    ]);
    store.commit("Builder/GET_SIZE", [
      { id: 2, multiplier: 2, value: "normal", name: "32 см" },
    ]);
    store.commit("Cart/GET_ITEMS", [
      { id: 1, price: 56, name: "Cola-Cola 0,5 литра" },
      { id: 2, price: 10, name: "Острый соус" },
      { id: 3, price: 170, name: "Картошка из печи" },
    ]);
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
    store.commit("Profile/GET_ORDERS", [
      {
        id: 1,
        userId: "76841285-f38b-4c88-9929-0ad073c64731",
        addressId: null,
        orderPizzas: [
          {
            id: 1,
            name: "testName",
            quantity: 1,
            sauceId: 1,
            doughId: 1,
            sizeId: 2,
            orderId: 1,
            ingredients: [{ id: 1, quantity: 2, pizzaId: 1, ingredientId: 8 }],
          },
        ],
        orderMisc: [{ id: 1, quantity: 1, orderId: 1, miscId: 2 }],
      },
    ]);
    store.commit("Builder/CHANGE_FILLINGS", {
      filling: "ham",
      count: 2,
      id: 8,
      fillingPrice: 42,
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

  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(OrdersView, options);
  };

  beforeEach(() => {
    actions = {
      Profile: {
        deleteOrder: jest.fn(),
        getOrders: jest.fn(),
      },
    };
    mocks.$router.go = jest.fn();
    mocks.$router.push = jest.fn();
    listeners.click = jest.fn();
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders section", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find("section").exists()).toBeTruthy();
    expect(wrapper.findAll("section").length).toEqual(1);
  });

  it("renders order id", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find("[data-test='orderId']").text()).toContain("1");
  });

  it("renders totalPrice", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find("[data-test='price']").text()).toContain("878");
  });

  it("calls the deleteOrder on click", async () => {
    getData();
    createComponent({ localVue, store, listeners, mocks });
    await wrapper.find("[data-test='delBtn']").trigger("click");
    expect(actions.Profile.deleteOrder).toHaveBeenCalled();
    expect(mocks.$router.go).toHaveBeenCalled();
  });

  it("calls the addPizzaToCart on click", async () => {
    getData();
    createComponent({ localVue, store, listeners, mocks });
    await wrapper.find("[data-test='addBtn']").trigger("click");
    expect(store.state.Cart.pizzas.length).toBe(1);
    expect(mocks.$router.push).toHaveBeenCalled();
  });

  it("renders pizza name", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find("[data-test='pizzaName']").text()).toBe("testName");
  });

  it("renders pizza dough", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find("[data-test='pizzaDough']").text()).toContain("тонком");
  });

  it("renders pizza sauce", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find("[data-test='pizzaSauce']").text()).toContain(
      "томатный"
    );
  });

  it("renders pizza fillings", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find("[data-test='pizzaFillings']").text()).toContain(
      "ветчина"
    );
  });

  it("renders order price", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find(".order__price").text()).toContain("868");
  });

  it("renders misc name", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find("[data-test='miscName']").text()).toBe("Острый соус");
  });

  it("renders misc price", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find("[data-test='miscPrice']").text()).toBe("10 ₽");
  });

  it("renders order address", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find(".order__address").text()).toBe("");
  });
});
