// Нормализация пиццы
export const normalizePizza = (pizzas, constants) =>
  pizzas.map((pizza) => {
    return {
      ...pizza,
      value: constants.find((item) => item.label === pizza.name).value,
    };
  });
