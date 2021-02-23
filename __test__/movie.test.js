const request = require("supertest");
const app = require("../app");

describe("App", () => {
  it("POST / should response correctly", async () => {
    const { body } = await request(app)
      .post("/movies")
      .send({ name: "Lion King" })
      .expect(201);

    expect(body).toEqual([
      {
        id: 1,
        name: "Lion King",
      },
    ]);
  });
});
