import { Letter } from "./Model/Letter.js";
import ApiService from "./Service/ApiService.js";

export default class App {
  constructor() {
    window.server = "https://jsonplaceholder.typicode.com";
  }

  async render() {
    const api = new ApiService();
    const users = await api.get("/users");
    const posts = await api.get("/posts");

    const letter = new Letter(users, posts);
    const letterList = letter.get();
    return `<pre>${JSON.stringify(letterList, null, 2)}</pre>`;
  }
}

window.onload = async function () {
  const app = new App();
  let container = document.querySelector("#container");
  container.innerHTML = await app.render();
};
