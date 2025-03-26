import { getProductById } from "../services/menu.js";
import { addToCart } from "../services/order.js";

export class DetailsPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    this.root.appendChild(style);

    async function loadCSS() {
      const css = await fetch("components/DetailsPage.css");
      style.textContent = await css.text();
    }
    loadCSS()
  }

  connectedCallback() {
    const template = document.getElementById("details-page-template");
    const clone = template.content.cloneNode(true);
    this.root.appendChild(clone);

    this.render();
  } 

  async render() {
    if (this.dataset.id) {
      this.product = await getProductById(this.dataset.id);

      this.root.querySelector("h2").textContent = this.product.name;
      this.root.querySelector("img").src = `/data/images/${this.product.image}`;
      this.root.querySelector("p.description").textContent =
        this.product.description;
      this.root.querySelector("p.price").textContent = this.product.price;
      this.root.querySelector("button").addEventListener("click", () => {
        addToCart(this.product.id)

        app.router.go("/order");
      });
    } else {
      alert("Invalid Product ID");
    }
  }
}

customElements.define("details-page", DetailsPage);
