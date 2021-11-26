// Нормализация пиццы
export const normalizePizza = (pizzas, constants) =>
  pizzas.map((pizza) => {
    return {
      ...pizza,
      value: constants.find((item) => item.label === pizza.name).value,
    };
  });

export const getNameForCart = (value, types) =>
  types.find((item) => {
    return item.value === value;
  });

export const getFillingsForCart = (values, types) =>
  values.map((name) => {
    return types.find((item) => item.value === name).label.toLowerCase();
  });

import resources from "@/common/enums/resources";
import {
  AuthApiService,
  DoughApiService,
  SizeApiService,
  SauceApiService,
  IngredientsApiService,
  ReadOnlyApiService,
  MiscApiService,
  AddressApiService,
  OrdersApiService,
} from "@/services/api.service";

export const createResources = (notifier) => {
  return {
    [resources.USERS]: new ReadOnlyApiService(resources.USERS, notifier),
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.DOUGHS]: new DoughApiService(notifier),
    [resources.SIZES]: new SizeApiService(notifier),
    [resources.SAUCES]: new SauceApiService(notifier),
    [resources.INGREDIENTS]: new IngredientsApiService(notifier),
    [resources.ITEMS]: new MiscApiService(notifier),
    [resources.ADDRESSES]: new AddressApiService(notifier),
    [resources.ORDERS]: new OrdersApiService(notifier),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
  store.commit("Auth/CHECK_AUTH", true);
};
