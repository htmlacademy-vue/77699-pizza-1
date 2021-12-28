import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import Header from "@/layouts/Header.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const pizzas = [{
  name: "testName",
  sizeId: 2,
  doughId: 1,
  sauceId: 1,
  pizzaFillings: [{ filling: "ham", count: 2, id: 8, fillingPrice: 42 }],
  price: 868,
  indx: -1
}];

describe("Header", () => {

  let wrapper;
  let store;
  
  const stubs = ['router-link'];
  
  const getData = () => {
	store.commit("Auth/CHECK_AUTH", true);
    store.commit("Auth/SET_USER", { name: "Вася Пупкин", email: "user@example.com", password: "user@example.com", avatar: "/public/img/users/user.jpg", phone: "+777 777 777" });
    store.commit("Cart/CHANGE_CART_PIZZA", pizzas[0])
  };
  
  const createComponent = options => {
    wrapper = mount(Header, options);
  };
  
  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });
  
  it("renders cart price", () => {
	getData();
    createComponent({ localVue, store, stubs });
    expect(wrapper.find("[data-test='cartPrice']").text()).toContain("868");
  });
  
  it("renders header__user if not authenticated", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find("[data-test='auth']").exists()).toBeFalsy();
    expect(wrapper.find("[data-test='withoutAuth']").exists()).toBeTruthy();
  });
  
  it("renders header__user if authenticated", () => {
	getData();
    createComponent({ localVue, store, stubs });
    expect(wrapper.find("[data-test='auth']").exists()).toBeTruthy();
    expect(wrapper.find("[data-test='withoutAuth']").exists()).toBeFalsy();
  });
  
  it("renders img", () => {
	getData();
    createComponent({ localVue, store, stubs });
    expect(wrapper.find("[data-test='avatar']").attributes("src")).toBe("/public/img/users/user.jpg");
    expect(wrapper.find("[data-test='avatar']").attributes("alt")).toBe("Вася Пупкин");
  });
  
  it("renders user name", () => {
	getData();
    createComponent({ localVue, store, stubs });
    expect(wrapper.find("[data-test='userName']").text()).toBe("Вася Пупкин");
  });
});
