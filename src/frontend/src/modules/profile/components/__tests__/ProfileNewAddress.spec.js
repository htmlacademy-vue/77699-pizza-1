import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import ProfileNewAddress from "@/modules/profile/components/ProfileNewAddress";
import AppInput from "@/common/components/AppInput";

const localVue = createLocalVue();
localVue.component('AppInput', AppInput);
localVue.use(Vuex);

describe("ProfileNewAddress", () => {

  let actions;
  let wrapper;
  let store;
  const listeners = { click: null };
  let propsData;
  const mocks = {
    $router: {
      go: jest.fn(),
    },
  };
  
  const getData = () => {
	store.commit("Auth/CHECK_AUTH", true);
    store.commit("Auth/SET_USER", { name: "Вася Пупкин", email: "user@example.com", password: "user@example.com", avatar: "/public/img/users/user.jpg", phone: "+777 777 777" });
  };
  
  const createComponent = options => {
    wrapper = mount(ProfileNewAddress, options);
  };

  beforeEach(() => {
	propsData = { newAddress: false, showAddressForm: true, id: 1, name: "testName", street: "testStreet", building: "testBuilding", flat: "testFlat", comment: "testComment" };
    listeners.click = jest.fn();
    actions = {
      Profile: {
        postAddress: jest.fn(),
        putAddress: jest.fn(),
        deleteAddress: jest.fn()
      }
    };
    store = generateMockStore(actions);
	mocks.$router.go = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });
  
  it("renders without address form", () => {
	propsData.showAddressForm = false;
    createComponent({ localVue, store, propsData });
    expect(wrapper.find(".layout__address").exists()).toBeFalsy();
  });
  
  it("renders with address form", () => {
	propsData.showAddressForm = true;
    createComponent({ localVue, store, propsData });
    expect(wrapper.find(".layout__address").exists()).toBeTruthy();
  });
  
  it("renders address name", () => {
    createComponent({ localVue, store, propsData });
	wrapper.find("[data-test='addressName']").element.value = wrapper.vm.addressName;
    expect(wrapper.find("[data-test='addressName']").element.value).toBe(propsData.name);
  });

  it("renders address street", () => {
    createComponent({ localVue, store, propsData });
	wrapper.find("[data-test='addressStreet']").element.value = wrapper.vm.addressStreet;
    expect(wrapper.find("[data-test='addressStreet']").element.value).toBe(propsData.street);
  });
  
  it("renders address building", () => {
    createComponent({ localVue, store, propsData });
	wrapper.find("[data-test='addressBuilding']").element.value = wrapper.vm.addressBuilding;
    expect(wrapper.find("[data-test='addressBuilding']").element.value).toBe(propsData.building);
  });
  
  it("renders address flat", () => {
    createComponent({ localVue, store, propsData });
	wrapper.find("[data-test='addressFlat']").element.value = wrapper.vm.addressFlat;
    expect(wrapper.find("[data-test='addressFlat']").element.value).toBe(propsData.flat);
  });
  
  it("renders address comment", () => {
    createComponent({ localVue, store, propsData });
	wrapper.find("[data-test='addressComment']").element.value = wrapper.vm.addressComment;
    expect(wrapper.find("[data-test='addressComment']").element.value).toBe(propsData.comment);
  });
  
  it("renders delete button", () => {
    propsData.newAddress = false;
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("[data-test='delBtn']").exists()).toBeTruthy();
  });
  
  it("renders without delete button", () => {
	propsData.newAddress = true;
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("[data-test='delBtn']").exists()).toBeFalsy();
  });
  
  it("raises the deleteAddress event on click", async () => {
	propsData.newAddress = false;
    createComponent({ localVue, store, propsData, listeners, mocks });
    await wrapper.find("[data-test='delBtn']").trigger("click");
    expect(actions.Profile.deleteAddress).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      1
    );
	expect(mocks.$router.go).toHaveBeenCalled();
  });
  
  it("raises event on submit for old address", async () => {
	getData();
	propsData.newAddress = false;
    createComponent({ localVue, store, propsData, listeners, mocks });
    await wrapper.find("form").trigger("submit");
    expect(actions.Profile.putAddress).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      { name: propsData.name, id: propsData.id, street: propsData.street, building: propsData.building, flat: propsData.flat, comment: propsData.comment, userId: store.state.Auth.userId }
	);
    expect(mocks.$router.go).toHaveBeenCalled();
  });
  
  it("raises event on submit for new address", async () => {
	getData();
	propsData.newAddress = true;
    createComponent({ localVue, store, propsData, listeners, mocks });
    await wrapper.find("form").trigger("submit");
    expect(actions.Profile.postAddress).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      { name: propsData.name, street: propsData.street, building: propsData.building, flat: propsData.flat, comment: propsData.comment, userId: store.state.Auth.userId }
	);
    expect(mocks.$router.go).toHaveBeenCalled();
  });
});
