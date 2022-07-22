import ApiService from "../Service/ApiService.js";

export class Letter {
  users = [];
  posts = [];

  constructor(users, posts) {
    this.users = users;
    this.posts = posts;
  }

  #mountAddress(user) {
    let address = "";
    if (typeof user.address === "object") {
      address = user.address.street;
      address += address !== "" ? ", " : address;
      address += user.address.suite ? user.address.suite : "";
      address += address !== "" ? " - " : address;
      address += user.address.zipcode ? user.address.zipcode : "";
      address += user.address.city ? ` ${user.address.city}` : "";
    }
    return address;
  }

  #mount(user) {
    let address = this.#mountAddress(user);
    const object = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address,
      phone: user.phone,
      website: user.website,
      company: user.company && user.company.name ? user.company.name : "",
      posts: [],
    };
    const posts = this.posts.filter((item) => item.userId === user.id);
    if (posts && posts.length > 0)
      object.posts = posts.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      }));
    return object;
  }

  get() {
    return this.users.map((item) => this.#mount(item));
  }
}
