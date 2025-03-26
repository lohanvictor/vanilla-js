export class MenuPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    this.root.appendChild(style);

    async function loadCSS() {
      const css = await fetch("components/MenuPage.css");
      style.textContent = await css.text();
    }
    loadCSS();
  }

  // É executado quando o elemento é inserido no DOM
  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const clone = template.content.cloneNode(true);
    this.root.appendChild(clone);

    window.addEventListener("appmenuchange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    if (app.store.menu) {
      const menuElement = this.root.querySelector("#menu");
      menuElement.innerHTML = "";

      for (const category of app.store.menu) {
        const liElement = document.createElement("li");
        liElement.innerHTML = `
          <h3>${category.name}</h3>
          <ul class="category"></ul>
        `;
        menuElement.appendChild(liElement);

        category.products.forEach((product) => {
          const productElement = document.createElement("product-item");
          productElement.dataset.product = JSON.stringify(product);
          liElement.querySelector("ul.category").appendChild(productElement);
        });
      }
    } else {
      this.root.querySelector("#menu").innerHTML = "Carregando...";
    }
  }
}

customElements.define("menu-page", MenuPage);
