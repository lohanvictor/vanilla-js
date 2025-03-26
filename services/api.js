const Api = {
  url: "/data/menu.json",
  fetchMenu: async () => {
    const response = await fetch(Api.url);
    const data = await response.json();
    return data;
  },
};

export default Api;
