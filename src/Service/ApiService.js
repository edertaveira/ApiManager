export default class ApiService {
  server;

  constructor() {
    this.server = window.server || null;
  }

  #isValidUrl(urlString) {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!urlPattern.test(urlString);
  }

  #validation(path, url) {
    if (!this.server && !url) throw new Error("Server not defined");
    if (!path) throw new Error("Path is not defined");
    if (url && !this.#isValidUrl(url)) throw new Error("URL is not valid");
    if (!url && !this.#isValidUrl(this.server)) throw new Error("Global Server is not valid");
  }

  async get(path, url = null) {
    this.#validation(path, url);
    path = `${url || this.server}${path}`;

    return await fetch(path, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    }).then((resp) => resp.json());
  }
}
