import Api from "./api.js";

export async function loadData() {
  app.store.menu = await Api.fetchMenu();
}

export async function getProductById(id) {
  if (app.store.menu === null) {
    await loadData();
  }

  for (const category of app.store.menu) {
    for (const product of category.products) {
      if (product.id == id) {
        return product;
      }
    }
  }
}
