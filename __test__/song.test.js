const request = require("supertest");
const app = require("../app");

describe("App", () => {
  it("GET / should get songs", async () => {
    const { body } = await request(app).get("/songs").expect(200);
    expect(body).toEqual([
      {
        id: 1,
        name: "someSongName",
        artist: "someSongArtist",
      },
      {
        id: 2,
        name: "anotherSongName",
        artist: "anotherArtist",
      },
    ]);
  });

  it("GET / should get songs id 1", async () => {
    const { body } = await request(app).get("/songs/1").expect(200);
    expect(body).toEqual([
      {
        id: 1,
        name: "someSongName",
        artist: "someSongArtist",
      },
    ]);
  });

  it("PUT / should update songs id 1", async () => {
    const { body } = await request(app)
      .put("/songs/1")
      .send({ name: "BOONXIAN", artist: "BoonXian" })
      .expect(200);

    expect(body).toEqual({ id: 1, name: "BOONXIAN", artist: "BoonXian" });
  });

  it("DELETE / should delete songs id 2", async () => {
    const { body } = await request(app).delete("/songs/2").expect(200);

    expect(body).toEqual({
      id: 2,
      name: "anotherSongName",
      artist: "anotherArtist",
    });
  });

  it("POST / for testing error", async () => {
    const { body } = await request(app)
      .post("/songs")
      .send({ name: "BOONXIAN" })
      .expect(400);

    expect(body).toEqual({});
  });
});
