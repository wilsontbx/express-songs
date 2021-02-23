const request = require("supertest");
const app = require("../app");

describe("App", () => {
  it("POST / should response correctly", async () => {
    const { body } = await request(app)
      .post("/movies")
      .send({ movieName: "Lion King" })
      .expect(201);

    expect(body).toEqual([
      {
        id: 1,
        movieName: "Lion King",
      },
    ]);
  });

  it("GET / should response correctly", async () => {
    const { body } = await request(app).get("/movies").expect(200);
    expect(body).toEqual([
      {
        id: 1,
        movieName: "Lion King",
      },
    ]);
  });

  it("PUT / should response correctly", async () => {
    const { body } = await request(app)
      .put("/movies/1")
      .send({
        movieName: "Frozen 2",
      })
      .expect(200);
    expect(body).toEqual([
      {
        id: 1,
        movieName: "Frozen 2",
      },
    ]);
  });

  it("DELETE / should response correctly", async () => {
    const { body } = await request(app).delete("/movies/1").expect(200);
    expect(body).toEqual({
      id: 1,
      movieName: "Frozen 2",
    });
  });

  it("GET / should response correctly", async () => {
    const { body } = await request(app).get("/movies").expect(200);
    expect(body).toEqual([]);
  });
});
