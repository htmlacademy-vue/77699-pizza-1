// Возможные типы теста
export const DoughTypes = [
  {
    label: "Тонкое",
    value: "light",
  },
  {
    label: "Толстое",
    value: "large",
  },
];

// Возможные размеры пиццы
export const PizzaSizes = [
  {
    label: "23 см",
    value: "small",
  },
  {
    label: "32 см",
    value: "normal",
  },
  {
    label: "45 см",
    value: "big",
  },
];

// Возможные типы соуса
export const SauceTypes = [
  {
    label: "Томатный",
    value: "tomato",
  },
  {
    label: "Сливочный",
    value: "creamy",
  },
];

// Возможные типы начинки
export const FillingTypes = [
  {
    label: "Грибы",
    value: "mushrooms",
  },
  {
    label: "Чеддер",
    value: "cheddar",
  },
  {
    label: "Салями",
    value: "salami",
  },
  {
    label: "Ветчина",
    value: "ham",
  },
  {
    label: "Ананас",
    value: "ananas",
  },
  {
    label: "Бекон",
    value: "bacon",
  },
  {
    label: "Лук",
    value: "onion",
  },
  {
    label: "Чили",
    value: "chile",
  },
  {
    label: "Халапеньо",
    value: "jalapeno",
  },
  {
    label: "Маслины",
    value: "olives",
  },
  {
    label: "Томаты",
    value: "tomatoes",
  },
  {
    label: "Лосось",
    value: "salmon",
  },
  {
    label: "Моцарелла",
    value: "mozzarella",
  },
  {
    label: "Пармезан",
    value: "parmesan",
  },
  {
    label: "Блю чиз",
    value: "blue_cheese",
  },
];

export const MOVE = "move";

export const DATA_TRANSFER_PAYLOAD = "payload";

/* eslint-disable */
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
/* eslint-enable */

export const MESSAGE_LIVE_TIME = 5000;
