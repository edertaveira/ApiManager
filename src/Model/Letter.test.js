import { Letter } from "./Letter";

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
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
  },
];

const posts = [
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 2,
    id: 11,
    title: "et ea vero quia laudantium autem",
    body: "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi",
  },
];

const server = "https://jsonplaceholder.typicode.com";

describe("Model/Letter.js", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(users),
    })
  );

  beforeAll(async () => {
    window.server = server;
  });

  beforeEach(() => {
    fetch.mockClear();
  });

  test("Should return the object formatted", async () => {
    const letter = new Letter(users, posts);
    const res = letter.get();
    expect(res).toHaveLength(2);
    expect(res[0].address).toEqual(`${users[0].address.street}, ${users[0].address.suite} - ${users[0].address.zipcode} ${users[0].address.city}`);
    expect(res[0].company).toEqual(users[0].company.name);
    expect(res[0].posts).toHaveLength(2);
  });

  test("Should handle when the address object is empty", async () => {
    delete users[0].address;
    const letter = new Letter(users, posts);
    const res = letter.get();
    expect(res.length).toEqual(2);
    expect(res[0].address).toEqual("");
  });

  test("Should return empty posts if the users haven't anyone", async () => {
    const letter = new Letter(users, []);
    const res = letter.get();
    expect(res.length).toEqual(2);
    expect(res[0].posts).toHaveLength(0);
  });
});
