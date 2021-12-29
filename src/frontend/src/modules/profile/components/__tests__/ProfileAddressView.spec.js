import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import ProfileNewAddress from "@/modules/profile/components/ProfileNewAddress";
import ProfileAddressItem from "@/modules/profile/components/ProfileAddressItem";
import ProfileAddressView from "@/modules/profile/components/ProfileAddressView";

const localVue = createLocalVue();
localVue.component("ProfileNewAddress", ProfileNewAddress);
localVue.component("ProfileAddressItem", ProfileAddressItem);
localVue.use(Vuex);

describe("ProfileAddressView", () => {
  let wrapper;
  let store;
  const listeners = { click: null };
  const createComponent = (options) => {
    wrapper = mount(ProfileAddressView, options);
  };

  const getData = () => {
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

  beforeEach(() => {
    listeners.click = jest.fn();
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders without addresses", () => {
    createComponent({ localVue, store });
    expect(wrapper.find(".layout__address").exists()).toBeFalsy();
  });

  it("renders layout__address with addresses", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.find(".layout__address").exists()).toBeTruthy();
  });

  it("renders ProfileAddressItem", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.findAllComponents(ProfileAddressItem).exists()).toBeTruthy();
    expect(wrapper.findAllComponents(ProfileAddressItem).length).toBe(1);
  });

  it("ProfileAddressItem address is address", () => {
    getData();
    createComponent({ localVue, store });
    expect(
      wrapper.findAllComponents(ProfileAddressItem).at(0).props("address")
    ).toEqual({
      id: 1,
      name: "testName",
      street: "testStreet",
      building: "testBuilding",
      flat: "testFlat",
      comment: "testComment",
    });
  });

  it("changes the showAddressForm on click", async () => {
    getData();
    createComponent({ localVue, store, listeners });
    await wrapper.find("button").trigger("click");
    expect(wrapper.vm.showAddressForm).toBe(false);
  });

  it("renders ProfileNewAddress", () => {
    getData();
    createComponent({ localVue, store });
    expect(wrapper.findAllComponents(ProfileNewAddress).exists()).toBeTruthy();
  });

  it("ProfileNewAddress newAddress is false", () => {
    getData();
    createComponent({ localVue, store });
    expect(
      wrapper.findAllComponents(ProfileNewAddress).at(0).props("newAddress")
    ).toEqual(false);
  });

  it("ProfileNewAddress showAddressForm is showAddressForm", () => {
    getData();
    createComponent({ localVue, store });
    expect(
      wrapper
        .findAllComponents(ProfileNewAddress)
        .at(0)
        .props("showAddressForm")
    ).toEqual(false);
  });
});
