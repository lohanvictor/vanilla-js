const Store = {
  menu: null,
  cart: [],
};

const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property === "cart") {
      window.dispatchEvent(new Event("appcartchange"));
    }
    if (property === "menu") {
      window.dispatchEvent(new Event("appmenuchange"));
    }
    return true;
  },
});

export default proxiedStore;
