const request = require("supertest");
const app = require("../app");
const SongModel = require("../models/song");
const UserModel = require("../models/user");
const dbHandlers = require("../test/dbHandler");

describe("Song", () => {
  beforeAll(async () => await dbHandlers.connect());

  beforeEach(async () => {
    const songsData = [
      {
        name: "song 1",
        artist: "artist 1",
      },
      {
        name: "song 2",
        artist: "artist 2",
      },
    ];
    const userData = {
      username: "ash3",
      password: "iWannaB3DVeryBest",
    };
    await SongModel.create(songsData);
    await UserModel.create(userData);
  });
  afterEach(async () => await dbHandlers.clearDatabase());
  afterAll(async () => await dbHandlers.closeDatabase());

  // it("GET / should get songs", async () => {
  //   const { body } = await request(app).get("/songs").expect(200);
  //   expect(body).toEqual([
  //     {
  //       id: 1,
  //       name: "someSongName",
  //       artist: "someSongArtist",
  //     },
  //     {
  //       id: 2,
  //       name: "anotherSongName",
  //       artist: "anotherArtist",
  //     },
  //   ]);
  // });
  // it("GET / should get songs id 1", async () => {
  //   const { body } = await request(app).get("/songs/1").expect(200);
  //   expect(body).toEqual([
  //     {
  //       id: 1,
  //       name: "someSongName",
  //       artist: "someSongArtist",
  //     },
  //   ]);
  // });
  // it("PUT / should update songs id 1", async () => {
  //   const { body } = await request(app)
  //     .put("/songs/1")
  //     .send({ name: "BOONXIAN", artist: "BoonXian" })
  //     .expect(200);
  //   expect(body).toEqual({ id: 1, name: "BOONXIAN", artist: "BoonXian" });
  // });
  // it("DELETE / should delete songs id 2", async () => {
  //   const { body } = await request(app).delete("/songs/2").expect(200);
  //   expect(body).toEqual({
  //     id: 2,
  //     name: "anotherSongName",
  //     artist: "anotherArtist",
  //   });
  // });
  // it("POST / for testing error", async () => {
  //   const { body } = await request(app)
  //     .post("/songs")
  //     .send({ name: "BOONXIAN" })
  //     .expect(400);
  //   expect(body).toEqual({});
  // });

  // it("GET / should get songs", async () => {
  //   const expectedSongData = [];

  //   const response = await request(app).get("/songs").expect(200);

  //   expect(response.body).toMatchObject(expectedSongData);
  // });

  it("GET /:id should respone correct song successfully if given valid id", async () => {
    const song = await SongModel.findOne({ name: "song 1" });
    const response = await request(app).get(`/songs/${song.id}`).expect(200);
    expect(response.body.name).toEqual("song 1");
  });

  it("GET should respond with all songs", async () => {
    const expectedSongsData = [
      {
        name: "song 1",
        artist: "artist 1",
      },
      {
        name: "song 2",
        artist: "artist 2",
      },
    ];
    const response = await request(app).get("/songs").expect(200);
    expect(response.body).toMatchObject(expectedSongsData);
  });

  it("PUT /not able edit song", async () => {
    const song = await SongModel.findOne({ name: "song 1" });
    const response = await request(app).put(`/songs/${song.id}`).expect(400);
    expect(response.text).toEqual("Error: You are not authorized");
  });

  it("Delete /not able delete song", async () => {
    const song = await SongModel.findOne({ name: "song 1" });
    const response = await request(app).delete(`/songs/${song.id}`).expect(400);
    expect(response.text).toEqual("Error: You are not authorized");
  });
});
