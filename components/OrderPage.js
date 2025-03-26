export class OrderPage extends HTMLElement {
  #user = {
    name: "",
    email: "",
    phone: "",
  };
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    this.root.appendChild(style);

    const section = document.createElement("section");
    this.root.appendChild(section);

    async function loadCSS() {
      const styles = await fetch("./components/OrderPage.css");
      style.textContent = await styles.text();
    }
    loadCSS();
  }

  connectedCallback() {
    window.addEventListener("appcartchange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    const section = this.root.querySelector("section");
    if (app.store.cart.length == 0) {
      section.innerHTML = `
          <p class="empty">Your order is empty</p>
      `;
    } else {
      const html = `
      <h2>Your Order</h2>
      <ul></ul>
      `;
      section.innerHTML = html;

      const template = document.getElementById("order-form-template");
      const clone = template.content.cloneNode(true);
      section.appendChild(clone);

      let total = 0;
      for (let prodInCart of app.store.cart) {
        const item = document.createElement("cart-item");
        item.dataset.item = JSON.stringify(prodInCart);
        this.root.querySelector("ul").appendChild(item);

        total += prodInCart.quantity * prodInCart.product.price;
      }
      this.root.querySelector("ul").innerHTML += `
            <li>
                <p class='total'>Total</p>
                <p class='price-total'>$${total.toFixed(2)}</p>
            </li>                
        `;
      this.setFormBindings(this.root.querySelector("form"));
    }
  }

  setFormBindings(form) {
    // Ao ouvir o evento de submit do formulário, exibe um alerta com o nome do usuário e limpa os campos do formulário
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Order submitted " + this.#user.name + " !");
      this.#user.name = "";
      this.#user.email = "";
      this.#user.phone = "";
    });
    /**
     * Cria um Proxy para o objeto this.#user, de forma que
     * toda vez que uma propriedade for alterada, o valor do
     * campo correspondente no formulário também seja atualizado
     */
    this.#user = new Proxy(this.#user, {
      set: (target, prop, value) => {
        target[prop] = value;
        form.elements[prop].value = value;
        return true;
      },
    });
    /**
     * Adiciona um event listener para cada campo do formulário
     * que atualiza o valor da propriedade correspondente no objeto this.#user
     */
    Array.from(form.elements).forEach((element) => {
      element.addEventListener("change", (event) => {
        this.#user[element.name] = event.target.value;
      });
    });
  }
}

customElements.define("order-page", OrderPage);
