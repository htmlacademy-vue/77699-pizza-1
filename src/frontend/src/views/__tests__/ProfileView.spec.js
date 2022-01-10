import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import ProfileView from "@/views/ProfileView";
import ProfileAddressView from "@/modules/profile/components/ProfileAddressView";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ProfileView", () => {
  let store;

  const getData = () => {
    store.commit("Auth/CHECK_AUTH", true);
    store.commit("Auth/SET_USER", {
      name: "Вася Пупкин",
      email: "user@example.com",
      password: "user@example.com",
      avatar: "/public/img/users/user.jpg",
      phone: "+777 777 777",
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
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(ProfileView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders ProfileAddressView", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.findComponent(ProfileAddressView).exists()).toBeTruthy();
  });

  it("renders img attributes", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find("img").attributes("src")).toBe(
      "/public/img/users/user.jpg"
    );
    expect(wrapper.find("img").attributes("alt")).toBe("Вася Пупкин");
  });

  it("renders user name", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find("[data-test='userName']").text()).toBe("Вася Пупкин");
  });

  it("renders user phone", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find("[data-test='userPhone']").text()).toBe("+777 777 777");
  });
});
