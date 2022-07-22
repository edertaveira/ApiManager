import ApiService from "./ApiService";
const server = "https://jsonplaceholder.typicode.com";
const users = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
];

describe("Service/ApiService.js - GET", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(users),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
    window.server = server;
  });

  test("Calling the api with path and global server", async () => {
    const api = new ApiService();
    const users = await api.get("/users");
    expect(users.length).toEqual(1);
  });

  test("Calling the api with url from parameter", async () => {
    delete window.server;
    const api = new ApiService();
    const users = await api.get("/users", server);
    expect(users.length).toEqual(1);
  });

  test("Calling the api with a invalid url from parameter", async () => {
    delete window.server;
    const api = new ApiService();
    const users = await api.get("/users", "ht:/a").catch((error) => {
      expect(error.message).toEqual("URL is not valid");
    });
  });

  test("Calling the api without path. Should return an error", async () => {
    const api = new ApiService();
    const users = await api.get().catch((error) => {
      expect(error.message).toEqual("Path is not defined");
    });
  });

  test("Calling the api without global server. Should return an error", async () => {
    delete window.server;
    const api = new ApiService();
    const users = await api.get("/").catch((error) => {
      expect(error.message).toEqual("Server not defined");
    });
  });

  test("Calling the api with another URL server. ", async () => {
    window.server = "htt://error";
    const api = new ApiService();
    const users = await api.get("/").catch((error) => {
      expect(error.message).toEqual("Global Server is not valid");
    });
  });

  test("returns null when exception", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));
    const api = new ApiService();
    api.get("/users", server).catch((error) => {
      expect(error.message);
    });
  });
});
