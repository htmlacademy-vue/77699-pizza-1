import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import ProfileNewAddress from "@/modules/profile/components/ProfileNewAddress";
import ProfileAddressItem from "@/modules/profile/components/ProfileAddressItem";

const localVue = createLocalVue();
localVue.component('ProfileNewAddress', ProfileNewAddress);
localVue.use(Vuex);

describe("ProfileAddressItem", () => {

  let wrapper;
  let store;
  const listeners = { click: null };
  const propsData = { 
    address: { id: 1, name: "testName", street: "testStreet", building: "testBuilding", flat: "testFlat", comment: "testComment" },
  };
  
  const createComponent = options => {
    wrapper = mount(ProfileAddressItem, options);
  };

  beforeEach(() => {
	listeners.click = jest.fn();
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });
  
  it("renders address name", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("[data-test='addressName']").text()).toBe(propsData.address.name);
  });
  
  it("renders address", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("[data-test='address']").text()).toContain("testStreet");
    expect(wrapper.find("[data-test='address']").text()).toContain("testBuilding");
    expect(wrapper.find("[data-test='address']").text()).toContain("testFlat");
  });
  
  it("renders address comment", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("[data-test='addressComment']").text()).toBe(propsData.address.comment);
  });
  
  it("changes the showAddressForm on click", async () => {
    createComponent({ localVue, store, propsData, listeners });
    await wrapper.find("button").trigger("click");
    expect(wrapper.vm.showAddressForm).toBe(true);
    expect(wrapper.vm.newAddress).toBe(false);
  });
  
  it("renders ProfileNewAddress", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.findAllComponents(ProfileNewAddress).exists()).toBeTruthy();
  });
  
  it("renders ProfileNewAddress properties", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.findAllComponents(ProfileNewAddress).at(0).props("newAddress")).toEqual(false);
    expect(wrapper.findAllComponents(ProfileNewAddress).at(0).props("showAddressForm")).toEqual(false);
    expect(wrapper.findAllComponents(ProfileNewAddress).at(0).props("street")).toEqual(propsData.address.street);
    expect(wrapper.findAllComponents(ProfileNewAddress).at(0).props("name")).toEqual(propsData.address.name);
    expect(wrapper.findAllComponents(ProfileNewAddress).at(0).props("building")).toEqual(propsData.address.building);
    expect(wrapper.findAllComponents(ProfileNewAddress).at(0).props("flat")).toEqual(propsData.address.flat);
    expect(wrapper.findAllComponents(ProfileNewAddress).at(0).props("comment")).toEqual(propsData.address.comment);
    expect(wrapper.findAllComponents(ProfileNewAddress).at(0).props("id")).toEqual(propsData.address.id);
  });
});
