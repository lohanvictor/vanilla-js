import { getProductById } from "./menu.js";

export async function addToCart(id) {
  const product = await getProductById(id);
  const productInCart = app.store.cart.some((p) => p.product.id === id);
  if (productInCart) {
    app.store.cart = app.store.cart.map((p) => {
      if (p.product.id === id) {
        return { product, quantity: p.quantity + 1 };
      }
      return p;
    });
  } else {
    app.store.cart.push({ product, quantity: 1 });
  }
  window.dispatchEvent(new Event("appcartchange"));
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter((p) => p.product.id !== id);
}
