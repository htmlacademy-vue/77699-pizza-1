import notificationTypes from "@/common/enums/notificationTypes";

export default class Notifier {
  #store;
  constructor(store) {
    this.#store = store;
  }

  info(text) {
    alert("[" + notificationTypes.INFO + "] " + text);
  }

  success(text) {
    alert("[" + notificationTypes.SUCCESS + "] " + text);
  }

  error(text) {
    alert("[" + notificationTypes.ERROR + "] " + text);
  }

  warning(text) {
    alert("[" + notificationTypes.WARNING + "] " + text);
  }
}
