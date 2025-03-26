const Router = {
  init() {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", function (event) {
        event.preventDefault();
        const url = event.target.getAttribute("href");
        Router.go(url);
      });
    });

    // Verifica a mudança na URL
    window.addEventListener("popstate", function (event) {
      const location = history.state.page;
      Router.go(location, false);
    });

    // Verificar o URL inicial
    const url = location.pathname;
    Router.go(url, false);
  },
  go(route, addToHistory = true) {
    console.log("Going to ", route);

    if (addToHistory) {
      history.pushState({ page: route }, route, route);
    }

    let pageElement = null;

    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        break;
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          const paramId = route.substring(route.lastIndexOf("-") + 1);
          pageElement.dataset.id = paramId;
        }
    }

    if (pageElement) {
      const mainElement = document.querySelector("main#app-main");
      mainElement.innerHTML = "";
      mainElement.appendChild(pageElement);

      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};

export default Router;
