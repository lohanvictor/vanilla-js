import Store from "./services/store.js";
import Router from "./services/router.js";
import { loadData } from "./services/menu.js";

import "./components/MenuPage.js";
import "./components/OrderPage.js";
import "./components/DetailsPage.js";
import "./components/ProductItem.js";
import "./components/OrderPage.js";
import "./components/CartItem.js";

window.app = {};
app.store = Store;
app.router = Router;

// Este evento sinaliza quando o DOM pode ser manipulado
window.addEventListener("DOMContentLoaded", function () {
  loadData();
  app.router.init();
});

// O evento popstate pode ser usado para detectar mudanças na URL
// dentro de uma mesma página. Isso é útil para criar uma navegação
// por meio de JavaScript, sem a necessidade de recarregar a página.
window.addEventListener("popstate", function () {
  history.pushState({ page: "home" }, "Home", "/home");
  const location = location.href;
});

window.addEventListener("appcartchange", () => {
  const badge = document.getElementById("badge");
  const quantity = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = quantity;
  badge.hidden = quantity === 0;
});
