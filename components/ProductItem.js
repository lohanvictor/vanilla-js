import { addToCart } from "../services/order.js";

export class ProductItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("product-item-template");
    const clone = template.content.cloneNode(true);
    this.appendChild(clone);

    const product = JSON.parse(this.dataset.product);
    this.querySelector("h4").textContent = product.name;
    this.querySelector("p").textContent = product.description;
    this.querySelector(".price").textContent = product.price;
    this.querySelector("img").src = `/data/images/${product.image}`;
    this.querySelector("a").addEventListener("click", (event) => {
      event.preventDefault();
      if (event.target.tagName.toLowerCase() === "button") {
        addToCart(product.id);
      } else {
        app.router.go(`/product-${product.id}`);
      }
    });
  }
}

customElements.define("product-item", ProductItem);
