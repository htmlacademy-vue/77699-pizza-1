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
